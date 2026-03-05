## Le nombre sans nom

Le calendrier de validation avait perdu une semaine en juillet. Personne ne l'avait récupérée. Dans le bâtiment d'ingénierie, à six heures quarante du matin, la moitié des postes étaient éteints et la fluorescente au-dessus de celui de Mateo Quispe-Rojas clignotait toujours.

---

Il trouva le fichier en vingt minutes, comme prévu. Il l'ouvrit.

`correction_factor = 0.9743`

Mateo fixa l'écran. Trois secondes, peut-être quatre. Il avait passé des semaines à sentir la forme de quelque chose sans pouvoir la nommer — les traces de Petrov, de Delgado, de Farouqi, Lindqvist, Osei, les cent huit entrées du fichier, la chose entourée — et là, c'était nommé. Un nombre. Huit chiffres. Il tourna le bracelet sur son poignet gauche sans y penser.

Il ouvrit `git log --follow -p geometry_config.ini`. La liste de commits défilait. Il chercha l'entrée du facteur, la trouva en année 1 : initiales *R.V.*, message laconique — *"calib correction for 43-arc prototype test, passes"*. Il s'arrêta sur le mot *prototype*. Il ouvrit l'historique de l'architecture spatiale, chercha l'année 3 : *"Spatial discontinuities reoriented — arc geometry revised to accommodate planetary-scale deployment."* Il relut la phrase deux fois. Puis il regarda à nouveau le nombre. *C'était pour corriger la géométrie à 43 degrés. La géométrie a changé en année 3. Le facteur n'a pas bougé.* Pas d'exclamation dans sa tête. La clarté froide d'une équation résolue.

Il sortit son carnet. Page 47. Le chemin complet, la valeur, les initiales, la date d'introduction, la date de la migration d'architecture. Il nota ce que le facteur était censé corriger — décalage temporel dans le calcul de l'offset spatial — et ce qu'il corrigeait maintenant : *rien qui existe encore*. Il numérota l'entrée 109 dans sa tête, mais ne l'inscrivit pas dans le fichier. Pas avant d'être certain. *Certain* signifiait pour lui : tracer le chemin complet de l'offset depuis l'entrée jusqu'à la sortie de `compute_spatial_offset()`, vérifier que `_load_geometry_config()` chargeait bien ce fichier-ci et pas une copie locale qu'il aurait manquée, comparer les valeurs de sortie avec et sans le facteur sur les données de test de l'année 3. Il dessina un schéma dans le carnet — trois boîtes, deux flèches — et posa le stylo.

Par la fenêtre, le désert était blanc sous le soleil du matin. Quelqu'un avait laissé une tasse près de l'imprimante. La fluorescente clignotait. Il reposa les deux mains sur le clavier et commença à écrire le script de test. *Ce n'est pas encore une erreur. C'est une hypothèse. Mais c'est une hypothèse très solide.* Il ne pensait pas aux conséquences à l'échelle planétaire. Ce n'était pas son travail, pas encore. Son travail, maintenant, c'était de prouver qu'il avait raison.

---

Il avait mis vingt minutes à retrouver le fichier. Il avait mis trois secondes à comprendre ce qu'il contenait. Le reste de la matinée servit à vérifier que sa compréhension était correcte.

L'alcôve café du couloir entre le bâtiment d'ingénierie et l'aile des systèmes de données n'avait jamais eu de nom officiel. Mateo et Yuki Takamura y avaient leurs habitudes depuis des mois — la machine de gauche en panne, celle de droite capricieuse, le comptoir assez large pour y ouvrir un carnet.

Yuki Takamura le vit arriver depuis l'angle du couloir. La démarche particulière qu'il avait quand il portait quelque chose dans la tête. Pas pressée. Concentrée. Elle tenait sa tasse des deux mains, appuyée contre le comptoir. La machine à café grondait derrière elle, cycle de réchauffage, son habituel. Elle attendit qu'il parle.

Il ouvrit le carnet. Page 47. Il lui montra le chemin — `git log`, année 1, les initiales *R.V.*, le mot *prototype*, puis année 3, la migration, le décalage dans l'offset. Elle lut sans interruption. Elle posa la tasse. Son index gauche tapa une fois sur le bord du comptoir, s'arrêta.

— Le facteur s'applique encore à quoi, exactement, dans le pipeline actuel ?

*Elle connaissait déjà la réponse probable. Elle voulait l'entendre de lui parce qu'il avait tracé le chemin complet et qu'elle ne l'avait pas fait.* Elle regardait le schéma — trois boîtes, deux flèches — et quelque chose se plaçait. Pas une alarme. Une reconnaissance. Ça faisait des mois qu'elle voyait passer les sorties de `compute_spatial_offset()` dans les logs de validation, des micro-variations dans les données de ciblage, dans la plage de tolérance, toujours dans la plage de tolérance. Elle avait ouvert un ticket l'an dernier. Elle l'avait fermé elle-même faute d'explication évidente. *Une chose entourée.*

Mateo entendit la question et répondit lentement. Pas pour elle — elle suivait — mais parce que c'était la première fois qu'il le disait à voix haute et il voulait entendre si ça tenait.

— Le facteur s'applique à la correction de l'offset temporel dans `compute_spatial_offset()`. Il multiplie le résultat brut par 0.9743 avant la sortie. Il était là pour compenser la géométrie d'arc de 43 degrés du prototype année 1. Cette géométrie n'existe plus depuis l'année 3. Donc ce qu'il corrige maintenant, c'est rien. Il introduit un décalage de 2.57% sur l'offset temporel de chaque calcul de ciblage.

Ça tenait.

— J'ai un ticket là-dessus, dit Yuki. Numéro 2847. Je l'ai fermé en « non-reproductible ». Il faut le rouvrir.

Elle le dit posément, sans excuse dans la voix. Mateo sortit son téléphone, ouvrit le tracker. *Micro-variations dans les données de ciblage, dans la plage de tolérance.* Il lut la date de fermeture. Il la regarda. *Elle avait la bonne question. Elle n'avait pas le chemin.* Il n'y avait pas de jugement dans ce constat. On ne laisse pas un ticket ouvert indéfiniment sur une anomalie qui reste dans les marges et qu'on ne peut pas reproduire de façon isolée.

— Les micro-variations que tu as documentées, dit-il en regardant l'écran du téléphone. Elles sont cohérentes avec un facteur fixe de 0.9743 sur l'offset ? Si elles le sont, ton ticket et mon entrée 109 décrivent la même chose depuis des angles différents.

Il leva les yeux.

— Il faut rouvrir le ticket, oui. Et il faut l'escalader. Pas à cause de l'amplitude — l'amplitude est dans les marges. À cause de ce que les marges de tolérance ont été calculées en supposant.

Il referma le carnet. La machine à café finit son cycle. La fluorescente clignotait une fois, s'arrêtait, reprenait.

---

Sept ans. Le nombre avait traversé sept ans de révisions, de migrations, de changements d'équipe. Trois ingénieurs avaient travaillé autour de lui sans le voir. Yuki avait ouvert un ticket sur ses effets et l'avait fermé elle-même. Le système de contrôle de version conservait chaque modification avec une précision au centième de seconde, et cette précision n'avait servi à rien, parce que personne n'avait posé la question que Mateo venait de poser : pourquoi ce nombre est-il là ?

L'amplitude est dans les marges. Les tolérances avaient été définies pour quantifier l'incertitude acceptable d'un système dont la géométrie n'avait pas changé depuis sa conception. La géométrie avait changé. Les tolérances, non.
