#!/usr/bin/env python3
"""PostToolUse hook: log character agent responses to per-character markdown files.

Reads hook payload from stdin (fires after every Task tool call).
Filters for character agents only, extracts the response, and appends
to output/{world}/{seed}/agents/{character-name}.md.

All error paths exit silently (exit 0, no stdout/stderr) to avoid
disrupting the Director's workflow.
"""

import json
import os
import re
import sys
import unicodedata


def slugify(name: str) -> str:
    """Convert a character name to a kebab-case filename slug.

    Transliterates accented characters (é→e, ë→e, etc.) and lowercases.
    """
    # NFD decomposition splits accented chars into base + combining mark
    nfkd = unicodedata.normalize("NFKD", name)
    ascii_name = nfkd.encode("ascii", "ignore").decode("ascii")
    # Lowercase, replace non-alphanum runs with hyphens, strip edges
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_name.lower()).strip("-")
    return slug


def extract_context_label_first_spawn(prompt: str) -> str:
    """Extract a short context label from a first-spawn character prompt.

    Looks for a '## This Moment' section and takes the first sentence
    (max 80 chars). Falls back to 'Scene response'.
    """
    match = re.search(r"## This Moment\s*\n(.+)", prompt)
    if not match:
        return "Scene response"
    text = match.group(1).strip()
    # First sentence: up to the first period, question mark, or exclamation
    sentence_match = re.match(r"(.+?[.!?])", text)
    if sentence_match:
        text = sentence_match.group(1)
    if len(text) > 80:
        text = text[:77] + "..."
    return text


def extract_context_label_resume(prompt: str) -> str:
    """Extract context label from a resume prompt.

    Looks for '{name} just responded to you:' pattern.
    """
    match = re.search(r"(\w[\w\s]*?) just responded to you:", prompt)
    if match:
        return f"Reacting to {match.group(1).strip()}"
    return "Continued dialogue"


def _extract_continue_label(prompt: str) -> str:
    """Extract context label from a 'Continue in character' prompt.

    Takes the first meaningful sentence after the character instruction line.
    """
    # Skip past the first line ("Continue in character as ...") and look for content
    lines = prompt.split("\n")
    for line in lines[1:]:
        stripped = line.strip()
        if stripped and not stripped.startswith("Same rules"):
            sentence = re.match(r"(.+?[.!?])", stripped)
            text = sentence.group(1) if sentence else stripped
            if len(text) > 80:
                text = text[:77] + "..."
            return text
    return "Continued scene"


def load_agent_registry(cwd: str) -> dict:
    """Load the agent ID -> character name registry."""
    path = os.path.join(cwd, ".agent-registry.json")
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return {}


def save_agent_registry(cwd: str, registry: dict) -> None:
    """Save the agent ID -> character name registry."""
    path = os.path.join(cwd, ".agent-registry.json")
    with open(path, "w") as f:
        json.dump(registry, f, indent=2, ensure_ascii=False)


def get_turn_number(session_path: str) -> str:
    """Read the current turn number from state.json."""
    state_path = os.path.join(session_path, "state.json")
    if os.path.exists(state_path):
        with open(state_path, "r") as f:
            state = json.load(f)
            return str(state.get("turn", "?"))
    return "?"


def main():
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return

    tool_input = payload.get("tool_input", {})
    tool_response = payload.get("tool_response", {})
    cwd = payload.get("cwd", "")

    # --- Filter chain ---

    # Step 1: Must be a general-purpose subagent (eliminates Explore, Plan, Bash)
    if tool_input.get("subagent_type") != "general-purpose":
        return

    prompt = tool_input.get("prompt", "")
    is_resume = "resume" in tool_input and tool_input["resume"]

    # Step 2: Must match character agent patterns
    has_narrative_marker = "in an interactive narrative" in prompt
    has_resume_marker = "just responded to you:" in prompt
    has_continue_marker = "Continue in character as " in prompt
    if not has_narrative_marker and not has_resume_marker and not has_continue_marker:
        return

    # Step 3: Exclude Writer first spawn
    if "You are the Writer" in prompt:
        return

    # --- Extract character name ---

    registry = load_agent_registry(cwd)
    agent_id = None

    # Get agent ID from response
    if isinstance(tool_response, dict):
        agent_id = tool_response.get("agentId")

    if is_resume and has_resume_marker:
        # Resume reacting to another character: look up name from registry
        resume_id = tool_input.get("resume", "")
        character_name = registry.get(resume_id)
        if not character_name:
            return
        context_label = extract_context_label_resume(prompt)
        # Register new agent ID if it changed (agent expired and was re-created)
        if agent_id and agent_id != resume_id:
            registry[agent_id] = character_name
            save_agent_registry(cwd, registry)
    elif has_continue_marker:
        # Continued scene: extract name from "Continue in character as {name}."
        match = re.search(r"Continue in character as (.+?)\.", prompt)
        if not match:
            return
        character_name = match.group(1).strip()
        # Extract a context label from the prompt content
        context_label = _extract_continue_label(prompt)
        # Register this agent ID for future resumes
        if agent_id:
            registry[agent_id] = character_name
            save_agent_registry(cwd, registry)
    else:
        # First spawn: extract name from prompt
        match = re.search(r"You are (.+?) in an interactive narrative", prompt)
        if not match:
            return
        character_name = match.group(1).strip()
        context_label = extract_context_label_first_spawn(prompt)

        # Register this agent ID for future resumes
        if agent_id:
            registry[agent_id] = character_name
            save_agent_registry(cwd, registry)

    # --- Read session path ---

    session_file = os.path.join(cwd, ".current-session")
    if not os.path.exists(session_file):
        return

    with open(session_file, "r") as f:
        session_path = f.read().strip()

    if not session_path:
        return

    # Make absolute if relative
    if not os.path.isabs(session_path):
        session_path = os.path.join(cwd, session_path)

    # --- Get turn number ---

    turn = get_turn_number(session_path)

    # --- Extract response text ---

    content = tool_response.get("content", []) if isinstance(tool_response, dict) else []
    if not content:
        return

    response_text = ""
    for block in content:
        if isinstance(block, dict) and block.get("type") == "text":
            response_text = block.get("text", "")
            break

    if not response_text:
        return

    # --- Write to agent log file ---

    slug = slugify(character_name)
    agents_dir = os.path.join(session_path, "agents")
    os.makedirs(agents_dir, exist_ok=True)

    log_path = os.path.join(agents_dir, f"{slug}.md")
    is_new_file = not os.path.exists(log_path)

    with open(log_path, "a") as f:
        if is_new_file:
            f.write(f"# {character_name} -- Agent Dialogues\n\n")
            f.write(f"All character agent outputs for {character_name} across the story.\n")

        f.write(f"\n---\n\n## Turn {turn} — {context_label}\n\n")
        f.write(response_text)
        f.write("\n")


if __name__ == "__main__":
    try:
        main()
    except Exception:
        # All errors exit silently
        pass
