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

## Note

All sessions here use the old Writer architecture (persistent Opus agent, story.md monolith). The current system uses the Stitcher architecture (fresh-per-chapter agent reading character output files from disk, per-turn chapter.md files). Active outputs live in `output/`.
