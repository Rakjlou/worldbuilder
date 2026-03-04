# Mateo Quispe-Rojas

## Prompt

Mateo at Paranal, Year 6. ESO infrastructure is being absorbed into the planetary displacement project. Changes are coming. He hears about it — in a corridor conversation, an email, a meeting he wasn't expecting. He doesn't know yet that he'll be transferred. Show his ordinary day being interrupted by the first signal that his world is about to change. Close third person, French.

## Response

L'email arriva à onze heures vingt-trois, entre deux sessions de debug sur le contrôleur ESPRESSO. Objet : *Infrastructure Advisory — ESO Southern Observatory Facilities — Consortium Integration Phase 1.* Expéditeur : un nom qu'il ne connaissait pas, avec un domaine qu'il n'avait jamais vu. *@pds-consortium.org.*

Il lut le premier paragraphe. Puis le relut.

*In accordance with Resolution 2031-47 of the International Consortium for Planetary Displacement, certain ESO facilities in the Atacama region will be integrated into the consortium's operational infrastructure effective Q3 2031. This integration includes shared use of power distribution networks, communication relays, and selected observatory support buildings.*

Il fit défiler. Le deuxième paragraphe parlait de *minimal disruption to ongoing scientific operations*. Le troisième mentionnait un *transition coordinator* qui serait nommé dans les semaines à venir. Le quatrième était une liste de sites concernés. Paranal était le troisième de la liste.

Mateo regarda le nom de l'expéditeur. Vérifia qu'il n'était pas en copie par erreur. Non. La liste de distribution incluait *all-eso-paranal-staff*. Tout le monde avait reçu cet email. Tout le monde le lisait en ce moment, ou le lirait en revenant de pause, ou le trouverait ce soir en ouvrant sa boîte.

*Shared use of power distribution networks.* Il pensa aux générateurs de Paranal. À la stabilité électrique dont les instruments avaient besoin. Aux spécifications que lui et Rodrigo avaient passées six mois à calibrer pour le mode haute résolution d'ESPRESSO. *Shared use* ne disait rien et disait tout.

Il ferma l'email. Rouvrit le fichier de debug. La race condition du contrôleur était toujours là, patiente, logique, résoluble. Il reprit le curseur à la ligne où il s'était arrêté. Le sémaphore. La vérification du buffer. Des problèmes qu'il savait résoudre.

Dans le couloir, des voix. Plus fortes que d'habitude. Il entendit le mot *consortium* prononcé trois fois en vingt secondes. Il entendit Rodrigo dire *c'est temporaire, ils disent toujours ça*. Il entendit quelqu'un rire, d'un rire court, sans joie.

Il ne sortit pas dans le couloir. Il resta devant l'écran, le curseur clignotant à la ligne 247, et il pensa à Valentina, qui passait ses examens cette semaine à La Paz, et à sa mère, qui ne disait jamais ce qui n'allait pas, et au bracelet à son poignet, qui pesait ce qu'il pesait.

*Il va se passer quelque chose.* Ce n'était pas une intuition. C'était une lecture. Le même type de lecture qu'il faisait sur les données de télémétrie : les signaux faibles avant la défaillance. L'email. Le domaine inconnu. Le mot *intégration*. Mateo connaissait les systèmes. Les systèmes ne partagent pas leurs ressources sans raison. Quand un système commence à absorber un autre, c'est que les priorités ont changé, et quand les priorités changent, les gens qui travaillaient sur l'ancienne priorité sont déplacés.

Il retourna au code. Le sémaphore. Le buffer. La fenêtre de vulnérabilité de cent quatre-vingts microsecondes. Des problèmes qu'il savait résoudre. Il les résolut.

À dix-sept heures, il appela Valentina. Elle répondit à la deuxième sonnerie. Il ne mentionna pas l'email. Il lui demanda comment s'était passé l'examen de biochimie. Elle dit *bien, je crois*. Il dit *bien, c'est bien*. Dehors, le soleil descendait sur le désert, et les coupoles de Paranal ne s'ouvriraient pas avant deux heures.
