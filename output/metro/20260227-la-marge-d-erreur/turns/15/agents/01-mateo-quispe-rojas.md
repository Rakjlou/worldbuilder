# Mateo Quispe-Rojas

## Prompt

Mateo, Year 7-8 at the Atacama complex. He audits the code he inherited. He traces every function, every constant, every workaround. He finds undocumented workarounds. Constants without comments. Shortcuts taken by engineers who left long ago. None catastrophic. Each the mark of a system built too fast, under too much pressure, by too many hands. He sends money to Valentina for her nursing board exam before she has to ask. Close third person, French.

## Response

Trois semaines. Mateo traçait le système comme on remonte un fleuve : en partant de l'embouchure, là où les fonctions s'exécutent, et en marchant vers les sources, là où les données naissent.

Le module de visée spatiale comptait quatre cent douze mille lignes de code réparties sur trois cent sept fichiers. Il avait ouvert chacun d'eux. Pas lu entièrement, pas encore. Ouvert, parcouru, noté les dépendances, fermé. Une cartographie avant l'exploration. Il travaillait sur un tableur à côté du terminal, deux colonnes : nom du fichier, statut. *Non vérifié. En cours. Vérifié. Anomalie.* La colonne *Anomalie* comptait dix-sept entrées au bout de trois semaines.

Le premier workaround, il l'avait trouvé le quatrième jour. Dans le module de correction atmosphérique, une constante codée en dur : `ATM_SCATTER_COEFF = 0.0847`. Pas de commentaire. Pas de référence. Pas de commit message explicatif dans l'historique git, juste un hash de huit caractères et un auteur dont le nom n'apparaissait plus dans le répertoire du consortium. Il avait cherché la valeur dans la littérature. Coefficient de diffusion de Rayleigh à 2 600 mètres d'altitude pour une longueur d'onde de 532 nanomètres. Correct pour Paranal. Incorrect pour le complexe, qui se trouvait 400 mètres plus bas. La différence était de l'ordre de 2 %. Pas catastrophique. Mais présente, non documentée, et invisible à quiconque ne cherchait pas.

*Il a eu ses raisons.* Mateo pensait toujours ça quand il trouvait un workaround. L'ingénieur qui avait écrit cette ligne travaillait sous pression, avec une deadline, dans un système qui n'était pas le sien au départ, et il avait fait fonctionner la chose. C'était respectable. Le problème n'était pas la ligne. Le problème était l'absence de commentaire. L'absence de lien entre la valeur et sa justification. Le fil coupé entre le chiffre et le monde.

Le deuxième workaround était dans le gestionnaire de timeouts. Un `sleep(50)` inséré entre deux appels au bus de capteurs. Cinquante millisecondes de silence artificiel pour éviter une collision de messages que le protocole aurait dû gérer. La solution correcte était un mécanisme de file d'attente. La solution déployée était un délai arbitraire, suffisant pour les conditions normales, insuffisant si la charge augmentait. L'ingénieur avait mis un commentaire, celui-là : `// TODO: replace with proper queue — works for now`. Le commit datait de trois ans.

Le troisième. Le cinquième. Le neuvième. Chacun logique dans son contexte. Chacun le fruit d'un système construit trop vite, par trop de mains, sous trop de pression. Des ingénieurs qui étaient partis, qui avaient été mutés, qui avaient fini leur contrat. Leurs décisions restaient dans le code comme des empreintes géologiques, couche après couche, et personne ne les avait relues parce que personne n'avait le temps de relire, parce que le système avançait et qu'il fallait avancer avec lui.

Il documentait chaque anomalie. Fichier, ligne, description du problème, sévérité estimée, correction proposée. Le tableur grandissait. Il l'envoyait chaque vendredi à son responsable, avec un message identique : *Weekly audit report — see attached.* Le responsable répondait : *Noted. Thanks.* Mateo ne savait pas si quelqu'un lisait le tableur au-delà du titre.

Le virement pour Valentina, il le fit un dimanche matin, avant qu'elle ne se réveille à La Paz. L'examen du board infirmier était dans trois semaines. Les frais d'inscription plus le manuel de révision plus le transport depuis El Alto : quatre cent vingt dollars. Il avait calculé le montant sans lui demander, parce qu'il connaissait les tarifs et parce qu'elle ne demanderait pas. Elle ne demandait jamais. Comme leur mère. Il envoya le virement avec un message de deux mots : *Para el examen.* Puis il ferma l'application bancaire et ouvrit le terminal.

Fichier 168 sur 307. `sensor_calibration_routines.py`. Ligne 1. Il commença à lire.
