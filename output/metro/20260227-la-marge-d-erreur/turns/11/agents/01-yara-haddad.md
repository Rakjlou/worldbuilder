# Yara Haddad

## Prompt

Yara presents her safety architecture during a design review at the Atacama facility. She is showing her abort conditions, tolerance thresholds, and fallback states. Each relies on a clear distinction between "not activated" and "activated successfully." Her architecture is precise, validated, built from nine years of CERN experience. Ephrem is in the room. Year 5.

## Response

Elle avait mis trois semaines à préparer cette revue. Pas parce que l'architecture était incomplète. Parce qu'elle voulait que chaque ligne soit lisible par quelqu'un qui n'avait jamais touché un système de contrôle.

Yara se leva et connecta son laptop au projecteur. La première diapositive apparut : **Safety Architecture — Planetary Displacement System — Design Review v4.2.** Elle ne regarda pas la salle. Elle connaissait la salle. Huit personnes, la plupart ingénieurs, deux physiciens, et Ephrem, assis au fond, un carnet ouvert sur les genoux.

— L'architecture repose sur trois couches indépendantes de protection, dit-elle. Sa voix était posée, claire, calibrée pour une pièce de cette taille. — Couche un : conditions d'arrêt automatiques. Si un paramètre dépasse son seuil de tolérance, le système interrompt la séquence. Pas de décision humaine dans la boucle. Le matériel décide.

Elle changea de diapositive. Un schéma : les flux de données, les capteurs, les actionneurs. Chaque flèche annotée avec un temps de réponse.

— Couche deux : états de repli. Si l'arrêt automatique échoue, le système retourne à un état de sécurité prédéfini. L'état de sécurité est défini comme l'état dans lequel le déplacement temporel n'a pas été initié. Le système revient en deçà du seuil d'activation.

*Chaque mot est pesé. Chaque condition est testable. Les seuils viennent des données de prototypage, validés sur trois séries indépendantes. J'ai dérivé ces nombres moi-même. Je peux les justifier.*

— Couche trois : arrêt d'urgence manuel. L'opérateur peut forcer l'arrêt à tout moment de la séquence pré-activation. Post-activation, le repli automatique prend le relais.

Elle montra le diagramme d'états. Cinq états, des flèches entre eux, chaque transition annotée. L'état initial en vert : IDLE. L'état final en bleu : DISPLACEMENT COMPLETE. Entre les deux, les états intermédiaires. Et à chaque étape, une flèche rouge vers la gauche : ABORT.

— La distinction fondamentale, dit-elle en posant le doigt sur le schéma, est entre l'état pré-activation et l'état post-activation. Toute l'architecture de sécurité repose sur le fait que ces deux états sont distinguables. Que le système peut déterminer, à tout instant, s'il est dans l'un ou dans l'autre. Que la frontière entre eux est nette, mesurable, et que le système peut la traverser dans les deux directions.

Elle regarda la salle. Six visages attentifs, un qui prenait des notes, et Ephrem, qui ne bougeait pas.

— Des questions avant que je passe aux résultats de validation ?

Le silence dura quatre secondes. Puis Ephrem leva la main.
