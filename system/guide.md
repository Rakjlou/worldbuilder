# Worldbuilder System Guide

## What This Is

A story generation and interactive narrative system powered by Claude. It produces emergent narratives through authentic character portrayal within consistent world rules, with a human player acting as stage director.

## How It Works

The system has three modes, used in sequence:

### 1. Worldbuilder
An interactive dialogue that helps an author create a world: setting, characters, locations, rules, and creative intentions. Output: a set of markdown files in `worlds/{name}/`.

### 2. Seeder
Takes an existing world and produces a concrete story plan (a "seed"): phases, beats, pacing, character arcs for this specific story. Output: a seed file in `worlds/{name}/seeds/{seed}.md`.

### 3. Story Director (the game)
Runs the story. The Director orchestrates each turn: spawns character agents, prepares a scene brief, then delegates prose writing to a dedicated Writer agent. The player is involved at pivotal moments. Output: a complete narrative in `output/{world}/{seed}/story.md`.

## Key Concepts

### The Player is a Stage Director
The player doesn't control a character. They observe the story unfold and make key creative decisions at narratively significant moments (3-5 per story). The system decides when to ask based on emotional stakes, not routine.

### Information Walls
The Story Director knows everything (world, intentions, seed). Character agents know only their own profile and the current scene. This separation creates genuine emergence -- characters can surprise the Director.

### Three Layers of Content
- **World files** describe what IS (lore, characters, locations)
- **Intentions** describe what the author WANTS (themes, arcs, ending direction, rails)
- **Seeds** describe what WILL happen (specific story plan, phases, pacing)

### Author's Intentions Are Sacred
The seed can adapt to player choices. The intentions cannot be violated. If a player choice would undermine the author's themes, ending direction, or rails, the Director redirects.

## File Structure

```
worldbuilder/
├── CLAUDE.md                    # Entry point
├── system/
│   ├── guide.md                 # This file
│   └── prompts/                 # System prompts for each mode and agent
├── worlds/                      # World packages
│   └── {world-name}/
│       ├── MANIFEST.md          # File inventory
│       ├── lore.md              # World rules and setting
│       ├── intentions.md        # Author's creative vision
│       ├── characters/          # Character profiles (no arc spoilers)
│       ├── locations/           # Location descriptions
│       └── seeds/               # Story plans
└── output/                      # Generated stories
```

## Character Profiles

Profiles describe WHO a character IS: personality, speech, knowledge, goals, fears, relationships, triggers. They must NOT contain story arc information (what will happen to them). Arcs live in seeds and intentions.

## Character Agents

Spawned as Sonnet subagents via Claude Code's Task tool. They receive their profile and scene context. They never receive the seed, intentions, or other characters' profiles. This is what makes emergence possible.

## Writer Agent

An Opus subagent spawned on Turn 1 and resumed across turns via the Task tool's `resume` feature. It receives a style guide and output file path on first spawn, then a scene brief each turn. It carries the full narrative in its context, ensuring consistency of voice, names, details, and callbacks without needing to re-read the story file.

## Story Output

A finished story is a readable markdown document containing all narrative chapters, a summary of player choices, and story notes. It lives in `output/{world}/{seed}/story.md`.
