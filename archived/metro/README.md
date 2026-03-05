# Archived Metro Outputs

Story outputs from early Metro world sessions. These predate the convergence fixes applied to the world files and reflect the original (more convergent) character profiles and lore.

## Sessions

### `20260226-les-mains-de-tomasz/`
Aborted test run. First attempt at a director-led story session using the Metro world. Incomplete.

### `20260226-les-mains-de-tomasz-2/`
Full story from a genuine director run. Raw output -- written in a single session with spawned character and writer agents. Includes agent context files and state.

### `20260226-les-mains-de-tomasz-2-reworked/`
The same story, edited and iterated over many sessions. The reworked version refines prose and pacing but works from the same seed and world state as the original run.

### `20260227-la-marge-d-erreur/`
First run of "La Marge d'Erreur" seed. Used the old architecture (persistent Writer agent rewriting from scratch, story.md monolith, .agent-registry.json). Archived to make way for the Writer-as-Stitcher architecture -- where character agent prose is preserved as source material and chapters are composed per-turn from agent output files.

### `20260227-la-marge-d-erreur-v2/`
Complete 21-turn run of "La Marge d'Erreur" using the Stitcher architecture (fresh-per-chapter Opus agent, per-turn chapter.md files, character agent outputs logged by hook). Excellent character-level prose and faithful stitching. Archived to make way for the Author Voice architecture.

### `20260227-la-marge-d-erreur-v3/`
First 4 turns of "La Marge d'Erreur" using the Author Voice pipeline. This partial run was used to validate and refine the Author Voice system: an Opus agent spawned per chapter between character agents and Stitcher, producing narrative connective tissue (opening frames, thematic bridges, closings) from the seed's per-phase intent. Also introduced scene briefs for characters, raw previous-agent output on resume, and seed-informed Stitcher (phase Pourquoi + Détail atmosphérique). Comparison with v2 confirmed the pipeline works -- chapters gained narrative direction and thematic coherence while preserving character prose verbatim. The undercurrent section was folded into Opening/Bridges/Closing after observing the Stitcher consistently ignored it as a separate section.

### `20260227-la-marge-d-erreur-v4/`
Complete 25-turn run of "La Marge d'Erreur." Revised T1-T15 from v3 with improved narrative clarity (WHO/WHERE/grounding across the pipeline), then continued T16-T25 to story completion. Same Author Voice + Stitcher architecture as v3, with refined scene briefs and grounding in character agent prompts.

## Note

Earlier sessions use the old Writer architecture (persistent Opus agent, story.md monolith). v2 uses the Stitcher architecture. v3 adds the Author Voice layer. v4 is the first complete run with the full pipeline. Active outputs live in `output/`.
