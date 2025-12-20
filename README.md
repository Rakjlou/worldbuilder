# STORY GENERATOR: A Collaborative Narrative Game System

## What This Is

This is a **story generator that uses Claude as a narrative orchestrator**. It's an honest, explicit game system for creating emergent stories.

**How it works:**
- **Story Manager (Claude)** directly narrates all characters using their profiles
- Characters act according to their authentic motivations from profile files
- **Human User** observes the emergent narrative
- **Narration** can be in any language specified by the user

**📖 See [ACTUAL_WORKFLOW.md](ACTUAL_WORKFLOW.md) for the complete method.**

The result: **Emergent narratives** that nobody forced, where story comes from character choice and consequence.

---

## Key Principles

### **1. Transparency**
- All participants acknowledge they are Claude instances
- We're not pretending to be human or deceiving anyone
- This is explicitly framed as a game/creative system

### **2. Authenticity**
- Characters make genuine choices based on who they are
- NPCs respond realistically, not to serve the plot
- World rules are consistent and never broken for convenience

### **3. Emergence**
- The story is not pre-written
- It emerges from character interaction
- Nobody knows how it will end (including the Story Manager)

---

## System Components

### **Core Files** (Top Level)

| File | Purpose |
|------|---------|
| **`ACTUAL_WORKFLOW.md`** | **⭐ Step-by-step guide - Read this first** |
| `README.md` | This file (overview) |
| `SYSTEM_STATUS.md` | Current capabilities and test results |

### **World Packages** (Folders)

Each world is self-contained:
```
[world_name]/
├── MANIFEST.md              # Inventory of world components
├── lore.md                  # World rules, history, magic system
├── world/                   # Any structured data (example)
├────── locations/           # Location descriptions
│       └── [location_id].md
├────── npcs/                # Character profiles
│       └── [npc_id].md
└────── items/               # Item descriptions
        └── [item_id].md
```

### **Session Files** (sessions/)

Each story session creates a log:
```
sessions/
└── session_[timestamp].json   # Turn-by-turn log of the story
```

---

## Design Philosophy

### **What This Is NOT**

❌ A storyteller that forces a narrative
❌ A chatbot that responds to user prompts
❌ A game where the user plays a character directly
❌ A system that hides what it is
❌ A sandbox with no consequences

### **What This IS**

✅ A game master ensuring fair play and consistency
✅ An orchestrator making conditions for emergence
✅ A system where character choice drives narrative
✅ Transparent about being AI-powered
✅ A place where actions have real consequences
✅ Collaborative storytelling (user observes, occasionally participates)
✅ Language-agnostic (narrates in user's preferred language)

---

## Tips for Story Managers

1. **Let characters fail.** That's where stories get interesting.
2. **Consistency > Drama.** Never break rules for plot convenience.
3. **Track everything.** World state must be accurate.
4. **Stay true to character profiles.** Let them act authentically.
5. **If a story goes flat, inject a complication** (not forced—something that would naturally occur).
6. **Quality over quantity.** A 15-turn beautiful story beats a 50-turn meandering one.
7. **Trust emergence.** Structure + authenticity + consequences = story.
8. **The story you get is the story that should be told.** Don't fight it.

---

## Final Note

This system works through honest interpretation of character psychology within consistent world rules. Characters aren't quest-dispensers—they have authentic goals and motivations. The Story Manager doesn't force a story—it ensures a fair, consistent world where emergence happens naturally.

**The magic is in the emergence. Let it happen.**
