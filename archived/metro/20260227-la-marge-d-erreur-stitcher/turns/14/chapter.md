## La ligne 848

Mateo laissa le téléphone sur le bureau sans le retourner. La voix de son père — *c'est bien, c'est un travail important* — prenait de la place dans une chambre aussi petite que celle-là. Son père disait rarement des choses comme ça. Il disait des choses pratiques, des choses sur la pluie, sur les tarifs du minibus. Pas des choses importantes.

*Il ne savait pas ce que Mateo faisait vraiment ici.*

Il rapprocha le laptop. Le fichier de calibration était toujours ouvert — `adc_targeting_calib_v4.cfg` — et il reprit là où il en était avant l'appel. Ligne 847. Une constante nommée `REFRAC_DELTA_CORR` avec la valeur `0.00312`. Aucun commentaire. Aucune unité. Aucune référence à un ticket, à un test, à rien. Il fit défiler vers le bas : la constante était utilisée dans trois endroits différents, toujours multipliée par autre chose, jamais expliquée. Il ouvrit un terminal.

```
git log -S "REFRAC_DELTA_CORR" --all --oneline
```

Deux commits. Le premier remontait à quatre ans — ajout initial, message : *fix targeting drift, experimental*. Le deuxième six mois plus tard — valeur changée de `0.00287` à `0.00312`, message : *adjusted*. C'est tout. *Adjusted.* Mateo resta immobile.

*Quelqu'un avait eu un problème. Il avait tâtonné jusqu'à ce que ça marche. Et ensuite il était parti.*

Il reconnaissait ce mouvement. Il l'avait fait lui-même, au Paranal, sur des nuits longues avec un instrument capricieux et un délai à respecter. La différence, c'était qu'au Paranal une dérive de pointage mal calibrée signifiait une étoile légèrement hors champ. Ici, il ne savait pas encore ce que ça signifiait. Il ouvrit un nouveau fichier de notes — pas dans le système du complexe, sur son propre laptop, dans un dossier local — et il écrivit : `REFRAC_DELTA_CORR : origine inconnue. Vérifier unités. Vérifier si couvre cas limites polaires/équateur. Vérifier propagation d'erreur.` Il regarda le bracelet à son poignet gauche une seconde, pas intentionnellement, par habitude. Puis il passa à la ligne 848.

---

Le lendemain, dans la salle de réunion qui sentait encore la peinture, Yuki posa son gobelet de café. Pas brusquement — elle le déposa sur la table, les deux mains, comme pour libérer ses doigts.

« Attends. »

Le mot sortit avant qu'elle ait décidé de le dire. Elle se leva à moitié, regarda l'écran de plus près. L'ingénieur venait de présenter le résidu dans les données de calibration comme un problème de format. Six personnes autour de la table — des ingénieurs logiciels, un physicien du monitoring, un chef de projet. Les systèmes n'étaient qu'en phase de test, le complexe en pleine construction, et déjà il y avait des choses qui ne collaient pas.

*C'est pas le format. C'est pas le format.*

« Tu peux remonter la fenêtre temporelle — là, les vingt secondes avant que l'artefact apparaisse ? »

L'ingénieur la regarda. « C'est juste un problème de— »

« Ouais, peut-être. Remonter quand même. » Elle dit ça sans agressivité, mais sans espace pour la négociation non plus. Elle se gratta l'intérieur du pouce gauche avec l'ongle de l'index, les yeux sur l'écran. « On avait exactement ce pattern sur Rubin. Pas le même système, je sais. Mais cette signature-là — ce truc qui ressemble à un décalage de format mais qui revient exactement aux mêmes intervalles — c'est pas le parser qui bug. C'est quelque chose en amont qui envoie une donnée que le pipeline ne sait pas nommer, alors il la marque comme résidu. C'est une distinction importante. Parce que si c'est le format, on corrige le parser et c'est fini. Mais si c'est en amont... »

Elle laissa la phrase ouverte. Le chef de projet commença à dire quelque chose sur le calendrier de test. Elle ne l'entendit pas vraiment. Du coin de l'œil, l'homme au bracelet — on le lui avait présenté comme Mateo Quispe-Rojas, ingénieur transféré de Paranal, arrivé la semaine précédente — n'avait rien dit depuis le début de la réunion. Il fixait l'écran avec cette qualité d'attention qu'elle reconnaissait. Pas la posture de quelqu'un qui attend que ça se termine. Celle de quelqu'un qui est en train de calculer.

*Il voit aussi quelque chose.*
