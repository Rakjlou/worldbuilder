# The Constant

## Prompt

In a prototype teleportation lab, during a routine calibration test, an engineer adjusts the spatial targeting parameters. The prototype has a specific geometry — the spatial discontinuities are oriented differently from what the final system will use. The engineer applies a correction factor to the temporal offset to compensate for this geometry. The correction is appropriate. It is exact for this prototype. The engineer inserts it as a constant in the configuration file: 0.9743. The test passes. The result is good. The constant is not documented — not through laziness, but because in the context of this test, with this prototype, it is obvious to anyone who understands the geometry. The engineer moves to the next test.

## Response

Dans le laboratoire de prototypage, un ingénieur de calibration — trente-quatre ans, polonais, cheveux courts, un thermos de thé noir à côté de son clavier — termine un test de validation sur le prototype MkII du système de visée spatiale. La géométrie de ce prototype est spécifique : les discontinuités sont orientées à 14,7 degrés de l'axe nominal, un compromis d'ingénierie lié à la taille de la chambre de test. Le calcul de l'offset temporel doit être corrigé pour compenser cette orientation.

Il ouvre le fichier de configuration. Ligne 847. Il tape :

`temporal_offset_correction = 0.9743`

Le facteur compense exactement la géométrie du MkII. Il l'a dérivé ce matin, sur un coin de papier, à partir des angles mesurés. Le calcul tient en quatre lignes. Il ne le documente pas dans le fichier — pas par négligence, mais parce que dans ce contexte, avec ce prototype, la raison du facteur est évidente pour quiconque regarde la géométrie de la chambre. Il n'y a pas de commit message explicatif. Il n'y a pas de commentaire dans le code. Il y a un nombre, correct, dans un fichier de configuration, pour un prototype spécifique, dans un laboratoire qui sera démonté dans deux ans.

Il lance le test. Le test passe. Les résultats sont bons. Il note « PASS » dans le cahier de suivi, ferme le fichier, et passe au test suivant.
