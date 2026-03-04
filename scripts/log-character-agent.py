#!/usr/bin/env python3
"""PostToolUse hook: log character and Author Voice agent outputs to per-turn files.

Reads hook payload from stdin (fires after every Task tool call).
Filters for character agents and Author Voice agents, extracts prompt
and response, and writes to output/{world}/{seed}/turns/{turn}/agents/{NN}-{slug}.md.

Author Voice agents get the special prefix 00- (sorts first in directory).
Character agents get sequential numbering (01, 02, 03...).

Agent ID → character name resolution uses state.json (agent_ids map).
Falls back to prompt extraction for first spawns (before Director updates state).

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

    Transliterates accented characters (e→e, e→e, etc.) and lowercases.
    """
    # NFD decomposition splits accented chars into base + combining mark
    nfkd = unicodedata.normalize("NFKD", name)
    ascii_name = nfkd.encode("ascii", "ignore").decode("ascii")
    # Lowercase, replace non-alphanum runs with hyphens, strip edges
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_name.lower()).strip("-")
    return slug


def get_state(session_path: str) -> dict:
    """Read state.json from the session directory."""
    state_path = os.path.join(session_path, "state.json")
    if os.path.exists(state_path):
        with open(state_path, "r") as f:
            return json.load(f)
    return {}


def resolve_character_from_state(agent_id: str, resume_id: str, state: dict) -> str | None:
    """Reverse-lookup agent ID → character name from state.json agent_ids."""
    agent_ids = state.get("agent_ids", {})
    # agent_ids is {character_name: agent_id}, so reverse it
    id_to_name = {v: k for k, v in agent_ids.items()}
    # Try the resume ID first (for resumed agents), then the response agent ID
    if resume_id and resume_id in id_to_name:
        return id_to_name[resume_id]
    if agent_id and agent_id in id_to_name:
        return id_to_name[agent_id]
    return None


def extract_character_from_prompt(prompt: str) -> str | None:
    """Extract character name from prompt patterns (fallback for first spawns)."""
    # First spawn: "You are {name} in an interactive narrative"
    match = re.search(r"You are (.+?) in an interactive narrative", prompt)
    if match:
        return match.group(1).strip()
    # Continue pattern: "Continue in character as {name}."
    match = re.search(r"Continue in character as (.+?)\.", prompt)
    if match:
        return match.group(1).strip()
    return None


def next_sequence_number(agents_dir: str) -> str:
    """Count existing files in agents/ dir and return next zero-padded number."""
    if not os.path.exists(agents_dir):
        return "01"
    existing = [f for f in os.listdir(agents_dir) if f.endswith(".md")]
    return f"{len(existing) + 1:02d}"


def main():
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return

    tool_input = payload.get("tool_input", {})
    tool_response = payload.get("tool_response", {})
    cwd = payload.get("cwd", "")

    # --- Filter chain ---

    # Step 1: Must be a general-purpose subagent
    if tool_input.get("subagent_type") != "general-purpose":
        return

    prompt = tool_input.get("prompt", "")
    is_resume = "resume" in tool_input and tool_input["resume"]

    # Step 2: Must match character agent patterns OR be a resumed agent
    # resolvable from state.json. Resumes may use free-form prompts (new scene
    # context, not just "X just responded to you:"), so prompt patterns alone
    # are insufficient. For resumes, state.json is the authority.
    has_narrative_marker = "in an interactive narrative" in prompt
    has_resume_marker = "just responded" in prompt
    has_continue_marker = "Continue in character as " in prompt
    has_prompt_marker = has_narrative_marker or has_resume_marker or has_continue_marker

    if not has_prompt_marker and not is_resume:
        return

    # Step 3: Exclude Stitcher/Writer spawns
    if "You are the Stitcher" in prompt or "You are the Writer" in prompt:
        return

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

    # --- Read state ---

    state = get_state(session_path)
    turn = str(state.get("turn", "?"))

    # --- Get agent ID ---

    agent_id = None
    if isinstance(tool_response, dict):
        agent_id = tool_response.get("agentId")

    resume_id = tool_input.get("resume", "") if is_resume else ""

    # --- Detect Author Voice agent ---

    is_author_voice = "You are the Author Voice" in prompt

    # --- Resolve character name ---

    if is_author_voice:
        character_name = "Author Voice"
    else:
        character_name = resolve_character_from_state(agent_id, resume_id, state)
        if not character_name:
            character_name = extract_character_from_prompt(prompt)
    if not character_name:
        return

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

    # --- Write to per-turn agent file ---

    turn_padded = f"{int(turn):02d}" if turn.isdigit() else turn
    agents_dir = os.path.join(session_path, "turns", turn_padded, "agents")
    os.makedirs(agents_dir, exist_ok=True)

    slug = slugify(character_name)
    if is_author_voice:
        seq = "00"
    else:
        seq = next_sequence_number(agents_dir)
    filename = f"{seq}-{slug}.md"
    file_path = os.path.join(agents_dir, filename)

    with open(file_path, "w") as f:
        f.write(f"# {character_name}\n\n")
        f.write("## Prompt\n\n")
        f.write(prompt)
        f.write("\n\n## Response\n\n")
        f.write(response_text)
        f.write("\n")


if __name__ == "__main__":
    try:
        main()
    except Exception:
        # All errors exit silently
        pass
