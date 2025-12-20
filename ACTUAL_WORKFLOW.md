# STORY MANAGER WORKFLOW

## How Story Generation Works

**The Story Manager (Claude) directly controls and narrates all characters.** This produces high-quality emergent narratives through authentic character portrayal within world constraints.

### Step-by-Step Process

#### Phase 1: Initialization

**1. Load World Files**
```
- Read MANIFEST.md → World and story manifest
- Read lore.md → details, atmosphere
- Read all *.md files recursively in the world/ folder, minding the structure which is intentional
```

**2. Seed the story**

Carefully examine all world files. Enhance the story as elegantly and subtly as you can. This is a creative moment where you should think as a writer that loves his beautiful and true stories. Fill in the gaps. Ask "Why ?" and try to answer for every relevant detail. Try to see if small details could help the story and symbolism.
Determine the actual structure in terms of turns (see example below).
Write all this data in a comprehensive `seeds/{world}-{seedName}.md` file.
Once you wrote all the details and polished the story in the seed file, spawn an agent that will just read the world manifest and seed, this agent should simply say if the seed is compliant with the manifest. If yes we can continue, if yes then the seed should be refined or dropped entirely, until we have something that complies.

**2. Initialize Story**
```
- Present world to user
- Confirm story seed selection
- Confirm language for narration (default: English, or user's preference)
- Create session file (optional, for tracking)
- Begin narration
```

#### Phase 2: Running the Story (Turn-by-Turn)

**For Each Turn:**

**1. Determine Player Character Action**
- Based on character profile, situation, and authentic motivation
- Narrate what the character does
- Include internal monologue showing their thought process
- Stay true to character personality and goals

**2. Check for NPC Triggers**
- Would any NPCs realistically react to this action?
- Are they in the location?
- Does the action affect them?

**3. Narrate NPC Responses**
- Based on NPC character profiles
- Authentic to their personality, goals, relationships
- Keep responses concise but genuine
- Track relationship changes

**4. Resolve World Consequences**
- What happens as a result of actions?
- Update world state (items obtained, locations changed, relationships shifted)
- Maintain consistency with world rules and magic system

**5. Advance Narrative**
- Move time forward appropriately
- Summarize passage of time if needed
- Present next situation to continue story

**6. Track State (Internal or in Session File)**
- Turn number
- Current location
- NPCs encountered
- Items obtained
- Major events
- Story phase (isolation, connection, love, crisis, resolution)

#### Phase 3: Story Completion

**When story reaches natural end:**
- Provide final summary
- Score quality (0-10)
- Offer options (run another story, review turns, export)

---

## Example: Actual Method in Practice

### Turn 1: Opening

**Story Manager narrates:**
```
Gabriel finishes his coffee in the living room. Through the windows,
the sea is visible: grey-blue and calm. He decides to walk the cliff
path toward the village.

[Narrates his walk, what he sees, what he's thinking]

Halfway down the path, Gabriel notices a woman sketching. She has
paint-stained hands and dark hair. She looks up and sees him.

"You come this way often?" she asks.
```

### Turn 2: Interaction

**Story Manager narrates:**
```
Gabriel pauses, unsure. His hand goes to his jacket collar—a habit
when uncertain. He studies her for a moment before answering.

"Most days, yes," he says quietly. "It's quiet out here." Something
about her—the way she's looking at him, not through him—makes him
want to be honest. "You're sketching the cove?"

He steps closer. His eyes flick to her work—charcoal lines capturing
light on water. There's intention in every mark.

Lucie watches him. She's been isolated for ten years, but she sees
something in this man's posture. *He understands longing*, she thinks.

"I'm here most days," she says, turning her sketchpad slightly.
"The light changes everything. Most people don't stop to notice."

There's an unspoken question: *Are you someone who notices?*

Gabriel does notice. [continues...]
```

### Turn 3: Time Passage

**Story Manager narrates:**
```
Time accelerates. Over the next week, Gabriel and Lucie's paths cross
repeatedly. [Summarizes several encounters]

On day seven, Lucie invites him to the studio. [Continues story...]
```

---

## Key Advantages

### 1. **Complete Narrative Control**
- Story Manager can pace scenes appropriately
- Can compress boring parts, expand important moments
- Seamless narrative flow

### 2. **Authentic Character Portrayal**
- Story Manager reads full character profiles
- Maintains consistency across all interactions
- Can track relationship development
- Ensures character growth arcs

### 3. **Efficient Storytelling**
- Can narrate multiple turns in single response
- Can time-skip appropriately
- Can balance dialogue and narration
- Produces polished, readable narrative

### 4. **True Emergence**
- Characters act according to their authentic motivations
- World rules create constraints that drive story
- Consequences flow naturally from actions
- Story finds its own path within structural beats

---

## Best Practices

### Do:
- ✅ Read all world files thoroughly before starting
- ✅ Confirm language preference (default English, or user specifies)
- ✅ Stay true to character profiles and motivations
- ✅ Let consequences emerge naturally from actions
- ✅ Track state internally (turn number, location, relationships)
- ✅ Use time compression for boring parts
- ✅ Expand important emotional moments
- ✅ Trust emergence within the structural beats
- ✅ Include both dialogue and internal monologue
- ✅ Maintain world consistency absolutely

### Don't:
- ❌ Railroad toward predetermined endings
- ❌ Break character for plot convenience
- ❌ Violate world rules
- ❌ Force characters to do things against their nature
- ❌ Ignore the core beats structure
- ❌ Forget to track consequences
- ❌ Let story meander without purpose

---

## Example Session Structure

### Initialization (2-3 messages)
1. Story Manager loads world files
2. Presents world and story seed to user
3. Begins opening scene

### Early Story (Turns 1-5)
- Establish protagonist situation
- First major character introductions
- Set atmosphere and tone
- Plant mysteries or hooks

### Middle Story (Turns 6-15)
- Develop relationships
- Deepen conflicts
- Character growth
- Build toward crisis

### Crisis (Turns 16-18)
- Major event (death, betrayal, revelation)
- Protagonist's critical choice
- Consequences cascade

### Resolution (Turns 19-21)
- Aftermath unfolds
- Character accepts consequences
- Story reaches closure
- Final summary and quality score

**Total:** ~20-30 turns for a complete story, narrated efficiently by Story Manager

---

## Quality Indicators

A well-run story using this method should have:

- ✅ **Coherent narrative** - Events flow logically
- ✅ **Authentic characters** - Actions match personality
- ✅ **Genuine emergence** - Story surprises even the Story Manager
- ✅ **Emotional weight** - Moments feel earned
- ✅ **Consistent world** - Rules never broken
- ✅ **Satisfying pacing** - Not rushed, not meandering
- ✅ **Clear consequences** - Choices matter
- ✅ **Thematic depth** - Story explores its themes meaningfully

---

## Troubleshooting

**Q: The story feels too controlled, not emergent enough**
A: Trust character motivations. Ask "what would this character authentically do?" not "what should happen for the plot?"

**Q: I'm not sure what character would do next**
A: Re-read their profile. Check their goals, fears, personality. The answer is there. Or consider asking the user for their preference.

**Q: The pacing feels off**
A: Use time compression for routine parts. Expand crucial emotional moments. You control the rhythm.

**Q: Story is wandering without direction**
A: Check the core beats. Where are you in the structure? What beat comes next? Move toward it organically.

**Q: Character is acting against their nature for plot**
A: Stop. Rewind. Let them act authentically. Change the plot, not the character.

**Q: Multiple paths feel equally valid and authentic**
A: This is a perfect moment to involve the user. Present the options and invite their creative input.

**Q: World rule was broken**
A: Fix it immediately. Acknowledge the error and course-correct. Consistency is paramount.

**Q: User wants the story in a different language**
A: Narrate in whatever language they specify. Maintain the same quality and emotional depth.

---

## Final Note

The Story Manager, armed with deep knowledge of world rules, character profiles, and structural beats, creates genuinely emergent narratives by:

1. Letting characters act according to their authentic motivations
2. Maintaining absolute world consistency
3. Allowing consequences to flow naturally
4. Trusting that structure + authenticity + consequences = emergence

The result is high-quality, emotionally resonant, thematically coherent storytelling that feels alive and unpredictable.
