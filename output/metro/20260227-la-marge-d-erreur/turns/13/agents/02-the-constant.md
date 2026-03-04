# The Constant

## Prompt

The prototype MkII, whose geometry the calibration constant 0.9743 was designed to compensate, is being decommissioned. The production system uses a different architecture — different chamber geometry, different beam angles. The configuration files are migrated from the prototype codebase to the production codebase. The constant 0.9743 travels with them. Show this as an unremarkable step in a process too large for any single person to track. No drama. Procedural. The saddest incident report ever written. Close third person, French. Year 6.

## Response

Le ticket JIRA était le numéro ATK-4471. Titre : *Migration configuration files — MkII prototype to production baseline.* Priorité : moyenne. Assigné à : Devaux, L. Date d'échéance : vendredi.

Laurent Devaux ouvrit le ticket à neuf heures quatorze, entre un café et une mise à jour de firmware sur le banc de test numéro trois. La description tenait en quatre lignes : *Les fichiers de configuration du prototype MkII doivent être migrés vers le dépôt de production. Vérifier la cohérence des formats. Adapter les chemins d'accès. Valider les tests unitaires.*

Il ouvrit le répertoire source. Quarante-sept fichiers. Formats mixtes — YAML, JSON, quelques fichiers texte plats hérités d'une époque où le prototype n'avait pas encore de framework de configuration. Il commença par les fichiers YAML parce qu'ils étaient les plus propres. Copie, adaptation des chemins, vérification du schéma. Routine.

Le fichier `temporal_correction.yaml` faisait vingt-trois lignes. Il le parcourut. Des paramètres de correction temporelle, des offsets, des facteurs de calibration. La ligne 14 :

`temporal_offset_correction: 0.9743`

Il la lut comme il lisait toutes les autres lignes : en vérifiant que le format était correct, que le type était numérique, que la valeur était dans une plage raisonnable. 0.9743 était un facteur proche de 1. Un facteur de correction. Il y en avait des dizaines dans les fichiers de configuration. Chacun compensait quelque chose — une géométrie, une dérive instrumentale, une non-linéarité.

*Il n'y avait pas de commentaire sur cette ligne. Pas de documentation inline. Pas de lien vers un rapport de calibration. L'ingénieur qui l'avait écrit, deux ans plus tôt, ne l'avait pas documenté parce que le nombre était correct pour le prototype, et que les nombres corrects ne nécessitent pas d'explication. Ils sont corrects. C'est suffisant.*

Laurent copia le fichier dans le dépôt de production. Il adapta le chemin. Il lança les tests unitaires. Les tests vérifiaient le format, la cohérence des types, l'absence de valeurs nulles. Ils ne vérifiaient pas si une constante de calibration dérivée de la géométrie d'un prototype était applicable à une architecture de production dont les angles de faisceau étaient différents de 14,7 degrés. Ce n'était pas la fonction des tests unitaires. Les tests unitaires vérifient la forme. La signification est ailleurs.

Les tests passèrent. Quarante-sept fichiers migrés. Laurent nota dans le ticket : *Migration complete. 47 files migrated. Unit tests pass. Ready for review.* Il assigna la review à Chen, W., qui la validerait le lendemain en vérifiant les mêmes choses que Laurent avait vérifiées : les formats, les chemins, les types. Pas les valeurs. Les valeurs étaient les valeurs. Elles venaient du prototype. Le prototype avait fonctionné. Les valeurs étaient validées par le fonctionnement du prototype.

Il ferma le ticket et passa au suivant. ATK-4472 : *Update firmware deployment script for production nodes.* Le café avait refroidi.

La constante 0.9743 était maintenant dans le dépôt de production, à la ligne 14 d'un fichier parmi quarante-sept, dans un répertoire parmi des centaines, dans un système que quatre mille personnes construisaient et que personne ne voyait entièrement.
