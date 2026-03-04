## Les couches

Le système a des couches. Les ingénieurs qui l'ont construit sont partis ou ont été mutés ou ont fini leur contrat. Leurs décisions restent dans le code, non documentées, comme des strates dans une coupe de terrain. Quelqu'un doit les lire. Pas pour les juger. Pour les comprendre. Parce qu'un système dont personne ne connaît les raisons est un système dont personne ne connaît les limites.

Trois semaines. Mateo traçait le système comme on remonte un fleuve : en partant de l'embouchure, là où les fonctions s'exécutent, et en marchant vers les sources, là où les données naissent.

Le module de visée spatiale comptait quatre cent douze mille lignes de code réparties sur trois cent sept fichiers. Il avait ouvert chacun d'eux. Pas lu entièrement, pas encore. Ouvert, parcouru, noté les dépendances, fermé. Une cartographie avant l'exploration. Il travaillait sur un tableur à côté du terminal, deux colonnes : nom du fichier, statut. *Non vérifié. En cours. Vérifié. Anomalie.* La colonne *Anomalie* comptait dix-sept entrées au bout de trois semaines.

Le premier workaround, il l'avait trouvé le quatrième jour. Dans le module de correction atmosphérique, une constante codée en dur : `ATM_SCATTER_COEFF = 0.0847`. Pas de commentaire. Pas de référence. Pas de commit message dans l'historique, juste un hash et un auteur dont le nom n'apparaissait plus dans le répertoire du consortium. Coefficient de diffusion de Rayleigh à 2 600 mètres d'altitude pour une longueur d'onde de 532 nanomètres. Correct pour Paranal. Incorrect pour le complexe, 400 mètres plus bas. Différence de l'ordre de 2 %. Pas catastrophique. Présente, non documentée, invisible.

*Il a eu ses raisons.* Mateo pensait toujours ça quand il trouvait un workaround. L'ingénieur qui avait écrit cette ligne travaillait sous pression, avec une deadline, et il avait fait fonctionner la chose. Le problème n'était pas la ligne. Le problème était l'absence de commentaire. Le fil coupé entre le chiffre et le monde.

Le deuxième workaround était dans le gestionnaire de timeouts. Un `sleep(50)` inséré entre deux appels au bus de capteurs. Cinquante millisecondes de silence artificiel pour éviter une collision que le protocole aurait dû gérer. Le commentaire disait : `// TODO: replace with proper queue — works for now`. Le commit datait de trois ans.

Il documentait chaque anomalie. Fichier, ligne, description, sévérité, correction proposée. Le tableur grandissait. Il l'envoyait chaque vendredi. Son responsable répondait : *Noted. Thanks.*

---

La revue technique avait lieu dans le bâtiment C, salle 12, neuf heures. Yuki arriva à huit heures cinquante-trois avec son laptop et un café dont elle avait bu un tiers.

Huit personnes. Le responsable du module de visée présenta le suivi de sprint. Quatre tickets fermés, deux en retard, un bloqué par une dépendance amont. Yuki écoutait en parcourant les logs de monitoring sur son écran.

L'homme au bout de la table prenait des notes dans un cahier à spirale. Pas sur un laptop. Un cahier. Il écrivait vite, en petites lettres, sans lever la tête. Badge : *Quispe-Rojas, M. — Software Engineering.*

Chen afficha un graphique de latence. Le module de correction atmosphérique montrait des pics irréguliers, deux à trois fois par semaine. Chen dit que c'était dans les tolérances.

-- Les pics à quatorze heures trente, dit l'homme au cahier sans lever la tête. -- C'est le garbage collector du service de calibration qui tourne en arrière-plan. Il bloque le bus de capteurs pendant quarante à soixante millisecondes. J'ai tracé le processus hier.

Chen regarda le graphique. Regarda l'homme.

-- C'est dans les tolérances.

-- Claro. Mais le sleep de cinquante millisecondes dans le gestionnaire de timeouts n'a pas de marge si le GC prend plus de soixante. Sous charge nominale, ça passe. En période de tests intensifs, ça ne passera pas.

*Il a lu le code.* Yuki reposa son café. Ce n'était pas le diagnostic qui l'intéressait. C'était la méthode. Il avait tracé un pic de latence jusqu'à un garbage collector, puis relié le garbage collector à un workaround dans le gestionnaire de timeouts. Deux couches en dessous de ce que le graphique montrait.

Après la revue, dans le couloir, elle le croisa.

-- Le sleep de cinquante millisecondes, dit-elle. C'est dans quel fichier ?

Il la regarda. Pas surpris. Comme si c'était une question correcte.

-- `timeout_handler.py`, ligne 203. Le commentaire dit TODO.

-- Depuis quand ?

-- Le commit date de trois ans.

-- Right.

Un silence de deux secondes. Pas un silence gênant. Un silence de deux personnes qui viennent de vérifier qu'elles regardent le même endroit.

-- Takamura. Monitoring.

-- Quispe-Rojas. Software.

-- Je sais. Le rapport d'audit du vendredi, c'est toi.

Il hocha la tête. Elle but une gorgée de café. Froid.

-- Si tu trouves d'autres trucs comme ça, envoie-moi un mail. Je corrélerai avec les logs.

-- D'accord.

Il mit son sac sur l'épaule et partit vers le bâtiment D. Yuki resta dans le couloir, le café froid à la main. Ce n'était pas de l'amitié. C'était plus simple : deux personnes qui regardaient les systèmes par en dessous et qui venaient de se trouver.

Le vendredi, Mateo envoya son rapport d'audit. Le dimanche, il envoya quatre cent vingt dollars à Valentina pour l'inscription au board infirmier, avant qu'elle ne se réveille à La Paz. Deux mots dans le message : *Para el examen.* Les deux gestes se ressemblaient : tracer un système, anticiper la défaillance, agir avant que quelqu'un ait besoin de demander. Le tableur grandissait. Les anomalies s'accumulaient. Aucune n'était catastrophique. Toutes étaient le signe d'un système qui avait poussé plus vite que la mémoire de ceux qui l'avaient construit.
