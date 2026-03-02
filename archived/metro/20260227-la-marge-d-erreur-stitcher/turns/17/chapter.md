## 0.9743

Il resta immobile plusieurs secondes, les yeux sur l'écran. Le fichier de configuration. La ligne 847. `TEMPORAL_OFFSET_CORRECTION_FACTOR = 0.9743`.

*Claro. C'est ça.*

Il ouvrit son fichier de workarounds. Entrée 49. Il commença à taper, mais s'arrêta après le titre. Pas encore. D'abord comprendre exactement ce que ça faisait. Il ouvrit le module de visée dans une fenêtre adjacente, traça l'appel à la constante, suivit le calcul jusqu'à la sortie finale. Le facteur était appliqué en bout de chaîne, après tous les ajustements physiques, comme une correction globale sur l'offset temporel. Simple. Propre. Invisible si on ne cherchait pas.

*Le test avait passé. Évidemment que le test avait passé — le prototype avait cette géométrie. La constante compensait exactement ce qu'elle devait compenser. Quelqu'un avait vu un résultat correct et avait fermé le ticket. Travail bien fait.*

Il remonta dans l'historique Git. Le commit original : `fix: calibration offset adjustment for spatial discontinuity alignment`. Quarante-deux fichiers modifiés. La constante était dans le diff, ligne parmi des dizaines. Deux reviewers avaient approuvé. Deux ans plus tard, l'ingénieur qui l'avait introduite quittait le projet. Départ volontaire — il vérifia dans les métadonnées RH depuis le portail. Après ça, sept ans de révisions successives, et personne n'avait touché à cette ligne. Pourquoi y toucher ? Le système fonctionnait.

Il se leva, fit trois pas vers la fenêtre, revint. Il était 23h17. Quatre-vingt-deux jours avant la prochaine fenêtre d'activation. Il n'avait pas besoin de vérifier, il connaissait le calendrier. Il calcula mentalement l'ordre de grandeur de l'erreur. Faible, oui, à l'intérieur des tolérances documentées. Mais les tolérances documentées avaient été définies pour quoi exactement ? Il ne savait pas. Il allait devoir vérifier ça aussi.

Il retourna à son bureau. Entrée 49 : `TEMPORAL_OFFSET_CORRECTION_FACTOR (calibration.conf:847) — constante introduite prototype Mk2, géométrie discontinuités spécifiques à ce prototype. Prototype déclassé cinq ans. Facteur potentiellement obsolète. Impact : décalage offset dans marges de tolérance (à vérifier : base de calcul des tolérances). Action requise : escalade ingénierie système + review architecture.` Il enregistra. Il fixa le mot *escalade*. Ça allait faire du bruit. Les gens n'aimaient pas le bruit à quatre-vingt-deux jours d'une activation. Les validations comprimées, les procédures accélérées, tout le calendrier tendu comme un fil. Personne ne voulait qu'on tire sur le fil.

*Exacto. C'est pour ça qu'il faut le faire maintenant.*

---

Le lendemain matin, Yuki avait les cheveux encore mouillés de la douche après sa course. Toujours pas sous les quarante minutes pour sept kilomètres sur la route du périmètre. Pas sa côte de La Serena, pas le bon dénivelé, pas le bon air. Elle traversait le couloir entre les bâtiments de contrôle quand Mateo l'intercepta.

Il ne faisait pas ça normalement. Ils n'étaient pas dans la même hiérarchie, pas sur les mêmes composants. Mais il était venu vers elle, pas vers son chef, pas vers l'équipe de validation. Vers elle.

Il lui montra son écran. La constante dans le fichier de configuration du module de calibration. 0.9743. Il lui expliqua ce qu'il avait trouvé — l'introduction pour le prototype Mk2, le prototype déclassé depuis cinq ans, la constante restée en place. La géométrie corrigée qui n'existait plus. L'offset décalé, dans les tolérances.

Yuki se pencha. Elle se grattait le pouce, l'index, l'ongle du majeur.

*0.9743. Un nombre qui avait l'air anodin. Les nombres qui avaient l'air anodins étaient exactement ceux qui lui faisaient peur.*

« Right, right, right. » Elle chercha le commit, le commentaire. Il y en avait un : *temp calibration factor for Mk2 gimbal prototype*. Prototype. « Et le Mk2, c'est parti quand ? »

Elle connaissait déjà la réponse avant qu'il réponde. Elle le voyait dans sa façon d'attendre qu'elle pose la question.

*Kuso.*

« C'est à l'intérieur des tolérances, tu m'as dit. » Ce n'était pas une question. Elle savait que c'était à l'intérieur des tolérances, c'était pour ça que personne ne l'avait vu. Personne ne cherchait ce qui était dans les tolérances. On cherchait ce qui était en dehors. « Mais ça décale l'offset de combien, concrètement ? » Elle se redressa, le regarda. C'était comme un résidu dans le pipeline. Quelque chose qui était là et qui ne devrait pas être là. Neuf ans à Rubin lui avaient appris à reconnaître cette forme : la donnée qui ne pose pas de problème parce qu'elle entre dans les cases, mais qui n'a aucune raison d'exister. « Je veux voir le calcul. Pas l'estimation. Le calcul exact. »
