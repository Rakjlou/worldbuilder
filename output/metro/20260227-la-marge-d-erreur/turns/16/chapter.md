## L'écho

Le rythme change. Les années qui séparaient les événements se compriment. La construction avance. Les tests commencent. Les marges rétrécissent. Pas les marges techniques, celles du calendrier, celles qui donnent aux gens le temps de vérifier, de douter, de recommencer. Ces marges-là disparaissent les premières.

Le signal de référence était propre. Kwame le vérifiait pour la troisième fois, non pas parce qu'il doutait des deux premières, mais parce que ce qu'il avait noté dans la marge de son cahier n'avait pas de sens et que les choses qui n'ont pas de sens méritent une troisième vérification.

Il remonta l'écran jusqu'au début de la trace d'oscilloscope. Le signal de calibration, un pulse de référence à 1,42 GHz, apparaissait au temps T0, propre, bien défini, rapport signal-sur-bruit de 47 dB. Il fit défiler vers la gauche, avant T0, là où il n'y avait rien à voir. Le plancher thermique du système.

Sauf que ce n'était pas que du bruit.

À moins 2,3 microsecondes avant le pulse de référence, une perturbation. Pas un pic. Pas un transitoire. Une forme. Faible, trois décibels au-dessus du plancher, mais avec la même signature spectrale que le pulse principal.

*Un écho.* Le mot s'était posé dans sa tête sans qu'il le cherche. Les échos arrivent après le signal source. Celui-ci arrivait avant.

Il nota dans son cahier : *Écho du pulse de référence observé à T0 - 2,3 us. Amplitude : -44 dB. Signature spectrale cohérente. Direction temporelle : inversée.*

Il connaissait cette signature. Il l'avait vue à Jodrell Bank, quatre ans plus tôt, quand il avait confirmé le signal temporel de 4,7 microsecondes dans les données de l'objet. La signature de déplacement temporel. Sauf qu'il n'y avait pas de déplacement temporel dans un test de calibration. Le système n'était pas activé. Pas de charge dans les accumulateurs. Pas de faisceaux alignés. Aucune raison physique pour qu'un micro-déplacement se produise.

Il lança une quatrième acquisition. Mêmes paramètres. Il attendit les onze secondes du cycle. L'écho était là. Même position. Même amplitude. Reproductible.

*Si c'est reproductible, ce n'est pas du bruit. Si ce n'est pas du bruit, c'est un signal. Et si c'est un signal, il a une source.*

Ce qu'il n'avait pas, c'était l'accès au code de calibration. Le pulse de référence était généré par le logiciel. Les paramètres, les corrections temporelles, les offsets, tout cela vivait dans des fichiers de configuration qu'il ne connaissait pas. Ce n'était pas son domaine. Son domaine était le signal. Le signal disait qu'il y avait un micro-déplacement là où il ne devrait pas y en avoir. La source était ailleurs, dans la couche logicielle, dans les paramètres que d'autres personnes avaient écrits.

Il nota : *Contacter l'équipe software pour les paramètres de calibration du pulse de référence.* Puis il referma le cahier et alla se faire un thé.

---

La jauge du Danube affichait 2,14 mètres à six heures du matin, heure de Kiev. Nadia vérifiait chaque matin, depuis le téléphone, avant de mettre les chaussures. 2,14 mètres. Normal pour la saison.

Le test de montée en puissance numéro sept était programmé à dix heures. Injection de charge, rampe à 15 % de la capacité nominale, maintien quatre-vingt-dix secondes, retour à zéro. Les cinq premiers tests avaient suivi le profil prévu. Le sixième avait montré une déviation de 0,04 % sur le taux de charge entre la quarantième et la cinquantième seconde. Pas un pic. Un écart constant, comme si le système atteignait un plateau légèrement différent de celui prévu par le modèle.

0,04 %. Le seuil de tolérance était à 0,5 %. Dix fois en dessous. Ce n'était pas une non-conformité. Ce n'était même pas une anomalie selon la nomenclature du projet. La plupart des ingénieurs noteraient et classeraient sans s'en inquiéter.

Nadia nota. Elle ne classa pas.

Elle consulta le journal de modifications. Entre le test cinq et le test six, une mise à jour du firmware des contrôleurs de charge. Version 2.1.4 vers 2.1.5. Correction d'un bug de communication. Rien dans les notes de version concernant les paramètres de charge. *Mais le firmware communique avec les contrôleurs, et les contrôleurs règlent la rampe, et la rampe détermine le profil.* Chaîne de causalité. Elle la connaissait par coeur. Pas parce qu'elle l'avait apprise ici. Parce qu'elle l'avait apprise il y a trente ans, dans une salle de cours à Kiev, avec un professeur qui répétait : *les accidents ne commencent pas par des erreurs. Ils commencent par des écarts qu'on décide de ne pas investiguer.*

Le test sept suivit le même profil que le test six. Déviation de 0,04 %. Reproductible.

Elle envoya un email. *Request for additional ramp-up test — modified sequence.* Douze lignes. Une rampe modifiée, plus lente, pour isoler le moment où la déviation apparaissait. Quatre heures de test.

La réponse : dix-neuf mots.

*Schedule does not permit additional testing at this stage. Deviation within tolerances. Proceed to Test 8 per plan.*

Elle ouvrit le porte-documents de son père. Aluminium brossé, fermoirs à pression, la petite bosse au coin droit depuis 1987. Elle glissa le tableur de suivi à l'intérieur, à côté des rapports précédents, à côté de ses notes manuscrites.

*Je ne dirai pas le mot.* Le mot était là, dans sa tête, là où il vivait depuis trente ans. *Je dirai : je souhaiterais un test supplémentaire. Ils diront : le planning ne le permet pas. Et je noterai qu'ils l'ont dit, et la date, et je rangerai la note dans le porte-documents.*

Kwame voit un signal qui ne devrait pas être là. Nadia voit un écart qui ne devrait pas être là. Les deux prennent des notes. Les deux demandent du temps. Le signal de Kwame est à la limite du bruit. L'écart de Nadia est dix fois en dessous du seuil. Dans un système qui avance à cette vitesse, ce qui est en dessous du seuil est invisible. Ce qui est invisible n'est pas investigué. Ce qui n'est pas investigué reste.

Dimanche, Nadia appellerait Lesia. Il pleuvait à Bruxelles. Elles parleraient de la pluie. Quelque part dans un fichier de configuration, à la ligne 14 d'un YAML parmi des centaines, un nombre attendait. Le nombre ne savait pas qu'il était faux. Les gens ne savaient pas qu'il était là. Le système avançait. Les marges rétrécissaient, et personne ne savait encore à quel point elles étaient étroites pour commencer.
