# Author Voice

## Prompt

You are an independent auditor. Your job is to read ALL system prompt templates in this project and check for internal consistency after recent changes to improve narrative clarity (WHO/WHERE/grounding). Be brutally honest — flag every inconsistency, loophole, contradiction, or place where one file says X but another assumes Y.

Read these files in full:
1. /Users/nsierra-/worldbuilder/system/prompts/character-agent.md
2. /Users/nsierra-/worldbuilder/system/prompts/author-voice.md
3. /Users/nsierra-/worldbuilder/system/prompts/writer-agent.md (the Stitcher)
4. /Users/nsierra-/worldbuilder/system/prompts/story-director.md
5. /Users/nsierra-/worldbuilder/CLAUDE.md (the orchestrator entry point)

Also check if there's a system/guide.md that might have relevant context:
6. /Users/nsierra-/worldbuilder/system/guide.md (if it exists)

For each file, understand its role in the pipeline:
- The Director plans turns and assembles prompts for all agents
- Character agents write first-person scenes
- Author Voice reads character output and writes gap-filling fragments
- The Stitcher reads character output + Author Voice and composes the final chapter

Check for:

1. **Cross-reference consistency**: When file A says "the Director sends X", does the Director's template actually include X? When the Stitcher says "the Director provides a gender list", does the Director's checklist actually say to send one?

2. **Terminology drift**: Do all files use the same terms? E.g., "fragments" vs "sections" vs "labeled prose" — are there stale references to the old Opening/Bridge/Closing structure?

3. **Redundancy vs contradiction**: Rules 9 and 11 in the Stitcher both talk about naming characters — do they contradict or just overlap? Is that a problem?

4. **Missing propagation**: The character-agent.md now has a {masculine/feminine} placeholder for gender. Does the Director's template or checklist explicitly tell the Director to fill this in? Or is it just implied?

5. **Author Voice description consistency**: The intro paragraph of author-voice.md still says "labeled prose sections" — should it say "fragments" now? Check the full file for any remaining references to the old structure (Opening, Bridge, Closing).

6. **Pipeline gaps**: Is there any scenario where information is expected downstream but never generated upstream? E.g., does the Stitcher expect something from the Author Voice that the Author Voice prompt doesn't produce?

7. **Stale references in guide.md or CLAUDE.md**: Do these reference the old Author Voice structure?

8. **The hook detection**: author-voice.md says the hook detects "You are the Author Voice in an interactive narrative". Does story-director.md's step 4 match this exactly?

9. **Gender list completeness**: The gender list is now mentioned in (a) character-agent.md instructions, (b) author-voice.md Director rules, (c) writer-agent.md Rule 13, (d) story-director.md step 5. Is it mentioned everywhere it needs to be? Is it missing from step 4 (Author Voice spawn) in story-director.md?

10. **Scene Brief consistency**: character-agent.md now says 2-5 sentences with 3 structured parts. story-director.md Turn Planning says 2-5 sentences. The Director rules in character-agent.md also say 2-5 with (a)/(b)/(c). Are all three aligned?

Produce a structured report with:
- **ISSUES** (things that are actually wrong or contradictory — must fix)
- **WARNINGS** (things that could cause confusion but aren't strictly broken)
- **NOTES** (observations, minor suggestions, things that are fine but worth mentioning)

Be thorough. Be honest. Don't soften findings.

## Response

Now I have a complete picture. Let me compile the full audit report.

---

# AUDIT REPORT: System Prompt Consistency

## Files Reviewed

1. `/Users/nsierra-/worldbuilder/system/prompts/character-agent.md`
2. `/Users/nsierra-/worldbuilder/system/prompts/author-voice.md`
3. `/Users/nsierra-/worldbuilder/system/prompts/writer-agent.md`
4. `/Users/nsierra-/worldbuilder/system/prompts/story-director.md`
5. `/Users/nsierra-/worldbuilder/CLAUDE.md`
6. `/Users/nsierra-/worldbuilder/system/guide.md`

---

## ISSUES (must fix)

### ISSUE 1: guide.md describes the OLD Author Voice structure

**File:** `/Users/nsierra-/worldbuilder/system/guide.md`, line 123

The guide says:

> ...then produces labeled prose sections: **Opening, Bridges between perspectives, Closing, and Undercurrent** (the thematic thread). These sections are written to `agents/00-author-voice.md`...

The actual `author-voice.md` template no longer uses the Opening/Bridge/Closing/Undercurrent structure. It was replaced with a free-form fragment system: "Write **labeled prose fragments**... Free form. No mandatory opening or closing. No repeated structural pattern across chapters." The guide directly contradicts the current Author Voice prompt. Anyone reading the guide to understand the system will get a wrong mental model.

**Fix:** Rewrite guide.md line 123 to describe the current free-form labeled-fragment approach.

---

### ISSUE 2: author-voice.md internal terminology inconsistency -- "sections" vs "fragments"

**File:** `/Users/nsierra-/worldbuilder/system/prompts/author-voice.md`

The file uses both terms:

- **Line 5** (intro paragraph): "produces **labeled prose sections**"
- **Line 45** (body): "Write **labeled prose fragments**"
- **Lines 67-70** (body): "How many **fragments**"
- **Lines 109-110** (Output section): "Write your response directly -- the labeled **fragments**" / "Return ONLY the labeled prose **fragments**"
- **Line 125** (Rules for Director): "The Author Voice returns only the labeled prose **sections**"

The intro paragraph and the Director rules at the bottom still say "sections." The core instructions inside the template say "fragments." This is internally inconsistent within the same file. The Stitcher at `writer-agent.md` line 62 uses "fragments" correctly: "labeled fragments as available connective tissue."

**Fix:** Replace "sections" with "fragments" in the intro paragraph (line 5) and in the Director rules (line 125).

---

### ISSUE 3: Stitcher receives "Pourquoi + Detail atmospherique" but Author Voice receives all three seed fields -- story-director.md step 5 is missing "Ce qui se passe"

**File:** `/Users/nsierra-/worldbuilder/system/prompts/story-director.md`, line 82

Step 5 (Stitcher) says to send: `current phase seed intent (Pourquoi + Détail atmosphérique)`.

The `writer-agent.md` Chapter Intent section (lines 103-107) confirms this -- it only has placeholders for "Why this chapter exists" and "Atmospheric detail", not "Ce qui se passe."

The Author Voice (step 4) gets all three: "Ce qui se passe / Pourquoi / Détail atmosphérique."

This is **intentional by design** (the Stitcher gets less seed information than the Author Voice). However, there is a **separate problem**: the Stitcher's template at `writer-agent.md` line 122 says:

> Send: turn directory path, chapter title, narration language, and the current phase's seed intent (Pourquoi + Détail atmosphérique) for the Chapter Intent section

But step 5 of `story-director.md` (line 82) says the same thing. These are consistent with each other. **No issue here** -- I initially flagged this but it checks out.

**Reclassified: Not an issue.** Removing from the final list would be misleading. Keeping for transparency: I checked this and it is correct.

---

### ISSUE 4: Gender list missing from Author Voice spawn template placeholder

**File:** `/Users/nsierra-/worldbuilder/system/prompts/author-voice.md`, Spawn Template (lines 11-112)

The Author Voice spawn template includes `**Characters in this chapter:** {list of characters whose agent files are present}` (line 29), but there is no gender placeholder in the actual template body.

Meanwhile:
- The Author Voice **Director rules** (line 122) say: "Send the character list with **full names and gender**"
- The `story-director.md` step 4 (line 74) says: "Send: ... **character list**, current phase seed intent"

But the actual template placeholder on line 29 just says `{list of characters whose agent files are present}` -- it does not mention gender.

The Author Voice does not do pronoun conversion (it writes its own original fragments), so gender is arguably less critical here. But the Director rules explicitly say to send gender, and there is no placeholder for it in the template. This is a disconnect -- the Director rules promise something the template does not consume.

**Fix:** Either add gender to the template placeholder (e.g., `{list of characters with gender: "Yuki Takamura (féminin), Mateo Quispe-Rojas (masculin)"}`) or remove the gender instruction from the Author Voice Director rules if it is not needed. Given that the Author Voice writes fragments that may include gendered constructions in French ("Yuki, assise devant..."), gender information IS useful and should be in the template.

---

### ISSUE 5: Scene brief length inconsistency in guide.md

**File:** `/Users/nsierra-/worldbuilder/system/guide.md`, line 105

The guide says:

> a **scene brief** -- **2-4 sentences** of directorial guidance

Every other file says **2-5 sentences**:
- `character-agent.md` line 25: "2-5 sentences of directorial guidance"
- `character-agent.md` line 77: "2-5 sentences"
- `story-director.md` line 37: "2-5 sentences of directorial guidance"

The guide is the odd one out with "2-4."

**Fix:** Change guide.md line 105 from "2-4" to "2-5."

---

## WARNINGS (could cause confusion)

### WARNING 1: story-director.md step 4 does not explicitly mention gender list for Author Voice

**File:** `/Users/nsierra-/worldbuilder/system/prompts/story-director.md`, lines 73-75

Step 4 (Author Voice) says:

> Send: turn directory path, previous chapters path, chapter title, language, character list, current phase seed intent

Step 5 (Stitcher) explicitly calls out:

> Send: a character gender list for gendered-language agreement

But step 4 just says "character list" -- no explicit mention of gender. The `author-voice.md` Director rules (line 122) DO say "character list with full names and gender." So the instruction exists in the Author Voice file, but the Director's own checklist (the thing the Director actually follows step-by-step) does not call it out. The Director might miss it because step 4's checklist is what gets followed mechanically.

**Suggestion:** Add "with gender" to step 4's character list item, matching step 5's explicit callout.

---

### WARNING 2: Stitcher Rule 9 and Rule 11 overlap on character naming

**File:** `/Users/nsierra-/worldbuilder/system/prompts/writer-agent.md`

- **Rule 9** (line 60): "The reader must always know who speaks. Every perspective shift must name the character. Every line of dialogue must be attributable."
- **Rule 11** (line 64): "WHO -- always. Name every character by full name at their first appearance... At every perspective shift, name the character entering focus..."

These are not contradictory, but they are substantially redundant. Rule 11 is a stricter, more detailed version of Rule 9. Rule 9 says "name the character"; Rule 11 says "full name." Rule 11 adds the Author Voice fragment integration instruction.

This is not broken -- redundancy in critical instructions can reinforce compliance. But it does add cognitive load to the Stitcher's prompt. If the prompt is already long, this is dead weight.

**Suggestion:** Consider merging Rule 11 into Rule 9, or converting Rule 9 into a short cross-reference ("See Rule 11 for naming requirements").

---

### WARNING 3: "Ce qui se passe" field name not mentioned in story-director.md

**File:** `/Users/nsierra-/worldbuilder/system/prompts/story-director.md`

Step 4 says "current phase seed intent" but does not enumerate the three fields by name. The Author Voice template uses French field names: "Ce qui se passe", "Pourquoi", "Détail atmosphérique." Step 5 explicitly names "Pourquoi + Détail atmosphérique" for the Stitcher.

Step 4 should ideally enumerate "Ce qui se passe / Pourquoi / Détail atmosphérique" to match the Author Voice template's placeholder structure. Without this, the Director must cross-reference the Author Voice template to know which fields to fill in. The Author Voice Director rules (line 122) do list all three, but the step 4 checklist in story-director.md does not.

**Suggestion:** Add the three field names to step 4 in parentheses, mirroring step 5's pattern.

---

### WARNING 4: CLAUDE.md references "Stitcher" and "Writer" inconsistently in Resume section

**File:** `/Users/nsierra-/worldbuilder/CLAUDE.md`, line 48

> The Stitcher is always fresh (spawned per chapter), so no **Writer** state is lost.

The system uses "Stitcher" everywhere else. The file for it is `writer-agent.md`, which is a historical artifact from before the rename. "Writer" here could confuse someone looking for a "Writer" agent that does not exist as a named concept in the running system.

**Suggestion:** Change "Writer state" to "Stitcher state" for consistency.

---

### WARNING 5: The hook detection pattern is not documented in story-director.md for resumed agents

**File:** `/Users/nsierra-/worldbuilder/system/prompts/story-director.md`

Step 3e says: "Resume prompt MUST contain: 'Continue in character as {name}.'" -- this is for the hook's regex fallback to detect the character from resumed agent output.

But the character-agent.md Resume Template (line 66) says: "Continue in character as {character_name}. Same rules as before."

These are consistent. However, step 4 (Author Voice) only says MUST contain "You are the Author Voice in an interactive narrative" -- matching `author-voice.md` line 117. This checks out.

**Not an issue**, but worth noting: there is no resume for Author Voice or Stitcher, so this only matters for character agents.

---

### WARNING 6: author-voice.md intro says "spawned... before the Stitcher" but also "after all character agents have been spawned"

**File:** `/Users/nsierra-/worldbuilder/system/prompts/author-voice.md`, line 5

> spawned once per chapter, after all character agents have been spawned but before the Stitcher

This wording says "after all character agents have been **spawned**." But actually, the Author Voice must wait until character agents have **completed** (not just been spawned), because it needs to read their output files. The Director rules (line 120) get this right: "Spawn AFTER all character agents have **completed** (the Author Voice needs their output files)." But the intro paragraph uses the weaker word "spawned."

**Suggestion:** Change "spawned" to "completed" in the intro paragraph of author-voice.md.

---

## NOTES (observations, fine as-is)

### NOTE 1: The three-part (a)/(b)/(c) structure in character-agent.md Director rules is well-aligned

`character-agent.md` line 77 describes the scene brief with three parts: (a) scene purpose, (b) physical/spatial details, (c) emotional frame. The Scene Brief placeholder in the template (lines 26-32) names the same three parts: "Scene purpose", "Grounding", "Emotional frame." `story-director.md` Turn Planning (lines 37-41) describes the same concept. All three are aligned. Good.

---

### NOTE 2: The Stitcher correctly references "00-author-voice" by prefix

`writer-agent.md` Rule 10 (line 62): "If a file prefixed `00-author-voice` exists..." This matches the hook behavior described in `author-voice.md` line 124 and `guide.md` line 143. Consistent.

---

### NOTE 3: "Ce qui se passe" is sent to Author Voice but not to Stitcher -- by design

The Author Voice gets all three seed fields (Ce qui se passe, Pourquoi, Detail atmospherique). The Stitcher gets only two (Pourquoi, Detail atmospherique). This is a deliberate information wall: the Author Voice needs the "what is happening" context to identify narrative gaps, while the Stitcher only needs the editorial/atmospheric guidance. This is consistent across `author-voice.md`, `writer-agent.md`, and `story-director.md`.

---

### NOTE 4: The guide.md is the most out-of-date file

Beyond the Opening/Bridge/Closing issue (ISSUE 1) and the 2-4 sentence count (ISSUE 5), the guide is broadly accurate but was clearly written before the Author Voice was redesigned. It should be treated as the lowest-priority document for accuracy -- the actual prompt templates and story-director.md are authoritative.

---

### NOTE 5: The {masculine/feminine} placeholder in character-agent.md is self-documenting

The character-agent.md template (line 45-46) includes: "Your character's grammatical gender is {masculine/feminine}." The story-director.md does not have an explicit step saying "fill in the gender placeholder in the character prompt." However, the Director assembles prompts using the template, and the placeholder is visible. The gender list is explicitly called out for the Stitcher (step 5) and implicitly for the Author Voice (via the Author Voice Director rules). For character agents, the placeholder IS the instruction. This works, but it relies on the Director noticing the placeholder rather than having a checklist item.

---

### NOTE 6: Pipeline prohibitions are comprehensive and consistent

`story-director.md` Pipeline Prohibitions match the rules in CLAUDE.md. "NEVER skip the Author Voice step" is present. "NEVER write chapter.md directly" is present. The three-stage pipeline (Character -> Author Voice -> Stitcher) is described identically in CLAUDE.md line 64, story-director.md steps 3-5, and guide.md line 135.

---

### NOTE 7: State schema does not include Author Voice agent ID -- correctly

`story-director.md` State Schema (line 214) says "There is no `writer` key." `author-voice.md` line 126 says "No state to track -- there is no Author Voice agentId in state.json." `writer-agent.md` line 127 says the same for the Stitcher. Consistent.

---

## SUMMARY

| Category | Count |
|----------|-------|
| **ISSUES** (must fix) | 4 |
| **WARNINGS** (should fix) | 6 |
| **NOTES** (fine as-is) | 7 |

### Priority fixes:

1. **guide.md** has a stale Author Voice description with the old Opening/Bridge/Closing/Undercurrent structure. This is the most misleading problem.
2. **author-voice.md** mixes "sections" and "fragments" internally -- the intro and Director rules still say "sections."
3. **author-voice.md** spawn template has no gender placeholder despite the Director rules saying to send gender.
4. **guide.md** says "2-4 sentences" for scene briefs; every other file says "2-5."
