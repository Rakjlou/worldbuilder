# Renata Alves Ferreira -- Agent Dialogues

All character agent outputs for Renata Alves Ferreira across the story.

---

## Turn 3 — Your first interior models have converged.

Renata reste immobile devant les écrans. Pas longtemps — cinq secondes, peut-être dix. Puis ses mains reprennent le clavier.

*Não. Recommence.*

Elle efface les paramètres d'entrée et les resaisit manuellement, un par un, en vérifiant chaque valeur contre le PDF du dataset. Masse estimée : 5,97 × 10²⁴ kg, marge d'erreur de 8%. Rayon contraint par occultation stellaire : 6 340 km, plus ou moins cent vingt. Densité moyenne déduite : 5,48 g/cm³. Elle tape lentement, avec la précision qu'elle utilise quand elle enseigne à des étudiants de L3 — le geste délibéré de quelqu'un qui sait que la vitesse est une forme d'erreur. Le modèle tourne. Deux minutes. La barre de progression avance. Les résultats s'affichent.

*Même chose. Exactement la même chose.*

Le profil de densité radiale. La stratification silicatée. La signature thermique cohérente avec un noyau fer-nickel différencié. Elle ouvre une fenêtre en parallèle et charge les paramètres de référence terrestres — les valeurs PREM, le modèle de référence préliminaire de la Terre, qu'elle utilise depuis sa thèse comme étalon de calibration. Elle superpose les deux courbes. Il y a un outil pour ça dans son pipeline, elle l'utilise pour vérifier que ses modèles ne dérivent pas, que son code ne se recale pas subrepticement sur ce qu'il connaît déjà. Elle superpose les courbes.

Elles se confondent.

Elle se lève. Pas parce qu'elle a décidé de se lever — ses jambes l'ont fait. Elle va jusqu'à la fenêtre. La rue en bas est mouillée, les phares des voitures tracent des lignes orangées sur le bitume. *Formellement parlant*, se dit-elle, *il y a plusieurs explications possibles. Formellement parlant.* Elle les énumère en silence, dans cet ordre : une erreur de calibration dans sa pipeline. Une erreur dans le dataset de masse — 8% de marge, c'est beaucoup, ça peut tout déformer. Un biais dans les contraintes spectrales. Une convergence pathologique du modèle vers un minimum local qui ressemble à la Terre parce que la Terre est ce sur quoi ses paramètres ont été entraînés pendant quatorze ans. Ce sont des explications raisonnables. Ce sont des explications qu'elle peut tester.

Elle retourne à son bureau. Elle ne sort pas son téléphone. Elle n'écrit pas à Daniel. Elle ouvre un nouveau terminal et commence à construire un test d'indépendance — un modèle aveugle, avec des paramètres qu'elle va tirer aléatoirement dans les intervalles d'erreur, deux cents réalisations, pour voir si la convergence vers ce profil est robuste ou fragile. *Ça va prendre trois heures*, pense-t-elle. Dans le cadre photo sur le coin du bureau, Mateus tient son poisson minuscule avec un sourire immense. Elle tourne légèrement le cadre pour ne pas le voir pendant qu'elle travaille.
