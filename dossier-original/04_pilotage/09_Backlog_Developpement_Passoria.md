# PASSORIA — Backlog technique priorisé

**Échelle :** P0 pour démonstration, P1 pour enrichissement, P2 après accords.

| ID | User story | Priorité | Critères d'acceptation |
|---|---|---|---|
| US-01 | Comme visiteur, je choisis une démarche | P0 | Naissance et décès visibles, source officielle affichée |
| US-02 | Comme citoyen test, je crée un compte | P0 | Isolation des sessions, comptes fictifs |
| US-03 | Comme citoyen, je sauvegarde un brouillon | P0 | Récupération après reconnexion |
| US-04 | Comme citoyen, je téléverse une pièce fictive | P0 | Taille/type contrôlés, stockage privé |
| US-05 | Comme parent, je prépare une naissance | P0 | Formulaire contextualisé, correction possible |
| US-06 | Comme proche, je prépare les formalités de décès | P0 | Parcours respectueux, qualité du demandeur demandée |
| US-07 | Comme usager, je vérifie mon dossier | P0 | Précontrôle explique chaque anomalie |
| US-08 | Comme usager, je suis le statut fictif | P0 | Historique, prochaine étape et simulation explicite |
| US-09 | Comme agent test, je demande un complément | P0 | Événement historisé, auteur authentifié |
| US-10 | Comme citoyen, je remplace une pièce | P0 | Version visible, ancienne version contrôlée |
| US-11 | Comme usager, je consulte l'aide | P1 | Sources datées, informations non officielles signalées |
| US-12 | Comme usager, je vois une notification test | P1 | Aucun champ sensible dans le message |
| US-13 | Comme usager sans Internet, j'accède au menu USSD simulé | P1 | Informations publiques seulement |
| US-14 | Comme usager, j'utilise le produit au clavier | P1 | Focus visible, labels et messages lisibles |
| US-15 | Comme responsable, je vois des statistiques d'essai | P1 | Données agrégées et marquées simulées |
| US-16 | Comme administrateur, je versionne un parcours | P1 | Source et date d'actualisation obligatoires |
| US-17 | Comme usager, j'autorise une réutilisation ciblée | P2 | Consentement/autorisation valide et révocable si applicable |
| US-18 | Comme agent officiel, je synchronise un état | P2 | Convention, API, journal et gestion d'erreurs |
| US-19 | Comme bénéficiaire ARCH, je consulte une orientation personnalisée | P2 | Aucune donnée de santé sans base légale |
| US-20 | Comme abonné, je prépare une modification SIM | P2 | Aucun changement réel sans validation opérateur/ARCEP |

## Définition de terminé (DoD)

Fonction testée manuellement et automatiquement au niveau adapté ; version mobile vérifiée ; contrôle d'accès validé ; libellé simulation si nécessaire ; erreurs et états vides couverts ; journal d'audit présent ; documentation mise à jour ; données de démonstration uniquement.

## Scénarios automatisés prioritaires

- Un utilisateur A ne peut jamais ouvrir le dossier de l'utilisateur B en changeant l'ID de l'URL.
- Un agent sans mandat ne peut pas consulter un dossier confidentiel.
- L'alerte date de naissance incohérente est explicite et réparable.
- Une demande de complément change correctement le statut et ajoute un événement.
- Une erreur de réseau ne doit pas transformer un dossier en « envoyé ».
- Le simulateur USSD ne révèle pas une donnée de santé, NPI ou identité d'un tiers.
- Aucun écran ne présente un acte fictif comme document officiel.
