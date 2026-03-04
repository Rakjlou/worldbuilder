## La plomberie

Le fichier s'appelle `workarounds.txt`. Mateo l'a créé la première semaine, par habitude. Il en est à quatre-vingt-sept entrées.

---

Mateo attendit que le présentateur arrive à la fin de sa diapositive. Les barres d'erreur, les courbes de résidus, tout dans les limites spécifiées. Il ne regardait pas l'écran. Il regardait la table, son carnet ouvert, une ligne soulignée deux fois ce matin avant de venir : `offset_corr *= 1.00417`. Pas de commentaire. Pas de ticket associé. Le commit remontait à dix-huit mois, signé par un ingénieur qui avait quitté le projet depuis. Il avait cherché dans les archives de la liste de diffusion. Rien.

*C'est le genre de chose qui ne pose pas de problème jusqu'au jour où elle en pose un. Et quand elle en pose un, personne ne sait pourquoi elle est là.*

Il leva la main, brièvement. « Une question sur le facteur de correction dans le module d'offset. Dans `calibration_core.py`, ligne 847, il y a un facteur multiplicatif appliqué au calcul d'offset avant la sortie finale. 1.00417. Il n'est documenté nulle part dans le code, dans les spécifications de conception, ni dans l'historique des commits que j'ai pu consulter. » Il posa le stylo. « Je veux comprendre d'où il vient. Pas pour le supprimer. Mais si quelqu'un dans cette salle peut me dire ce qu'il compense, je dormirais mieux. »

Herrera regardait ses diapositives, cherchait une réponse qui n'y était pas. Silence. Pas un silence confortable.

Pendant qu'il parlait, sans vraiment le chercher, Mateo vit la femme japonaise à l'autre bout de la table. Elle avait arrêté d'écrire. Elle ne regardait pas le présentateur. Elle le regardait lui. Pas avec surprise, pas avec l'air irrité de quelqu'un à qui on ralentit la réunion. Elle écoutait d'une façon spécifique, comme quelqu'un qui vient d'entendre nommer quelque chose qu'elle avait vu aussi, sans trouver le mot.

---

Elle avait dit une date. Il avait répondu par un hash de commit. Le silence autour de la table était devenu celui des gens qui regardent deux personnes parler une langue qu'ils ne parlent pas.

---

« Vous avez la version du dépôt du quinze octobre ? » Elle le dit doucement, à lui, pas à la salle.

Mateo se redressa légèrement. Pas beaucoup. L'ajustement imperceptible de quelqu'un dont l'attention vient de changer de nature.

*Le quinze octobre. Elle n'a pas dit « la version récente » ou « le code actuel ». Elle a dit une date. Ce qui signifie qu'elle a regardé l'historique, elle aussi.*

Il ouvrit son carnet à une page marquée avec un bout de papier, fit glisser son doigt sur quelques lignes. « Oui. Le commit est `a3f9c2`, poussé à 19h04. Delgado, Ramón. » Il leva les yeux vers elle. « Il n'y a pas de message de commit. Juste le code. » Il posa le carnet à plat sur la table. « La dérive thermique — vous parlez de la compensation pour le gradient entre le miroir primaire et le module de pointage, ou c'est autre chose ? »

*Parce que si c'est ça, alors ce facteur n'est pas arbitraire. Il compense quelque chose de physique, quelque chose qu'ils ont mesuré en urgence un jeudi soir et introduit directement dans le code parce qu'ils n'avaient pas le temps de le faire proprement. Ce qui est plus inquiétant que si c'était arbitraire — ça veut dire que la vraie correction est dans un chiffre non documenté, et si les conditions thermiques changent, personne ne saura que ce chiffre doit être recalibré.*

Il ne regardait plus Herrera. Il regardait la femme japonaise, avec la patience tranquille de quelqu'un qui a posé une question précise et qui n'a aucune intention d'en accepter une réponse approximative.

---

Le facteur 1.00417 compense une dérive thermique mesurée un jeudi soir par un homme pressé de partir. Le 0.9743, lui, est plus bas dans le code. Mateo ne l'a pas encore trouvé.
