# Kwame Asante-Mensah

## Prompt

Kwame, Year 8 at the Atacama complex. He installs the signal monitoring system. During calibration tests, he notices an echo in the reference signal. The echo is faint, at the limit of detection. But it arrives BEFORE the source signal. This is the temporal displacement signature — except in a calibration test, there shouldn't be any temporal displacement. Something in the calibration is causing a micro-displacement. Kwame doesn't know what. He doesn't know calibration code. He documents what he sees. Close third person, French.

## Response

Le signal de référence était propre. Kwame le vérifiait pour la troisième fois, non pas parce qu'il doutait des deux premières, mais parce que ce qu'il avait noté dans la marge de son cahier n'avait pas de sens et que les choses qui n'ont pas de sens méritent une troisième vérification.

Il posa le stylo. Remonta l'écran jusqu'au début de la trace d'oscilloscope. Le signal de calibration, un pulse de référence à 1,42 GHz, apparaissait là où il devait apparaître : au temps T0, propre, bien défini, avec un rapport signal-sur-bruit de 47 dB. Rien à redire. Il fit défiler vers la gauche, avant T0, là où il n'y avait rien à voir. Du bruit de fond. Le plancher thermique du système.

Sauf que ce n'était pas que du bruit.

Il l'avait vu la première fois par accident, en ajustant l'échelle verticale pour vérifier le plancher. À moins 2,3 microsecondes avant le pulse de référence, une perturbation. Pas un pic. Pas un transitoire. Une forme. Faible, à la limite du bruit, trois décibels au-dessus du plancher, mais avec la même signature spectrale que le pulse de référence.

*Un écho.* Le mot s'était posé dans sa tête sans qu'il le cherche. Quand un signal est réfléchi par une impédance mal adaptée, il revient avec un délai. C'est un écho. Sauf qu'un écho arrive après le signal source. Ce qui apparaissait sur l'écran de Kwame arrivait avant.

Il nota dans son cahier, en lettres soignées : *Écho du pulse de référence observé à T0 - 2,3 us. Amplitude : -44 dB par rapport au signal principal. Signature spectrale cohérente. Direction temporelle : inversée.*

Il relut la dernière ligne. *Direction temporelle : inversée.* Il savait ce que cela voulait dire. Il l'avait vu à Jodrell Bank, quatre ans plus tôt, quand il avait confirmé le signal temporel de 4,7 microsecondes dans les données de l'objet. La signature de déplacement temporel. Sauf qu'il n'y avait pas de déplacement temporel dans un test de calibration. Le système n'était pas activé. Il n'y avait pas de charge dans les accumulateurs. Les faisceaux n'étaient pas alignés. C'était un test de référence, une vérification de routine de l'électronique de monitoring. Il n'y avait aucune raison physique pour qu'un micro-déplacement se produise.

« Maintenant, » dit-il à voix basse, à personne. Il posa ses coudes sur la table et regarda l'écran. « Maintenant, qu'est-ce que ça fait là. »

Il lança une quatrième acquisition. Mêmes paramètres. Même pulse de référence. Il attendit les onze secondes du cycle d'acquisition. Les données apparurent. L'écho était là. Même position. Même amplitude. Reproductible.

*Si c'est reproductible, ce n'est pas du bruit. Si ce n'est pas du bruit, c'est un signal. Et si c'est un signal, il a une source.*

Il ouvrit un nouveau fichier dans son cahier. En haut de la page : **Écho pré-signal dans calibration de référence — Investigation.** En dessous, deux colonnes. *Hypothèses.* *Éliminées.* Il commença par les hypothèses banales. Réflexion dans le câblage. Diaphonie entre voies. Artefact de l'échantillonneur numérique. Il les testerait une par une. Cela prendrait du temps. Il avait du temps.

Ce qu'il n'avait pas, c'était l'accès au code de calibration. Le pulse de référence était généré par le logiciel. Les paramètres du pulse, la correction temporelle, les offsets, tout cela vivait dans des fichiers de configuration qu'il ne connaissait pas. Ce n'était pas son domaine. Son domaine était le signal. Le signal disait qu'il y avait un micro-déplacement temporel là où il ne devrait pas y en avoir. La source du micro-déplacement était ailleurs, dans la couche logicielle, dans les paramètres de calibration, dans des fichiers que d'autres personnes avaient écrits.

Il nota : *Contacter l'équipe software pour les paramètres de calibration du pulse de référence. Vérifier si un offset temporel est appliqué avant l'émission.*

Puis il referma le cahier, se leva, et alla se faire un thé. Le riz jollof était dans le thermos, pour le déjeuner. Par la fenêtre du laboratoire, le désert. Les structures du complexe, grises et immenses sous le soleil de midi.

*Tu vois, Gifty ? Les signaux continuent de me poser des questions auxquelles je ne sais pas répondre.*

Il ne lui écrirait pas aujourd'hui. Pas encore.
