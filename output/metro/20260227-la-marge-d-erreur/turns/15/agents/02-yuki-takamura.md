# Yuki Takamura

## Prompt

Yuki, Year 7-8 at the Atacama complex as a consultant on monitoring systems. A technical review meeting where she first encounters Mateo. Not friendship — recognition. Two people who look at systems from the plumbing, who see what people looking from outside don't see. Brief, concrete, no sentimentality. Close third person, French.

## Response

La revue technique avait lieu dans le bâtiment C, salle 12, neuf heures. Yuki arriva à huit heures cinquante-trois avec son laptop et un café dont elle avait bu un tiers. Elle prit la chaise au bout de la table, celle qui était près de la prise électrique, parce que la batterie de son laptop tenait deux heures quarante et que les revues duraient toujours plus longtemps que prévu.

Huit personnes. La moitié qu'elle connaissait, l'autre moitié qu'elle avait vue dans les couloirs. Le responsable du module de visée, Chen, présenta le suivi de sprint. Quatre tickets fermés, deux en retard, un bloqué par une dépendance amont. Les diapositives défilaient. Yuki écoutait en parcourant les logs de monitoring de la semaine sur son écran.

L'homme au bout de la table, de l'autre côté, prenait des notes dans un cahier à spirale. Pas sur un laptop. Un cahier. Il écrivait vite, en petites lettres, sans lever la tête. Elle ne le connaissait pas. Badge : *Quispe-Rojas, M. — Software Engineering.*

Chen afficha un graphique de latence. Le module de correction atmosphérique montrait des pics irréguliers, deux à trois fois par semaine, sans pattern évident. Chen dit que c'était dans les tolérances.

-- Les pics à quatorze heures trente, dit l'homme au cahier. Il n'avait pas levé la tête. Sa voix était calme, factuelle. -- C'est le garbage collector du service de calibration qui tourne en arrière-plan. Il bloque le bus de capteurs pendant quarante à soixante millisecondes. J'ai tracé le processus hier.

Chen regarda le graphique. Regarda l'homme.

-- C'est dans les tolérances.

-- Claro. Mais le sleep de cinquante millisecondes dans le gestionnaire de timeouts n'a pas de marge si le GC prend plus de soixante. Sous charge nominale, ça passe. En période de tests intensifs, ça ne passera pas.

*Il a lu le code.* Yuki reposa son café. Ce n'était pas le diagnostic qui l'intéressait. C'était la méthode. Il avait tracé un pic de latence jusqu'à un garbage collector, puis relié le garbage collector à un workaround dans le gestionnaire de timeouts. Deux couches en dessous de ce que le graphique montrait. La plomberie.

Chen nota quelque chose. La revue continua. Yuki regarda les logs de monitoring sur son écran. Le pic de quatorze heures trente était là. Elle l'avait vu la semaine précédente. Elle avait mis un tag dessus dans le système de monitoring : *investigate*. Elle n'avait pas eu le temps de descendre plus bas.

Lui, il avait eu le temps. Ou il avait pris le temps.

Après la revue, dans le couloir, elle le croisa. Il rangeait son cahier dans un sac à dos usé.

-- Le sleep de cinquante millisecondes, dit-elle. C'est dans quel fichier ?

Il la regarda. Pas surpris. Pas non plus comme si c'était une question évidente. Comme si c'était une question correcte.

-- `timeout_handler.py`, ligne 203. Le commentaire dit TODO.

-- Depuis quand ?

-- Le commit date de trois ans.

-- Right.

Un silence de deux secondes. Pas un silence gênant. Un silence de deux personnes qui viennent de vérifier qu'elles regardent le même endroit.

-- Takamura. Monitoring.

-- Quispe-Rojas. Software.

-- Je sais. Le rapport d'audit du vendredi, c'est toi.

Il hocha la tête. Elle but une gorgée de café. Froid. *Évidemment.*

-- Si tu trouves d'autres trucs comme ça, envoie-moi un mail. Je corrélerai avec les logs.

-- D'accord.

Il mit son sac sur l'épaule et partit vers le bâtiment D. Yuki resta dans le couloir, le café froid à la main. Ce n'était pas de l'amitié. Ce n'était pas de la sympathie. C'était plus simple que ça : deux personnes qui regardaient les systèmes par en dessous et qui venaient de se trouver.
