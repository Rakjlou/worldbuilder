## Le béton

Le désert change de forme. Ce qui était du sable et de la roche et du silence depuis des millénaires devient un chantier, puis une infrastructure, puis un système. Quatre mille trois cents personnes travaillent en trois équipes. Deux cent quarante camions de béton par jour. L'échelle dépasse la comparaison. Les gens qui construisent ne voient pas ce qu'ils construisent. Personne ne le voit. Le système est trop grand pour être vu.

Le béton avait pris pendant la nuit. Helena posa la main dessus à six heures du matin, quand le soleil était encore bas et que la surface était froide. C'était un geste qu'elle faisait sur tous les chantiers, depuis Belo Monte, depuis les fondations du barrage où elle avait appris que le béton parle à ceux qui le touchent. Pas une métaphore. La température, la texture, la présence ou l'absence de microfissures sous les doigts.

Celui-ci était bon. Vingt-huit mégapascals à vingt-huit jours, si le dosage était correct, et le dosage était correct parce qu'elle l'avait vérifié elle-même avant la coulée.

Elle retira sa main et regarda le chantier. Ce qui s'étendait devant elle couvrait onze kilomètres carrés de désert. Elle avait essayé les comparaisons habituelles : mille cinq cents terrains de football, deux fois l'aéroport de Guarulhos. Aucune ne fonctionnait. L'échelle était au-delà de la comparaison.

*À Belo Monte, le problème était l'eau. En Patagonie, le problème était le vent. Ici, le problème est l'échelle. Je ne sais pas encore contre quoi je construis.*

La réunion de sept heures se tenait dans un préfabriqué climatisé. Douze personnes autour d'une table pliante. Helena ouvrit son cahier à spirale, papier quadrillé, le même modèle qu'elle utilisait depuis vingt-cinq ans.

— Le radier de la zone Alpha a été coulé hier entre quatorze heures et vingt-deux heures. Les échantillons de contrôle seront testés à J+7 et J+28. La tolérance de planéité demandée est de deux millimètres sur trente mètres. C'est quatre fois la tolérance standard pour une dalle industrielle.

Elle tourna une page.

— L'approvisionnement en acier HA reste critique. La spécification métallurgique des lots de la semaine dernière montrait une variation de 0,3 % sur la teneur en carbone. J'ai refusé le lot.

Quelqu'un demanda si le refus allait retarder la zone Beta. Helena répondit que oui, de quarante-huit heures, et que quarante-huit heures étaient récupérables par un décalage du coffrage. Elle avait déjà calculé la séquence.

Après la réunion, elle retourna sur le radier. Seule. Le béton s'étendait, gris et lisse, sous un ciel sans nuage. Elle s'accroupit et posa de nouveau la main à plat. *Bon béton. Bon dosage. Bonne cure.* Puis elle se releva et regarda l'horizon, où les machines continuaient de creuser.

---

Helena touche le béton et le béton est bon. À quelques centaines de mètres du radier, dans un préfabriqué climatisé, un ingénieur migre quarante-sept fichiers de configuration du prototype vers la production.

Le ticket JIRA était le numéro ATK-4471. Titre : *Migration configuration files — MkII prototype to production baseline.* Priorité : moyenne. Assigné à : Devaux, L. Date d'échéance : vendredi.

Laurent Devaux ouvrit le ticket à neuf heures quatorze, entre un café et une mise à jour de firmware. La description tenait en quatre lignes : les fichiers de configuration du prototype MkII devaient être migrés vers le dépôt de production. Vérifier les formats. Adapter les chemins. Valider les tests.

Il ouvrit le répertoire source. Quarante-sept fichiers. Formats mixtes — YAML, JSON, quelques fichiers texte plats hérités d'une époque où le prototype n'avait pas encore de framework de configuration. Il commença par les YAML parce qu'ils étaient les plus propres.

Le fichier `temporal_correction.yaml` faisait vingt-trois lignes. Des paramètres de correction temporelle, des offsets, des facteurs de calibration. La ligne 14 :

`temporal_offset_correction: 0.9743`

Il la lut comme il lisait toutes les autres lignes : en vérifiant que le format était correct, que le type était numérique, que la valeur était dans une plage raisonnable. 0.9743 était un facteur proche de 1. Un facteur de correction. Il y en avait des dizaines dans les fichiers de configuration. Chacun compensait quelque chose. Il n'y avait pas de commentaire sur cette ligne. Pas de documentation inline. Pas de lien vers un rapport de calibration. L'ingénieur qui l'avait écrit, deux ans plus tôt, ne l'avait pas documenté parce que le nombre était correct pour le prototype, et que les nombres corrects ne nécessitent pas d'explication.

Laurent copia le fichier dans le dépôt de production. Il lança les tests unitaires. Les tests vérifiaient le format, la cohérence des types, l'absence de valeurs nulles. Ils ne vérifiaient pas si une constante de calibration dérivée de la géométrie d'un prototype était applicable à une architecture de production dont les angles de faisceau étaient différents de 14,7 degrés. Ce n'était pas la fonction des tests unitaires. Les tests unitaires vérifient la forme. La signification est ailleurs.

Les tests passèrent. Laurent nota dans le ticket : *Migration complete. 47 files migrated. Unit tests pass. Ready for review.* Il assigna la review à Chen, W., qui la validerait le lendemain en vérifiant les mêmes choses : les formats, les chemins, les types. Pas les valeurs. Les valeurs venaient du prototype. Le prototype avait fonctionné.

Il ferma le ticket et passa au suivant. Le café avait refroidi.

La constante 0.9743 était maintenant dans le dépôt de production, à la ligne 14 d'un fichier parmi quarante-sept, dans un répertoire parmi des centaines, dans un système que quatre mille personnes construisaient et que personne ne voyait entièrement.

---

À Atacama, un fichier de configuration prend sa place dans le dépôt de production. À Paranal, un email prend sa place dans une boîte de réception.

L'email arriva à onze heures vingt-trois. Objet : *Infrastructure Advisory — ESO Southern Observatory Facilities — Consortium Integration Phase 1.* Expéditeur : un domaine que Mateo n'avait jamais vu. *@pds-consortium.org.*

Il lut le premier paragraphe. Puis le relut.

*In accordance with Resolution 2031-47 of the International Consortium for Planetary Displacement, certain ESO facilities in the Atacama region will be integrated into the consortium's operational infrastructure effective Q3 2031. This integration includes shared use of power distribution networks, communication relays, and selected observatory support buildings.*

Il fit défiler. Le deuxième paragraphe parlait de *minimal disruption to ongoing scientific operations*. Paranal était le troisième site de la liste.

*Shared use of power distribution networks.* Il pensa aux générateurs de Paranal. À la stabilité électrique dont les instruments avaient besoin. Aux spécifications que lui et Rodrigo avaient passées six mois à calibrer pour le mode haute résolution d'ESPRESSO. *Shared use* ne disait rien et disait tout.

Il ferma l'email. Rouvrit le fichier de debug. La race condition du contrôleur était toujours là, patiente, logique, résoluble. Des problèmes qu'il savait résoudre.

Dans le couloir, des voix. Plus fortes que d'habitude. Le mot *consortium* prononcé trois fois en vingt secondes. Rodrigo : *C'est temporaire, ils disent toujours ça.* Un rire court, sans joie.

Mateo ne sortit pas dans le couloir. Il resta devant l'écran, le curseur clignotant à la ligne 247, et il pensa à Valentina, qui passait ses examens cette semaine à La Paz. Il pensa au bracelet à son poignet. Les systèmes ne partagent pas leurs ressources sans raison. Quand un système absorbe un autre, les priorités ont changé. Et quand les priorités changent, les gens qui travaillaient sur l'ancienne priorité sont déplacés.

À dix-sept heures, il appela Valentina. Elle répondit à la deuxième sonnerie. Il ne mentionna pas l'email. Il lui demanda comment s'était passé l'examen de biochimie. Elle dit *bien, je crois*. Il dit *bien, c'est bien*.

---

Le soir tombe sur le désert. Helena note dans son cahier les quantités coulées, les lots refusés, les tolérances tenues. Laurent ferme son ticket JIRA et rentre chez lui. Mateo appelle Valentina et ne mentionne pas l'email. À Paranal, les coupoles s'ouvrent pour une nuit de plus, mais le mot *intégration* est dans l'air, et l'air a changé de goût. Le béton prend. La constante reste. Les choses les plus importantes sont celles que personne ne remarque.
