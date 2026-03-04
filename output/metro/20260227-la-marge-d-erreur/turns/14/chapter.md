## Le transfert

L'année sept. Le complexe d'Atacama absorbe les gens comme il absorbe le désert : méthodiquement, par lots, selon un plan que personne ne voit en entier. Les transferts arrivent par email. Les ingénieurs font leurs bagages. Les familles ne disent rien ou disent *c'est bien* parce que les autres mots sont trop grands pour le téléphone.

L'ordre de mutation arriva un mardi, par email, avec un en-tête qu'il connaissait déjà : *@pds-consortium.org*. Trois paragraphes. Le premier disait *reassignment*. Le deuxième disait *effective 1 September*. Le troisième donnait un nom de contact et un numéro de badge provisoire.

Mateo lut les trois paragraphes deux fois, ferma l'email, et resta assis une minute devant l'écran. Le curseur clignotait dans le terminal ouvert à côté. Le contrôleur ESPRESSO. La ligne 312. Un bug de synchronisation qu'il était en train de documenter pour le prochain ingénieur. *Le prochain ingénieur, c'est déjà quelqu'un d'autre.*

Il appela sa mère à dix-neuf heures, heure de La Paz. Trois sonneries. Quatre. Sa mère décrocha.

-- Alo, mijo.

-- Mama. J'ai reçu un transfert. Je pars à Atacama.

Silence. Pas un silence d'incompréhension. Un silence de femme qui avait su que ça viendrait, qui avait peut-être prié pour que ça ne vienne pas, et qui maintenant tenait le téléphone sans rien dire parce que les mots qu'elle avait ne couvraient pas la chose.

-- Mama ?

Un froissement. La voix de son père, en espagnol : *Dame el telefono.* Puis, proche :

-- Mateo. Ton transfert, c'est pour le projet.

Ce n'était pas une question.

-- Claro.

-- C'est bien. C'est un travail important.

Son père avait cette voix-là. La voix des déclarations simples. Il avait dit la même chose quand Mateo avait obtenu le poste à Paranal, sept ans plus tôt. *C'est bien. C'est un travail important.* Un homme qui nommait les choses sans les commenter.

-- Papa, j'envoie l'argent pour l'inscription de Valentina avant de partir.

-- Elle n'a pas demandé.

-- Je sais.

Il raccrocha. Le bracelet au poignet gauche : trois grammes de laine rouge et noire, torsadée, que Lucia lui avait noué le jour de son départ pour le Chili. *Para que no te olvides de donde eres.* Il ne l'oubliait pas. Le bracelet le lui rappelait chaque fois qu'il tapait, et il tapait beaucoup.

Il fit ses bagages en deux heures. Deux valises, un sac de matériel. Les vêtements d'un côté, les livres techniques de l'autre. L'adaptateur secteur. Le chargeur de téléphone. Les choses qu'on emporte quand on sait qu'on ne revient pas.

---

Le bus du consortium le déposa à l'entrée du complexe à onze heures du matin un jeudi de septembre. Il descendit avec son sac et regarda.

Il avait vu des photos. Il avait lu les spécifications. Rien de tout cela n'avait préparé ce qu'il voyait.

Le complexe s'étendait vers le nord et vers l'est, au-delà de ce que le regard pouvait couvrir sans tourner la tête. Des structures de béton et d'acier, certaines finies, d'autres en construction, reliées par des routes provisoires où les camions soulevaient de la poussière. Ce n'était pas Paranal. Paranal était un observatoire. Quatre coupoles, un bâtiment de contrôle, une résidence. Un lieu construit pour regarder le ciel en silence. Ceci était une machine. Il n'en voyait pas les bords.

On lui donna un badge, un casier dans un dortoir préfabriqué, un login. Le soir, il ouvrit son laptop et se connecta au dépôt de code. Il chercha le module de contrôle de visée, celui dont la documentation disait qu'il dérivait de l'architecture VLT. Il l'ouvrit.

Il reconnut les noms de fonctions. Certains. `align_beam_axis()`. `compute_offset_correction()`. `validate_sensor_readout()`. Il les avait écrits, ou des versions antérieures d'eux-mêmes, trois ans plus tôt, dans un bureau de Paranal, pour ESPRESSO. Les noms étaient les mêmes. Le code à l'intérieur avait été réécrit, étendu, plié dans des couches d'abstraction qu'il ne reconnaissait pas. Des paramètres ajoutés. Des branches conditionnelles pour des cas qu'il n'avait pas prévus. Des fichiers de configuration appelés depuis des répertoires qu'il n'avait pas créés.

*C'est mon code. Ce n'est plus mon code.*

Il commença par le haut. Fichier par fichier, fonction par fonction. C'est ce qu'il faisait. Quand il héritait d'un système, il le traçait. Il n'avait pas d'autre méthode.

Mateo arrive avec deux valises et un bracelet de laine. À l'autre bout du complexe, dans un préfabriqué que personne n'appelle encore par son numéro de bâtiment, Yuki Takamura configure un système de monitoring en buvant un café qu'elle oubliera de finir. Ils ne se croisent pas. Le complexe est trop grand pour les rencontres accidentelles. Mais le code que Mateo ouvre ce soir-là et les capteurs que Yuki calibre ce matin-là font partie du même système, et le système, lui, ne sait pas encore qu'il a besoin des deux.

Le premier soir, le bracelet touchait le bord du laptop quand il tapait. Rouge et noir, laine bolivienne. Le désert d'Atacama, dehors, était le même désert qu'à Paranal. Le ciel serait le même ciel. Mais la machine en dessous était nouvelle, et il n'en connaissait pas encore la forme.
