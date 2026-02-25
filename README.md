# Worldbuilder

A story generation and interactive narrative system powered by Claude.

## What It Does

- **Build worlds** through guided dialogue (characters, locations, lore, magic systems)
- **Seed stories** with concrete narrative plans from existing worlds
- **Play stories** as an interactive narrative where a human stage director makes key creative decisions

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI
- Python 3 (standard library only — used by infrastructure hooks)

## How It Works

Open this repo in Claude Code. The `CLAUDE.md` file auto-boots the system and offers available modes.

See `system/guide.md` for full documentation.

## Structure

```
system/          # System prompts and guide
worlds/          # World packages (settings, characters, locations, seeds)
output/          # Generated stories and agent logs
scripts/         # Infrastructure hooks (character agent logging)
.claude/         # Claude Code project settings and hooks
```
