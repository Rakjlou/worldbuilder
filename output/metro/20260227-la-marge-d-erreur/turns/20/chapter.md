## Le rapport

Le complexe d'Atacama avait un système de gestion des incidents techniques. Il fonctionnait. Les rapports entraient par un formulaire standardisé, recevaient un numéro séquentiel, étaient transmis au responsable hiérarchique concerné, puis à l'équipe de validation compétente. Chaque étape laissait une trace horodatée. Le système ne perdait rien.

---

Mateo Quispe-Rojas relut le titre une dernière fois : *Anomalie de configuration — correction_factor = 0.9743 — Rapport d'incident n°INC-2024-0312.* Le curseur clignotait après la section Recommandations. Il la relut aussi. *Retirer correction_factor = 0.9743 de geometry_config.ini. Mettre à jour la documentation pour refléter la géométrie actuelle. Impact estimé : correction d'un décalage temporel de 2,57 %.* Il tourna le bracelet sur son poignet gauche. Prototype Année 1. Changement de géométrie Année 3. Facteur non mis à jour. Quatre ans de calculs de ciblage avec un décalage intégré en dur. Le ticket #2847 de Yuki. Son propre script de vérification, les sorties avant et après, les tableaux comparatifs. Tout était dans le rapport. Tout était sourcé.

Il cliqua sur *Soumettre*. Le système confirma la transmission à son responsable direct, Marco Ibáñez, avec copie automatique au registre des incidents techniques. Un petit son — neutre, ordinaire, le même pour un rapport d'incident critique et pour une demande de badge visiteur. Mateo se redressa légèrement. *Voilà.* Le mot n'avait pas de poids particulier. Marco le lirait, le transmettrait à la validation, et quelqu'un retirerait la ligne dans le fichier `.ini`. Deux semaines, peut-être trois. Il ouvrit un nouvel onglet. La fluorescente avait cessé de clignoter quelque part dans les derniers jours. Il ne s'en était pas aperçu.

---

INC-2024-0312 fut transmis à Marco Ibáñez à 7h47. Marco Ibáñez lut le rapport à 9h15, entre deux réunions de coordination sur le calendrier de validation. Il le lut en entier. Il nota dans son carnet : *Quispe-Rojas — facteur obsolète dans geometry_config — à transmettre validation*. Il le transmit à l'équipe de validation à 10h02 avec la mention « pour évaluation technique ». Le système horodata la transmission.

---

Au périmètre est du complexe, dans la pénombre de la salle de monitoring, Kwame Asante-Mensah posa les doigts à plat sur le bureau, de chaque côté du clavier. Il était 22h14. Le désert dehors était d'un silence absolu. Il relut le document pour la quatrième fois. *Technique Note RFI-2026-007. Observation d'une anomalie temporelle dans le signal de référence durant la calibration de ciblage spatial.* Cinq pages. Douze figures. Aucune spéculation. Il avait été très soigneux à ce sujet : il décrivait ce que l'instrument montrait, uniquement ce que l'instrument montrait. Le reste appartenait à l'équipe d'ingénierie.

Il ouvrit le carnet bleu, vérifia une dernière fois la valeur inscrite en rouge encerclé : 0,2 ms. Pré-arrivée. Reproductible. Quinze séquences de calibration sur quatre jours. *Gifty dirait : si tu l'as vu, tu l'as vu. Envoie-le.* Il referma le carnet, posa la main dessus une seconde. Il cliqua sur Envoyer. La note partit dans la liste de distribution interne — soixante-dix noms, peut-être quatre qui la liraient, un ou deux qui comprendraient de quoi il parlait. *Nyame nhyira wo.* Il ne priait pas pour que quelqu'un agisse. Il priait parce qu'il avait fait ce qu'il devait faire, et que le reste ne lui appartenait pas.

---

RFI-2026-007 arriva dans soixante-dix boîtes de réception. Quarante-trois personnes ne l'ouvrirent pas. Dix-neuf l'ouvrirent, lurent le résumé, la classèrent. Cinq lurent les deux premières pages. Trois lurent le document en entier. Aucune des trois ne travaillait sur le ciblage spatial. Aucune des trois n'avait lu le rapport INC-2024-0312.

---

La lumière du matin entrait par la fenêtre du bureau de Yara Haddad dans l'aile des systèmes de sécurité. Elle lut le rapport de Quispe-Rojas lentement. Pas par prudence — parce qu'elle avait appris, à CERN, qu'un rapport bien rédigé mérite d'être lu à la vitesse à laquelle il a été écrit. *Quispe-Rojas.* Les revues techniques, une voix posée, des questions précises. Le genre de personne qui n'envoie pas un rapport à 7h43 sans y avoir réfléchi la veille. Elle posa deux doigts sur la cicatrice de son nez.

Elle ouvrit ses propres tolérances sur un second écran — le document qu'elle avait rédigé dix-huit mois plus tôt, relu quatre fois, défendu en réunion pendant une heure face à des gens qui voulaient des marges plus serrées. 2,57 %. Elle avait prévu 3 %. *Dans les clous. Techniquement dans les clous.* Mais chaque ligne de l'historique git impliquait la même chose : les tolérances avaient été calculées pour une géométrie. La géométrie avait changé. Les tolérances étaient restées. Ce n'était pas un dépassement. C'était une hypothèse devenue invisible.

Elle se leva et marcha vers le tableau blanc. Son architecture était là, rouge et noire, les états de transition tracés au marqueur fin qu'elle réservait aux choses importantes. À droite, la surface topologique d'Ephrem, encore nette, jamais effacée. Elle posa l'index sur le secteur 7-Bravo. La dérive de 0,003°. Dans ses marges. *Mais calculées avec quelle géométrie ?* Elle connaissait la réponse.

Elle retourna à son bureau, ouvrit un nouveau document. Pas une réponse au rapport, pas encore. Une liste de questions avec des numéros. Depuis quand la géométrie de la cible avait-elle changé — date précise. D'autres facteurs de correction liés à la même géométrie prototype. La dérive du secteur 7-Bravo — mesurée avant ou après le changement. Les tolérances — recalculées pour la géométrie actuelle. *Réponse connue : non.* Elle marqua le rapport « à traiter — priorité technique ». Elle l'ajouta à la liste des points ouverts. Vingt-trois entrées. Six semaines avant la validation. Vingt-trois points ne se traitent pas en six semaines. Ils s'accumulent.

---

L'équipe de validation reçut le rapport INC-2024-0312 à 10h02. Ils l'évaluèrent selon la procédure. La procédure demandait de vérifier si la déviation se situait à l'intérieur ou à l'extérieur des tolérances définies. Le décalage de 2,57 % se situait à l'intérieur. L'équipe nota : *déviation dans les marges, pas d'action corrective immédiate requise*. Le rapport fut classé. Pas ignoré — classé. Horodaté, archivé, référencé.

Le mot *tolérances* apparaissait onze fois dans le rapport de Mateo. Il apparaissait trois fois dans la réponse de l'équipe de validation. Il signifiait deux choses différentes. Mateo l'utilisait pour dire : ces marges reposent sur une hypothèse qui n'est plus vraie. L'équipe de validation l'utilisait pour dire : la valeur mesurée est à l'intérieur de l'intervalle autorisé. Les deux usages étaient corrects. Ils ne se parlaient pas.

---

Un rapport d'incident classé dans les tolérances. Une note technique sur un écho temporel envoyée à soixante-dix personnes. Une liste de vingt-trois points ouverts dans le bureau d'une femme qui avait conçu les marges que le système citait pour ne rien faire. Les trois documents existaient dans le même complexe, la même semaine, sur le même sujet. Si une seule personne avait lu les trois, elle aurait vu le dessin. Personne ne les lut. Le système ne le permettait pas — pas par interdiction, par architecture. Les rapports d'incident allaient aux responsables hiérarchiques puis à la validation. Les notes techniques RFI allaient à la liste de distribution du monitoring. Les listes de points ouverts restaient dans le bureau de la personne qui les tenait. Trois canaux. Trois formats. Trois tiroirs.
