# État de réalisation et suite

**Mise à jour 0.2.0 :** logo n° 3, ouverture animée, écrans de connexion/inscription et code Google/SMS Supabase sont ajoutés. L’activation du fournisseur reste en attente du choix du compte/projet. Les lignes du tableau initial décrivent la base 0.1 ; consulter `CONNEXION_ET_LOGO.md` pour l’état précis de la connexion.

**Livraison : 0.1.0, 22 octobre 2026.** Le PRD original reste une cible ; le tableau ci-dessous décrit ce qui est réellement présent.

| Élément du PRD | État livré |
| --- | --- |
| Accueil/catalogue | Implémentés avec recherche textuelle |
| Authentification test | Sélecteur de rôle local, aucune authentification |
| Dossier documentaire | Ajout, aperçu, téléchargement, réutilisation, remplacement, suppression locale |
| Naissance | Formulaire, brouillon, pièces, date cohérente, suivi simulé |
| Décès | Formulaire, qualité du déclarant, pièces et orientations associées |
| Suivi | Référence interne, chronologie, prochaine action et statuts simulés |
| Agent | Prise en charge, complément motivé, fin de démonstration |
| Notifications | Internes, texte générique, préférence activable |
| USSD | Simulateur navigateur à menus, référence de test publique uniquement |
| ARCH / SIM | Orientation générale, fonctionnalités partenaires non branchées |
| Sauvegardes | Export/import complet et IndexedDB sur un appareil |
| PWA | Manifeste, cache des ressources, adaptation CSS ; appareils à tester |

## Priorité suivante : rendre le socle multiutilisateur

- Next.js/TypeScript et composants accessibles, avec routes explicites et validations serveur.
- Authentification citoyen/agent et MFA agent.
- PostgreSQL, contrôle propriétaire/délégation/assignation et tests IDOR.
- Stockage privé et politique de conservation/versionnement.
- Synchronisation entre appareils, écritures transactionnelles et gestion des conflits.
- Tests navigateur des deux parcours, tests mobile/tablette et audit d’accessibilité.

## Ensuite

- Administration des procédures sourcées et versionnées.
- Mandats et partages avec contrôle de finalité.
- Notifications externes uniquement après choix du prestataire et autorisations.
- Mesure des essais usagers, sans annoncer des gains non mesurés.
- Contrôle juridique et conventions avant intégrations réelles.

Le MVP complet du PRD n’est donc pas déclaré terminé. Cette archive livre la démonstration locale et les éléments nécessaires pour poursuivre son développement.
