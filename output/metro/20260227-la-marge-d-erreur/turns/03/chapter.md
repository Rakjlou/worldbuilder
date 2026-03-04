## Le bracelet

Paranal, quinze heures. Le soleil avait encore trois heures à peser sur le béton du bâtiment opérationnel avant que les coupoles commencent à s'ouvrir.

Mateo ouvrit un nouveau fichier dans son éditeur — pas encore dans le dépôt, juste un brouillon — et tapa la première ligne : *ESPRESSO NGSD Controller — Race Condition Fix, detector readout fast mode*. Il s'arrêta. Effaça. Recommença : *Root cause analysis and fix — ESPRESSO fast readout race condition (firmware v3.4.1)*. Mieux. Le titre devait dire ce que c'était, pas ce qu'il avait fait.

*Le problème, c'était le délai entre le signal de déclenchement du détecteur et l'initialisation du DMA buffer. Pas grand-chose — cent quatre-vingt microsecondes dans le pire cas. Mais dans le mode de lecture rapide, ça suffisait. Le cycle suivant arrivait avant que le buffer soit prêt. Corruption de données. Intermittente, évidemment. Le genre de bug qui refuse de se montrer quand on le cherche.*

Il écrivit pendant vingt minutes sans s'arrêter, dans cet anglais technique qu'il avait appris dans la documentation et les manuels, plus précis que sa conversation quotidienne, parfois plus précis que ce dont il avait besoin. Il décrivait la séquence d'initialisation, la fenêtre de vulnérabilité, la solution : un sémaphore, une vérification explicite avant chaque cycle. Simple, en fin de compte. Deux jours pour comprendre pourquoi, deux heures pour écrire le correctif, vingt minutes pour rédiger quelque chose que le prochain ingénieur pourrait lire à deux heures du matin sans avoir à tout reconstituer lui-même. *Cette partie-là est aussi importante que le reste. Peut-être plus.*

Son téléphone était posé à côté du clavier, écran éteint. Valentina. Il calcula mentalement : le délai de l'examen, les frais d'inscription, son prochain virement. Il pouvait couvrir ça. Ce n'était pas la question. La question c'était l'heure à La Paz, si elle était entre deux cours, si leur père avait encore eu cette douleur dans la jambe dont sa mère n'avait pas soufflé mot dimanche dernier, parce qu'elle ne disait jamais rien qui pourrait l'inquiéter, ce qui voulait dire qu'il y avait toujours quelque chose. Il posa l'index sur l'écran. Le ralluma. Vit le message. *Ce soir. Je l'appelle ce soir.*

Dans le couloir, deux techniciens parlaient de Rubin, un signal, quelqu'un qui avait dû faire des heures supplémentaires pour recalibrer un instrument. Mateo entendit sans écouter. Ce genre de bruit existait toujours dans les observatoires.

Elle passa devant sa porte sans s'arrêter. Il leva la tête sans parler. Ils partageaient un couloir, un désert, un employeur, et un accord tacite qui consistait à ne rien exiger de la présence de l'autre.

*Seo-yun. Le script de réduction de données.* Il se souvenait — pas du script lui-même, mais de la façon dont il avait trouvé le problème : un index mal aligné dans la boucle de normalisation des flats, le genre d'erreur qui passe inaperçue jusqu'à ce que les résultats soient légèrement faux et que personne ne sache pourquoi. Il l'avait corrigé un mardi soir parce que le fichier était ouvert dans son terminal et que ne pas le corriger lui aurait semblé bizarre. Elle avait envoyé un message le lendemain : *merci pour le script*. Il avait répondu : *de rien*. Fin de la conversation.

*Elle travaille sur quoi, là ?* La question traversa son esprit et disparut. Pas son domaine. Pas son instrument. Il retourna à sa documentation. Le paragraphe sur le comportement du sémaphore sous charge élevée n'était pas encore assez clair. Il fallait un exemple de timing, des chiffres concrets, sinon le texte restait trop abstrait pour être utile à trois heures du matin.

Il retapa la phrase. La relut. *Mieux.* Sur le seuil de son bureau, Seo-yun était déjà loin dans le couloir. Le bruit de ses pas s'estompait vers les labos.

L'après-midi continua. Le bracelet au poignet de Mateo pesait ce qu'il pesait : presque rien, et tout ce qu'il fallait.
