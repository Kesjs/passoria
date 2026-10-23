# PASSORIA — Parcours utilisateurs et expérience produit
## UX, navigation, scénarios, exceptions et accessibilité

**Date :** 22 octobre 2026. **Périmètre :** MVP démonstration avec données fictives, vision des six modules conservée.

## 1. Navigation

**Citoyen :** Accueil | Démarches | Mes dossiers | Mes documents | Aide ; Profil dans l'en-tête. **Agent :** À traiter | Dossiers | Événements | Paramètres. Sur mobile, navigation courte, boutons accessibles au pouce, fil d'étapes et aide contextualisée.

## 2. Parcours commun en cinq étapes

1. **Comprendre :** le système pose seulement les questions nécessaires pour orienter vers la bonne démarche.
2. **Préparer :** liste de justificatifs et formulaires adaptés à la situation, version des consignes et lien officiel.
3. **Vérifier :** contrôles de présence et de cohérence ; les pièces restent fictives au prototype.
4. **Suivre :** état lisible, dernière action, prochaine étape, historique daté, aide et annulation possible.
5. **Continuer :** démarches liées pertinentes ; rien n'est déclenché chez un tiers sans autorisation.

## 3. Parcours N-01 — naissance

**Acteur :** parent ou agent de démonstration. **Déclencheur :** besoin d'une démarche d'état civil relative à une naissance. **Résultat :** dossier de préparation et indication du service compétent ; aucun acte réel.

| Écran | Action | Réaction attendue |
|---|---|---|
| Orientation | Sélectionner naissance | Affiche contexte et limites officielles |
| Formulaire | Saisir des données fictives | Sauvegarde en brouillon |
| Pièces | Ajouter justificatifs fictifs | Checklist et contrôle de format |
| Vérification | Saisir une date incohérente | Bloc d'alerte explicite, correction possible |
| Récapitulatif | Confirmer préparation | Référence de démonstration |
| Suivi | Consulter état | Chronologie et indication « non officiel » |

**Exceptions :** personne agissant pour autrui sans habilitation, conflit de date, pièce insuffisante, connexion perdue, doublon, données contradictoires. À chaque fois : solution de récupération sans disparition silencieuse des données.

## 4. Parcours D-01 — formalités après un décès

Le ton est sobre et respectueux, sans formulations commerciales. L'utilisateur voit d'abord « Nous vous aidons à préparer les démarches » et la liste des limites, puis indique son lien avec le défunt. Les informations demandées sont minimisées.

**Étapes :** situation et qualité du demandeur → checklist adaptée → pièces fictives → précontrôle → récapitulatif → traitement agent simulé → orientation vers les autres formalités utiles. Ne jamais suggérer qu'une déclaration saisie ici suffit juridiquement.

**Exceptions :** demandeur non habilité, acte introuvable, identité divergente, document non lisible, démarche déjà effectuée, retrait d'une demande ; chaque état possède une prochaine action explicite.

## 5. Dossier administratif réutilisable

L'usager peut déposer une pièce, donner un titre, indiquer son type, visualiser sa version, la remplacer, en limiter l'utilisation ou la supprimer selon les règles du produit. Les mentions « vérifié officiellement » ne sont pas utilisées tant qu'aucun organisme habilité n'a effectué cette vérification.

## 6. Mode SMS / USSD et guichet

**USSD de démonstration :** 1. Choisir la démarche ; 2. Pièces nécessaires ; 3. Suivi par référence fictive ; 4. Assistance. Ne jamais afficher les identifiants complets ni l'état d'une prestation de santé. **Guichet :** l'agent identifie la personne selon une procédure adaptée et journalise toute action déléguée.

## 7. États UI obligatoires

| État | Comportement |
|---|---|
| Chargement | Squelette, message d'attente accessible |
| Aucun dossier | Invitation à débuter une démarche |
| Erreur réseau | Réessayer sans perdre saisie locale autorisée |
| Dossier incomplet | Liste actionnable des corrections |
| Agent demande complément | Motif compréhensible, échéance si officielle |
| Information non vérifiée | Affichage explicite de la source et de la limite |
| Service partenaire indisponible | Ne pas prétendre à une transmission réussie |
| Accès refusé | Message discret sans exposer l'existence du dossier |

## 8. Design et langage

Interfaces épurées, beaucoup d'espace, typographie lisible, boutons distincts, messages en langage clair. Éviter « dossier rejeté » lorsqu'il s'agit d'un simple contrôle de pièce manquante. Pas de promesse « 100 % en ligne » pour une étape légalement physique. Accessibilité : navigation clavier, focus, labels, erreurs en texte, contraste, temps de session adapté.

## 9. Tests UX prioritaires

Tester avec 5 à 10 participants exploratoires de niveaux numériques variés : trouvent-ils la bonne formalité ? Comprennent-ils que le service n'est pas officiel ? Repèrent-ils la pièce manquante ? Peuvent-ils reprendre après perte de réseau ? Sauront-ils où se rendre ensuite ? Mesurer erreurs, hésitations et temps de compréhension.
