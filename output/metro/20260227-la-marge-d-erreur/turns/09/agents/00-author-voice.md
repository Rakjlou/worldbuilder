# Author Voice

## Prompt

You are the Author Voice in an interactive narrative. Your job is to write the connective tissue that gives this chapter its narrative direction — the frame, the bridges between perspectives, and the thematic undercurrent that the characters cannot see because they are inside it.

## Source Material

**Turn directory:** output/metro/20260227-la-marge-d-erreur/turns/09/
**Previous chapters:** output/metro/20260227-la-marge-d-erreur/turns/ (read earlier turns' chapter.md files for your voice continuity — read at least turns 07 and 08)

Read all character agent files in `agents/` in numeric order. Each file contains:
- A `## Prompt` section: the scene context
- A `## Response` section: the character's action, dialogue, and internal monologue

These are the raw scenes you are writing around. Do NOT summarize or restate what happens in them.

## Chapter

**Title:** Le nombre
**Language:** French
**Characters in this chapter:** Yara Haddad, Nadia Koreneva

## Seed Intent for This Phase

**What is happening:**
Le projet prend forme institutionnelle. Le laboratoire s'installe dans le désert d'Atacama. Yara est recrutée pour l'architecture de sécurité. Nadia est consultée sur les besoins énergétiques — sa liste est terrifiante. Et dans un laboratoire de test, un ingénieur de calibration ajuste un facteur de correction pour un prototype spécifique et écrit 0.9743 dans un fichier de configuration. Le test passe. La constante n'est pas documentée. L'ingénieur passe au test suivant. La constante reste.

**Why this chapter exists:**
Le ton change ici. L'histoire cesse d'être une histoire de découverte et devient une histoire de conséquence. La téléportation arrive comme un espoir, puis comme un outil, puis comme la chose autour de laquelle tout tourne. Et dans le bruit de cette transformation, un nombre est écrit dans un fichier — un nombre correct, pour des raisons qui n'existeront plus dans deux ans — et il restera là, immobile, pendant que le monde se reconstruit autour de lui. Le fait que la correction ait été *juste* quand elle a été écrite rend la catastrophe plus dévastatrice.

**Atmospheric detail:**
Le laboratoire qui n'existe pas encore vraiment. Whiteboards dans les couloirs. Pas assez de chaises. Le bruit d'un prototype qui pulse à intervalles irréguliers. Et quelque part, un fichier de configuration avec un nombre dedans.

## What You Write

Produce the following labeled sections.

### Opening
1-3 sentences. Sets the spatial/temporal frame and the chapter's emotional register.

### Bridge: Yara — Nadia
2-4 sentences. The thematic connection between these two scenes.

### The Constant
THIS IS THE MOST IMPORTANT SECTION OF THIS CHAPTER. 3-5 sentences of prose that plant the number 0.9743. This is not a character scene — it is a narrative aside, a passage the Stitcher can place as connective tissue. Write it as follows:

In the same lab where Yara is walking, or in one adjacent to it, an unnamed calibration engineer is running a test on a medium-scale teleportation prototype. The prototype has a specific geometry — the spatial discontinuities are oriented differently from what the final system will use. The engineer applies a correction factor to the temporal offset to compensate for this geometry. The correction is appropriate. It is exact for this prototype. The engineer inserts it as a constant in the configuration file: 0.9743. The test passes. The result is good. The constant is not documented — not from laziness, but because in the context of this test, with this prototype, it is obvious to anyone who understands the geometry. The engineer moves on to the next test.

Write this as literary prose, not as exposition. The reader should feel the mundanity of the moment. This is a person doing their job correctly. The horror is invisible. It is the most important paragraph in the story and it must read like the least important.

### Closing
1-3 sentences. The chapter's final resonance.

## Style Rules

These are non-negotiable.

### Language
**Think in the narration language.** French — native rhythm, idiom, word choice.

### Avoid AI Writing Tells
- **The "Not X — Y" formula.** Never.
- **"Quelque chose" as emotional hedging.** No.
- **Over-explanation.** No.
- **Symmetrical balance.** No.
- **Decorative similes.** No.
- **Performed literary style.** No.
- **Grandiosity.** No. Especially here. The 0.9743 section MUST be mundane. Do not signal its importance. Do not use ominous tone. It is a person typing a number into a file. That is all.

### What You Do NOT Do
- Do NOT summarize character actions.
- Do NOT restate dialogue or internal monologue.
- Do NOT explain what characters feel.
- Do NOT philosophize.
- Do NOT foreshadow. The 0.9743 section must be flat, routine, invisible.

### Density
One precise detail beats three adequate ones.

## Output

1. Write your response directly — the labeled sections in order (Opening, Bridge, The Constant, Closing)
2. Return ONLY the labeled prose sections
3. Do NOT return analysis, commentary, or explanation of your choices

## Response

I now have a thorough understanding of the material. Let me review the voice pattern established across the previous Author Voice outputs and chapters:

- Turn 07 Author Voice: Opening grounds in concrete spatial detail (the windowless room), Closing lands on a physical object (the paper between them)
- Turn 08 Author Voice: Opening grounds in geography and routine (the drive from Jodrell Bank), Closing lands on a concrete image (cold rice, invisible garden, antennas)
- The voice is spare, declarative, anchored in physical objects. No philosophizing. No decoration.

The character scenes: Yara walks through a chaotic lab, observes cables and prototypes, asks her first diagnostic question. Nadia finishes her terrifying six-page energy list, sends it, calls her daughter and says nothing about it.

The critical section is "The Constant" -- the 0.9743 passage that must read as the least important paragraph in the story.

---

### Opening

Le laboratoire d'Atacama n'avait pas encore de nom. Les gens disaient « le site », ou « le hangar », ou « le bâtiment du fond ». Les chaises manquaient. Les whiteboards s'appuyaient contre les murs des couloirs parce que personne n'avait encore attribué les salles.

### Bridge : Yara — Nadia

Yara comptait les câbles au sol. À six mille kilomètres de là, Nadia comptait les réacteurs. Les deux femmes faisaient le même travail — mesurer l'écart entre ce qui existe et ce qu'on demande — dans deux langues différentes de l'ingénierie. La liste de Nadia répondait à une question que le laboratoire de Yara n'avait pas encore appris à poser.

### The Constant

Dans le hangar adjacent à celui où Yara posait ses questions, un ingénieur de calibration lançait le quatorzième test de la journée. Le prototype avait une géométrie particulière — les discontinuités spatiales étaient orientées en arc, à quarante-trois degrés de l'axe principal, parce que c'était ce que la structure du portique permettait. L'offset temporel dérivait. L'ingénieur connaissait la cause : à cette orientation, le couplage entre les composantes spatiale et temporelle introduisait un biais systématique. Il ouvrit le fichier de configuration, descendit jusqu'à la ligne du facteur de correction, et tapa 0.9743. Le test passa. Le résultat était dans les marges. Il vérifia les courbes, les trouva propres, inscrivit « OK » dans le cahier de test à côté du numéro de run, et passa au prototype suivant. La constante resta dans le fichier. Elle était exacte. Elle correspondait à cette géométrie, à cet arc, à ces quarante-trois degrés qui n'existeraient plus quand le système final serait construit à une tout autre échelle. Personne ne la documenta parce qu'il n'y avait rien à documenter. Un ingénieur compétent avait corrigé un biais connu. Le fichier se ferma avec les autres fichiers de la journée.

### Closing

Ce soir-là, à Vienne, Nadia parla à sa fille de la pluie. Au Chili, Yara chercha un interrupteur dans un couloir sans étiquettes. Et dans un répertoire de fichiers de calibration, un nombre attendait sans le savoir.
