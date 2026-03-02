## La frontière

Yara posa le marqueur sur le rebord du tableau blanc et recula d'un pas.

Quatre-vingt-douze jours de travail étaient là, sous ses yeux, dans l'encre bleue et rouge qui couvrait les trois panneaux. Les boucles de contrôle à gauche, les seuils d'abandon au centre, les états de repli à droite. Elle regarda l'ensemble comme on regarde un bâtiment qu'on vient de construire, en cherchant ce qui manque.

« Voilà pour la séquence d'abandon. La logique est hiérarchique — chaque niveau d'intervention a une fenêtre temporelle définie et un critère de déclenchement précis. Si on ne peut pas confirmer la stabilité de la boucle dans les 340 millisecondes, on coupe. Automatiquement. Sans intervention humaine. »

*Ça, j'ai dû me battre pour l'obtenir. Trois semaines à convaincre que l'opérateur humain est le maillon faible dans cette fenêtre de temps. Les chiffres ont fini par parler.*

Elle balaya la salle du regard. La salle de conférence du complexe d'Atacama sentait encore la peinture fraîche et manquait de chaises. Quatre mois qu'elle était là. Le désert dehors, les tableaux blancs dans les couloirs, tout en construction. Mais c'était réel maintenant. Aux bords de la pièce, cinq ou six membres de l'équipe prenaient des notes. Ses yeux cherchèrent Ephrem Kebede, assis au milieu, un carnet ouvert devant lui. *Je connais ses travaux. La topologie orbitale. La boucle temporelle. Je me demande depuis dix minutes si sa façon de formuler les boucles a des implications que je n'ai pas encore tirées jusqu'au bout. Probablement pas.* Elle posa les mains à plat sur la table.

« Le postulat central de toute cette architecture, c'est qu'il existe un état du système qu'on peut appeler sûr. Un état de retour à la ligne de base. C'est la fondation. Si cette hypothèse tient, le reste tient. »

Un temps.

« Questions. »

Ephrem leva la main. Pas brusquement, avec la patience de quelqu'un qui a appris à attendre le bon silence. Il se leva à demi, se ravisa, resta assis. Son carnet était ouvert sur un dessin : une sphère avec deux points marqués, reliés par une courbe. Il posa son stylo.

« Merci, Yara. C'est vraiment du très beau travail — la granularité des modes de défaillance en particulier, je n'avais pas vu cette analyse avant aujourd'hui. »

Il s'arrêta un instant. Sa voix descendit d'un demi-registre.

« J'ai une question sur l'hypothèse centrale. Pas sur l'ingénierie — l'ingénierie est solide. Sur la géographie du problème. »

Il tourna son carnet vers elle, sans le pousser, juste pour que les gens autour de la table voient le dessin s'ils le voulaient. La sphère et ses deux points. La courbe qui les reliait. Yara reconnut la structure.

« Vous avez dit : si l'hypothèse tient, le reste tient. L'hypothèse est qu'il existe une frontière entre l'état non-activé et l'état activé avec succès — une ligne qu'on peut traverser dans un sens, et revenir en arrière dans l'autre. Un bord. » Une pause. « Or la topologie de la boucle temporelle — et je précise, c'est encore un résultat préliminaire, mais il est robuste — suggère que la boucle est une variété fermée sans bord. »

Il prononça les deux mots séparément. Calmement.

« Sans bord. Ce qui signifie, dans le langage que vous utilisez : l'état initial et l'état final pourraient être le même point sur la variété. Topologiquement indiscernables. »

*Putain.*

Yara ne dit pas ça à voix haute. Elle regarda le dessin, la sphère, les deux points, la courbe. *Section 4.3 de son papier. Les implications topologiques de la fermeture de la boucle. Je l'avais lu. J'avais pensé : problème théorique, pas d'impact sur l'ingénierie pratique. Je l'avais mis de côté.* Elle prit le marqueur, pas parce qu'elle avait quelque chose à dessiner — pour avoir quelque chose dans les mains. Elle se retourna vers son tableau blanc. La flèche rouge qu'elle avait tracée le premier jour, quatre-vingt-douze jours plus tôt. De *actif* vers *baseline*. Une frontière. Un avant et un après.

*Si cette frontière n'existe pas géométriquement, si c'est le même point, alors je n'ai pas conçu un système de sécurité. J'ai conçu une architecture cohérente dans un espace qui ne correspond pas à la réalité physique.*

La salle était silencieuse d'une façon particulière. Pas le silence de la confusion. Le silence de gens qui comprennent que quelque chose vient de changer.

« Non. » Sa voix était calme. « Je n'avais pas d'hypothèse géométrique explicite sur la structure de l'espace d'états. J'avais une hypothèse implicite — la même que dans n'importe quel système de contrôle que j'ai jamais conçu : que le temps est une variable unidirectionnelle et que les états sont discernables par leur position sur cet axe. »

Elle posa le marqueur.

« Votre question identifie l'endroit exact où mon modèle et la physique réelle peuvent diverger. Vous avez raison. C'est là qu'on doit travailler ensemble. »

Ephrem la regarda. Quelque chose dans son visage se détendit. Pas du soulagement exactement. De la reconnaissance.

« Merci. » Il dit ça simplement, sans emphase particulière, mais il le dit. « Ce que vous venez de faire est plus difficile que de construire l'architecture entière. »

Il reprit son stylo, traça quelque chose rapidement dans son carnet. Pas pour montrer. Pour penser avec les mains. *Il faut que je sois honnête à mon tour. Parce qu'elle l'a été.*

« Je dois être précis sur ce que je sais et ce que je ne sais pas, parce que vous venez d'être précise sur la même chose. Mon résultat dit que la boucle est une variété fermée sans bord. Ce que ça implique pour l'espace des états du système — pour votre espace des états — je ne le sais pas encore. La connexion entre ma topologie et votre ingénierie n'est pas établie. C'est une hypothèse de travail, pas un théorème. » Sa voix descendit à nouveau. « Mais c'est une hypothèse de travail sérieuse. »

Il posa son stylo et leva les yeux vers la salle. Pas seulement vers Yara. Vers les autres, ceux qui n'avaient rien dit encore.

« Voici ce que je propose, et c'est une proposition, pas une exigence — je suis mathématicien, pas chef de projet. » Une légère inflexion dans la voix, pas tout à fait de l'humour, mais presque. « Yara et moi travaillons ensemble sur la structure géométrique de l'espace des états. Deux semaines — je suis là encore deux semaines. Nous cherchons soit à établir que sa frontière existe bien dans la topologie de la boucle, soit à comprendre précisément dans quels scénarios elle n'existe pas. Dans les deux cas, l'architecture est plus solide après qu'avant. »

Il marqua une pause.

« Si dans deux semaines nous ne trouvons pas de fondement géométrique satisfaisant, nous le disons. Nous le disons clairement, à tout le monde, y compris à ceux qui décident du calendrier. »

Yara l'observait. *Le projet avance. Il le sait aussi. Le calendrier ne s'arrête pas pendant qu'on résout les fondements. Et la question qu'il ne pose pas tout haut, c'est : est-ce que quelqu'un dans cette salle a l'autorité pour le ralentir ?*

Ephrem referma son carnet, les deux mains à plat sur la table.

« L'hypothèse implicite que le temps est une variable unidirectionnelle et que les états sont discernables — c'est l'hypothèse de presque toute la physique classique. Ce n'est pas une erreur de l'avoir faite. C'est une erreur de continuer à la faire une fois qu'on sait qu'on la fait. »

La salle ne bougea pas. Yara regarda la flèche rouge sur le tableau blanc, celle qui allait de *actif* vers *baseline*, et pour la première fois elle la vit non pas comme un axiome mais comme une question.
