# PASSORIA — Annexe 2
## Prototype, faisabilité, sécurité et plan d'expérimentation

**Objet :** montrer comment réaliser une démonstration crédible sans accès aux systèmes officiels ni traitement de vraies données d'identité.

## 1. Démonstration de 5 à 7 minutes

1. **Accueil** — bénéfice immédiat, choix de la démarche.
2. **Dossier unique** — pièces fictives réutilisables, état et consentements simulés.
3. **Décès** — parcours guidé, contrôle documentaire, demande de complément.
4. **Naissance** — vérification de cohérence, correction, confirmation.
5. **Espace agent** — réception et changement d'état du dossier de démonstration.
6. **SMS/USSD** — simulation d'accès sur téléphone basique.
7. **Statistiques** — indicateurs de démonstration étiquetés « données simulées ».

## 2. Écrans à maquetter

| Code | Écran | Fonction clé | Critère de démonstration |
|---|---|---|---|
| UX-01 | Accueil | Choix d'une démarche | Parcours accessible en 2 clics |
| UX-02 | Connexion/démonstration | Compte test | Aucune donnée réelle |
| UX-03 | Tableau de bord | Dossiers et prochaines étapes | Statuts intelligibles |
| UX-04 | Dossier documentaire | Ajouter/remplacer pièces fictives | Version et contrôle d'accès |
| UX-05 | Naissance | Formulaire progressif | Détection d'une incohérence |
| UX-06 | Décès | Formalités guidées | Pièce manquante identifiée |
| UX-07 | Détails dossier | Historique de traitement | Trace complète du parcours |
| UX-08 | Agent | File d'instruction | Demande de complément |
| UX-09 | Aide | Conseils sourcés | Limites et renvoi au service officiel |
| UX-10 | Simulateur USSD | Menu texte | Consultation d'un statut générique |

## 3. Architecture de principe

```text
Citoyen Web/PWA ─┐
USSD/SMS simulé ─┼─> API Passoria ─> Moteur de parcours
Guichet assisté ─┘           │         ├─> Règles de précontrôle
                             │         ├─> Dossier et versions
                             │         └─> Chronologie / notifications
                             └─> Adaptateurs institutionnels (désactivés au MVP)
                                    ANIP / ARCH / opérateurs / X-Road [sous convention]
```

## 4. Répartition des responsabilités

| Acteur | Responsabilité |
|---|---|
| Citoyen | Prépare, contrôle, autorise les usages du dossier |
| Agent habilité | Vérifie les exceptions, instruit selon les compétences du service |
| Administration source | Détient le registre de référence et prend la décision officielle |
| Équipe Passoria | Fournit outils de parcours, sécurité, journalisation et support technique |
| Responsable protection des données | Examine finalités, bases légales, risques et habilitations |

## 5. Conditions de faisabilité

**Préconditions bloquantes pour un pilote réel :** service partenaire formellement identifié ; description validée du processus ; accord de partage de données le cas échéant ; revue juridique ; sécurité et journalisation ; gouvernance des changements ; budget de maintenance.

**Ce que le MVP peut faire seul :** orientation, prototypes de formulaires, création de dossiers fictifs, règles de complétude, suivi simulé, notifications en environnement de test, mesures de parcours fictif.

**Ce qu'il ne peut pas prétendre faire seul :** émettre un acte ANIP ; modifier une fiche dans un registre public ; lire une couverture ARCH ; activer une SIM ; envoyer une notification officielle ; garantir l'éligibilité d'un usager.

## 6. Confidentialité et sécurité

- Minimisation des informations et conservation limitée par finalité.
- Pas de vrais NPI, actes, données de santé ou documents SIM dans la démonstration.
- Contrôle d'accès par rôle et par dossier, comptes agent séparés, MFA pour agents.
- Chiffrement transport et au repos, sauvegarde, rotation des secrets et journal d'audit.
- Toute action « agent » en prototype porte le libellé « simulation ».
- Test de sécurité et analyse d'impact avant introduction de données réelles.
- Information claire : Passoria n'est pas un service gouvernemental habilité tant qu'aucun partenariat n'est conclu.

## 7. Plan de réalisation indicatif

| Étape | Livrable | Condition de passage |
|---|---|---|
| Cadrage | Hypothèses, parcours et références juridiques | Procédure pilote sélectionnée |
| UX | Maquettes mobile + bureau | Tests rapides auprès d'usagers |
| Prototype | Web/PWA + données fictives | Scénarios naissance/décès fonctionnels |
| Validation | Tests fonctionnels, accessibilité, sécurité | Aucun point bloquant majeur |
| Candidature | Texte officiel + 3 annexes max | Déposant et expérience validés |
| Pilote institutionnel ultérieur | Convention + adaptation processus | Accord et budget approuvés |

## 8. Estimation budgétaire — structure, non devis

Chiffrer séparément conception, développement, hébergement, sécurité, gestion des demandes, SMS/USSD, formation, assistance, supervision et conformité. Le budget réel dépendra des volumes, des partenaires, des tarifs des canaux télécoms et du niveau de sécurité exigé. **Aucun montant n'est validé.**

**Sources :** [F02] [F03] [B04] [B05] [B06].
