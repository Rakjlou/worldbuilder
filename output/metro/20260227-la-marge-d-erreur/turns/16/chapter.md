## Les tolérances

Le complexe d'Atacama s'étend sur onze kilomètres carrés de désert. Les bâtiments d'ingénierie, conçus pour cent personnes, en accueillent trois cents. La climatisation n'a pas été recalculée.

---

Cent sept entrées, puis cent huit. Le fichier n'a pas de propriétaire officiel — Mateo Quispe-Rojas l'a créé seul, la première semaine, et personne ne le lui a demandé. Personne ne l'a consulté non plus.

Le moniteur de droite est figé sur la liste. Mateo posa le stylo sur le bureau et regarda les blocs de texte sans vraiment les lire, les yeux suivant la forme des entrées, leur espacement, la façon dont les premières étaient courtes et propres et les plus récentes s'étiraient sur deux, trois lignes. *C'était le signe.* Quand les commentaires s'allongeaient, c'est qu'on ne comprenait plus assez bien pour être bref.

Il revint au moniteur de gauche. La fonction qu'il traçait depuis le matin — `pipeline_calibrate_phase2()` — contenait un facteur de pondération inscrit directement dans le code. Pas de référence. Pas de ticket. Juste `weight_factor = 0.9873`. Il avait ouvert l'historique git : dernier commit il y a dix-huit mois, message *"minor calibration adjustment"*, auteur `o.petrov`. Il avait cherché Petrov dans l'annuaire interne. L'entrée existait encore. Petrov était parti depuis deux ans.

Mateo ouvrit le carnet. L'écriture dans les premières pages était normale, verticale, régulière. Plus loin elle se resserrait, pas de précipitation, juste l'économie des pages qui s'épuisaient. Il trouva la ligne libre après la dernière entrée et écrivit : *`pipeline_calibrate_phase2` — `weight_factor = 0.9873` — Petrov, 18 mois — "minor adjustment" — no ticket, no derivation, no test.* Il souligna *no derivation*. Puis il ajouta, plus petit, entre parenthèses : *(même famille que Delgado ?)*.

*C'était ça le problème.* Pas un seul facteur inexpliqué. Pas même dix. C'est que chaque facteur avait été ajouté par quelqu'un qui savait exactement pourquoi, sur le moment, et qui ne l'avait pas écrit parce qu'il y avait autre chose à faire, parce que c'était évident, parce que le télescope avait une observation programmée dans quarante minutes. Et maintenant il y avait cent sept traces d'urgences passées, de décisions raisonnables prises dans l'obscurité et jamais ramenées à la lumière. Il leva les yeux vers la fenêtre. Le désert était blanc sous le soleil de fin de matinée, la couleur de quelque chose qui absorbe tout. Il toucha le bracelet sur son poignet gauche, un geste sans pensée consciente. *Para que no te olvides.* Il n'oubliait pas. C'était précisément le problème.

Il ajouta une ligne dans le fichier. Cent huit.

---

Deux cents kilomètres séparaient le bureau de Mateo du poste de monitoring de Nadia Koreneva. Il n'y avait aucune raison qu'ils se croisent. Le code que l'un auditait et l'énergie que l'autre mesurait passaient par les mêmes systèmes, mais dans des langages que les organigrammes du projet ne reliaient pas.

---

Le soleil avait tourné. Dans la section de monitoring énergétique, au sous-sol du bâtiment C, les écrans étaient orientés dos à la seule fenêtre — une meurtrière horizontale à hauteur du plafond qui laissait entrer une bande de lumière ambrée à partir de seize heures.

Nadia ne leva pas les yeux pour le constater. C'était la couleur que prenaient les écrans quand le soleil atteignait cet angle, une teinte qui se superposait aux courbes vertes et créait une confusion de nuances qu'elle avait appris à ignorer après trois mois ici. Elle posa son stylo. Le reprit.

*Ce n'était pas aléatoire.*

Elle tourna le cahier vers la lumière. Quatre ramps enregistrées depuis la semaine précédente, chacune dans les tolérances spécifiées — écart maximal 0,8 %, délai de montée conforme à ±1,2 secondes, fréquence maintenue. Cristóbal avait clôturé les tickets. Bien sûr qu'il les avait clôturés. Les tolérances étaient respectées. Mais elle traça à la règle une ligne passant par les quatre points de déviation — minute 7 de chaque ramp, presque à la virgule — et la ligne était droite. Trop droite. Les déviations aléatoires ne forment pas de lignes droites. Les déviations systématiques, si.

Elle but une gorgée du café du couloir. Froid. Elle l'avait oublié là depuis deux heures. Elle reposa le gobelet et ouvrit une nouvelle page du cahier. *Elle avait vu ce schéma. Pas à cette échelle — on n'avait jamais rien fait à cette échelle — mais la signature était la même. Khmelnytsky, 2001, avant la mise à niveau des échangeurs. Une légère asymétrie thermique dans la boucle secondaire qui ne se manifestait qu'à la montée en puissance, jamais au régime stable. Les tolérances étaient respectées. Pendant six mois, les tolérances étaient respectées.* Elle commença à écrire : date, heure, numéros de ramp, valeurs brutes. Pas les valeurs lissées que le système d'archivage produisait automatiquement. Les valeurs brutes, qu'elle avait eu la précaution de configurer pour qu'elles soient enregistrées en parallèle dès le premier jour.

Son père disait : *les instruments ne mentent pas, mais ils ne racontent qu'une partie de l'histoire*. Il parlait des manomètres de vapeur, mais le principe s'appliquait. Ces quatre ramps avaient réussi leurs tests. Elles avaient aussi, chacune, dévié de façon identique à la septième minute. La physique ne fait pas de coïncidences. Elle nota en marge, entre parenthèses, en ukrainien — habitude qu'elle avait gardée, une petite vie privée dans les données : *(chercher l'inertie thermique — est-ce que les couplages réacteur-réseau se synchronisent mal à un palier précis de puissance ?)* Elle souligna deux fois. Demain matin, avant que Cristóbal arrive, elle sortirait les logs bruts des quatre centrales qui participaient à ces tests. Pas les rapports agrégés. Les logs. Le projet avait des délais. La physique n'en avait pas.

---

*Dans les tolérances.* Cristóbal l'avait écrit quatre fois dans les tickets clôturés de la semaine. Le système d'archivage l'inscrivait automatiquement dans les rapports de conformité. La phrase circulait dans le complexe comme une monnaie dont personne ne vérifiait plus la valeur faciale.

---

Yara Haddad était arrivée avant tout le monde. Elle arrivait toujours avant tout le monde quand un document l'empêchait de dormir.

La lumière du matin frappait les fenêtres à angle rasant, longues bandes blanches sur le sol en béton. Dehors, une grue pivotait lentement — le contrepoids décrivant un arc parfait contre le ciel bleu. *Six heures quatorze. Une heure avant que l'équipe arrive.* Sa tasse de café, posée à gauche du clavier, était intacte depuis vingt minutes.

Elle tenait le rapport de déviation dans ses deux mains. Treize pages. La dérive du secteur 7-Bravo dans le réseau d'enceintes de confinement : 0,003 degrés sur l'axe z. Dans les tolérances. Documenté, certifié, signé par trois ingénieurs de terrain et un superviseur de chantier. *Dans les tolérances qu'elle avait fixées elle-même.* Elle posa le rapport sur le bureau, se leva, et alla au tableau blanc.

Son diagramme d'architecture de sécurité occupait les deux tiers du panneau gauche. Elle l'avait dessiné elle-même, il y a dix-huit mois, en rouge et noir — les états du système, les transitions, les interlocks. À côté, dans un coin du panneau droit, la surface d'Ephrem : une forme topologique compacte, tracée à la hâte pendant leur réunion de révision, jamais effacée. Le feutre rouge de Yara avait pâli sous les néons. Le trait d'Ephrem, lui, était resté net — il avait appuyé plus fort, ou le feutre noir résistait mieux. Personne dans l'équipe d'intégration ne les avait effacés. Personne ne les avait non plus mentionnés dans un rapport. Yara posa le doigt à quelques centimètres du dessin d'Ephrem sans le toucher. *La frontière entre « non-activé » et « activé avec succès ».* Il lui avait demandé où exactement se trouvait cette frontière, dans son architecture. Elle avait passé la semaine suivante à chercher une réponse précise. Elle avait trouvé une réponse acceptable.

La déviation de 0,003 degrés ne figurait dans aucune de ses transitions d'état. Pas parce qu'elle l'avait exclue — parce qu'elle avait défini ses tolérances pour absorber exactement ce genre d'écart. *C'était la définition d'une tolérance.* Elle toucha la cicatrice sur son nez, l'effleura du pouce. Le bruit des engins de chantier montait sourd à travers les vitres, une vibration basse qui se confondait avec le silence. Elle retourna à son bureau, ouvrit un nouveau fichier, et commença à écrire : *Secteur 7-Bravo. Implication sur l'architecture de sécurité.* Elle s'arrêta après la deuxième ligne. Regarda la surface d'Ephrem sur le tableau.

Elle rouvrit le rapport de déviation à la page quatre.

---

Le fichier de Mateo, le cahier de Nadia, le rapport sur le bureau de Yara. Trois registres d'écarts, tenus séparément, dans trois disciplines, par trois personnes qui ne se sont pas parlé cette semaine. Chaque écart est dans les tolérances. Les tolérances ne communiquent pas entre elles.
