# Mateo Quispe-Rojas

## Prompt

Yuki Takamura just responded:

---
Elle l'a vu arriver depuis l'angle du couloir — la démarche particulière qu'il a quand il porte quelque chose dans la tête. Pas pressée. Concentrée. Elle tient sa tasse des deux mains, appuyée contre le comptoir. La machine à café gronde derrière elle, cycle de réchauffage, son habituel. Elle attend qu'il parle.

Il ouvre le carnet. Page 47. Il lui montre le chemin — `git log`, Year 1, les initiales *R.V.*, le mot *prototype*, puis Year 3, la migration, le décalage dans l'offset. Elle lit sans interruption. *Right.* Elle pose la tasse. Son index gauche tape une fois sur le bord du comptoir, s'arrête.

— Le facteur s'applique encore à quoi, exactement, dans le pipeline actuel ?

*Elle connaît déjà la réponse probable. Elle veut l'entendre de lui parce qu'il a tracé le chemin complet et qu'elle ne l'a pas fait.* Elle regarde le schéma — trois boîtes, deux flèches — et quelque chose se place. Pas une alarme. Une reconnaissance. Ça fait des mois qu'elle voit passer les sorties de `compute_spatial_offset()` dans les logs de validation, des micro-variations dans les données de ciblage, dans la plage de tolérance, toujours dans la plage de tolérance. Elle avait ouvert un ticket l'an dernier. Elle l'avait fermé elle-même faute d'explication évidente. *Une chose entourée.*

— J'ai un ticket là-dessus. Numéro 2847. Je l'ai fermé en "non-reproductible". Elle dit ça posément, sans excuse dans la voix. — Il faut le rouvrir.
---

How do you react? Continue in character as Mateo Quispe-Rojas. Same rules as before.

## Response

Il entend le numéro du ticket et quelque chose se déplace dans sa tête — pas une surprise, mais une confirmation de la forme que ça avait depuis le début. *Elle l'a vu. Elle l'a vu et elle l'a fermé. Pas par négligence — faute d'explication évidente. C'est exactement ça.* Il regarde le schéma dans le carnet, puis Yuki, puis il dit :

— Le facteur s'applique à la correction de l'offset temporel dans `compute_spatial_offset()`. Il multiplie le résultat brut par 0.9743 avant la sortie. Il était là pour compenser la géométrie d'arc de 43 degrés du prototype Year 1. Cette géométrie n'existe plus depuis Year 3. Donc ce qu'il corrige maintenant, c'est rien. Il introduit un décalage de 2.57% sur l'offset temporel de chaque calcul de ciblage.

Il dit ça lentement, pas pour elle — elle suit — mais parce que c'est la première fois qu'il le dit à voix haute et il veut entendre si ça tient. Ça tient.

Il sort son téléphone, ouvre le tracker. — Ticket 2847, tu as dit ?

Il trouve l'entrée. La lit. *Micro-variations dans les données de ciblage, dans la plage de tolérance.* Il lit la date de fermeture. Il regarde Yuki. *Elle avait la bonne question. Elle n'avait pas le chemin.* Il n'y a pas de jugement dans ce constat — il aurait fait la même chose. On ne laisse pas un ticket ouvert indéfiniment sur une anomalie qui reste dans les marges et qu'on ne peut pas reproduire de façon isolée.

— Les micro-variations que tu as documentées. Elles sont cohérentes avec un facteur fixe de 0.9743 sur l'offset ? Il pose la question en regardant l'écran du téléphone, pas elle. — Si elles le sont, ton ticket et mon entrée 109 décrivent la même chose depuis des angles différents. Il lève les yeux. — Il faut rouvrir le ticket, oui. Et il faut l'escalader. Pas à cause de l'amplitude — l'amplitude est dans les marges. À cause de ce que les marges de tolérance ont été calculées en supposant.

Il referme le carnet. La machine à café finit son cycle. La fluorescente clignote une fois, s'arrête, reprend.
