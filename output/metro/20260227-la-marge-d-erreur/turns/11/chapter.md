## La frontière

La salle de revue B du complexe d'Atacama n'a pas de fenêtres. Elle a un projecteur, un tableau blanc, douze chaises, et un néon qui clignote quand la climatisation se met en marche.

Yara se leva et connecta son laptop au projecteur. La première diapositive apparut : **Safety Architecture — Planetary Displacement System — Design Review v4.2.** Elle ne regarda pas la salle. Elle connaissait la salle. Huit personnes, la plupart ingénieurs, deux physiciens, et Ephrem, assis au fond, un carnet ouvert sur les genoux.

— L'architecture repose sur trois couches indépendantes de protection, dit-elle. Sa voix était posée, calibrée pour une pièce de cette taille. — Couche un : conditions d'arrêt automatiques. Si un paramètre dépasse son seuil de tolérance, le système interrompt la séquence. Pas de décision humaine dans la boucle. Le matériel décide.

Elle changea de diapositive. Un schéma : les flux de données, les capteurs, les actionneurs. Chaque flèche annotée avec un temps de réponse.

— Couche deux : états de repli. Si l'arrêt automatique échoue, le système retourne à un état de sécurité prédéfini. L'état de sécurité est défini comme l'état dans lequel le déplacement temporel n'a pas été initié. Le système revient en deçà du seuil d'activation.

*Chaque mot est pesé. Chaque condition est testable. Les seuils viennent des données de prototypage, validés sur trois séries indépendantes.*

— Couche trois : arrêt d'urgence manuel. L'opérateur peut forcer l'arrêt à tout moment de la séquence pré-activation. Post-activation, le repli automatique prend le relais.

Elle montra le diagramme d'états. Cinq états, des flèches entre eux, chaque transition annotée. L'état initial en vert : IDLE. L'état final en bleu : DISPLACEMENT COMPLETE. Entre les deux, les états intermédiaires. Et à chaque étape, une flèche rouge vers la gauche : ABORT.

— La distinction fondamentale est entre l'état pré-activation et l'état post-activation. Toute l'architecture repose sur le fait que ces deux états sont distinguables. Que le système peut déterminer, à tout instant, s'il est dans l'un ou dans l'autre.

Elle regarda la salle. Six visages attentifs, un qui prenait des notes, et Ephrem, qui ne bougeait pas.

— Des questions avant que je passe aux résultats de validation ?

Le silence dura quatre secondes. Puis Ephrem leva la main.

---

Il se leva lentement. Ses mains bougèrent avant qu'il ne parle.

— Merci, Yara. L'architecture est remarquable. Je le dis sans qualification.

Il s'approcha du tableau blanc. Prit le feutre noir. Commença à dessiner. La surface apparut : pas une sphère, pas un tore, quelque chose d'intermédiaire, avec une courbure qui se refermait sur elle-même sans laisser de jointure visible. Il dessina pendant trente secondes, puis posa le feutre et se tourna vers elle.

— Votre architecture repose sur une hypothèse. L'hypothèse est qu'il existe une frontière nette entre deux états : le système n'a pas été activé, et le système a été activé avec succès. C'est correct ?

— C'est correct, dit Yara.

Il reprit le feutre et posa un point sur la surface.

— Considérez cet espace. C'est la variété des solutions du déplacement temporel à l'échelle planétaire. Il posa un second point, à l'opposé du premier. — Ce point est votre état IDLE. Celui-ci est votre état DISPLACEMENT COMPLETE.

Il traça une ligne entre les deux points.

— Sur une variété ouverte, avec un bord, ces deux points sont distincts. On peut tracer un chemin de l'un à l'autre, et il y a une frontière entre eux. Votre architecture fait exactement ça.

Il s'arrêta.

— Mais cette variété est fermée. Compacte. Sans bord. Il n'y a pas de frontière. Il n'y a pas de séparation topologique entre vos deux états. Si vous partez de IDLE et que vous marchez assez longtemps, vous arrivez à DISPLACEMENT COMPLETE sans avoir traversé quoi que ce soit. Les deux points sont le même point vu depuis deux positions sur la variété.

Il posa le feutre. Se tourna vers Yara.

— Je ne dis pas que votre architecture est fausse. Je dis que la structure mathématique du problème ne distingue pas entre l'état que vous appelez "sûr" et l'état que vous appelez "activé". La frontière que votre système surveille n'est peut-être pas une propriété de la physique. C'est peut-être un artefact de la façon dont nous avons choisi de coordonner la variété.

Le silence. Trois secondes. Cinq.

— Si la boucle temporelle existe, elle n'a pas d'origine. Elle n'a pas de direction. Elle est. Et si elle est, votre système de sécurité surveille une frontière qui n'est pas là.

Il s'assit.

---

Yara ne répondit pas tout de suite. Elle regarda la surface sur le tableau. Puis elle regarda son propre diagramme d'états, toujours affiché sur l'écran du projecteur.

— Je comprends la topologie, dit-elle. Elle dit cela sans condescendance et sans concession. — Ma question est différente. Ma question est : qu'est-ce que je fais avec ça ?

Elle se leva. S'approcha du tableau. Pas pour effacer le dessin d'Ephrem. Pour se tenir à côté.

— Si je vous suis jusqu'au bout, il n'existe pas d'état de sécurité. Pas d'état dans lequel le système est au repos et vérifiable. Pas d'état vers lequel ramener le système en cas d'anomalie. Chaque condition d'arrêt de mon architecture suppose que l'arrêt produit quelque chose de distinct de l'activation.

*Il a raison. Je le vois. La mathématique ne ment pas. Mais je suis ingénieure, pas mathématicienne. Mon problème n'est pas de décrire la variété. Mon problème est de construire un système qui protège sept milliards de personnes, et pour ça j'ai besoin d'une frontière. Même si elle n'est qu'opérationnelle.*

— Ephrem. Votre résultat s'applique à la variété des solutions globales. À l'espace des phases complet. Mais un système de contrôle ne vit pas dans l'espace des phases complet. Il vit dans un sous-espace. Une carte locale. Et dans une carte locale, la distinction entre les deux états existe. Elle est mesurable. Mes capteurs la voient.

Il secoua la tête. Pas brusquement. Avec la patience de quelqu'un qui a anticipé l'objection.

— Une carte locale est un choix de coordonnées. Elle ne change pas la topologie sous-jacente. Si la variété globale n'a pas de frontière, votre carte locale crée une frontière artificielle. Et un système de sécurité construit sur une frontière artificielle ne protège que tant que la dynamique reste dans la carte. Si le système approche le bord de votre carte, la frontière disparaît. Pas parce que vos instruments sont défaillants. Parce que la frontière n'était pas dans la physique. Elle était dans la cartographie.

La discussion dura trois heures. Yara contesta chaque point, non pas par obstination mais par nécessité. Si Ephrem avait raison, son architecture entière reposait sur une hypothèse fausse. Et elle ne pouvait pas reconstruire l'architecture sans cette hypothèse. Il n'existait pas de théorie de la sécurité pour un système sans état de repos. Personne n'avait jamais eu besoin d'en construire une.

Elle posa les questions qu'il fallait poser. Qu'est-ce qui change dans les prédictions numériques si la variété est fermée. Quel est l'impact sur les seuils de tolérance. Ephrem répondit à chaque fois. Les prédictions numériques ne changent pas. Les seuils restent valides localement. Le problème n'est pas quantitatif. Il est structurel.

À dix-huit heures, la salle était vide sauf eux. Les chaises étaient en désordre. Quelqu'un avait laissé un gobelet en carton sur la table.

— Je ne peux pas certifier un système de sécurité qui ne contient pas d'état de sécurité, dit Yara. Ce n'est pas une opinion. C'est une impossibilité logique.

— Je sais, dit Ephrem. Et je ne peux pas vous dire que la frontière existe, parce que les mathématiques disent qu'elle n'existe peut-être pas. Ce n'est pas une opinion non plus.

Ils se regardèrent. Pas comme des adversaires. Comme deux personnes qui viennent de découvrir qu'elles ne parlent pas la même langue et qu'aucun dictionnaire n'existe.

Yara rangea son laptop. Éteignit le projecteur. La salle retrouva sa lumière grise.

*Il n'a pas tort. Je ne peux pas intégrer sa vérité. Ce n'est pas la même chose que la nier.*

Elle sortit. Il resta assis encore un moment, le carnet ouvert, le feutre posé à côté.

La surface resta sur le tableau blanc pendant des jours. Personne ne l'effaça. Les gens qui entraient dans la salle la voyaient, la contournaient du regard, et passaient à l'ordre du jour. La surface ne faisait pas partie de l'ordre du jour. Elle faisait partie du problème que l'ordre du jour n'avait pas de case pour contenir.
