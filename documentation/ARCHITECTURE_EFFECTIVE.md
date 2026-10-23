# Architecture de la livraison 0.1

**Mise à jour 0.2.0 :** le socle ci-dessous reste local pour les dossiers. Une couche d’authentification Supabase configurable, une séparation des espaces locaux par compte et la nouvelle identité « Le lien » sont maintenant ajoutées. Cette mise à jour remplace les mentions d’absence totale de code d’authentification ; le service réel n’est pas encore activé. Voir `CONNEXION_ET_LOGO.md`.

Le dossier original décrit une cible Next.js/TypeScript, API et PostgreSQL. Cette livraison concrétise un prototype local avec des modules Lucide intégrés, dans le but de tester les parcours avec des documents fictifs.

## Icônes : Lucide 1.61.0

La dépendance `lucide` est épinglée dans `application/package.json` et `package-lock.json`. `icon-map.json` définit les 28 correspondances entre les usages de Passoria et les icônes de la bibliothèque. Le script `npm run vendor:icons`, à lancer après `npm install`, génère le sous-ensemble officiel et copie le moteur de création SVG ainsi que les licences dans `public/vendor/lucide`.

L’application utilise le moteur `createElement` officiel avec `stroke-width=1.75`, `currentColor`, `aria-hidden=true` et `focusable=false`. Les noms accessibles restent sur les boutons et liens. Tous les modules requis sont mis en cache par le service worker, sans téléchargement depuis un CDN. Les données vectorielles des icônes ne sont plus dessinées à la main. Le logo de marque `icon.svg` est conservé.

## Composants exécutés

| Fichier | Responsabilité |
| --- | --- |
| `public/index.html` | Structure, navigation, dialogue, chargement du module |
| `public/app.js` | Routes par fragment d’URL, rendu DOM, formulaires, dialogue, simulation agent, export/import |
| `public/core.mjs` | Création de dossiers, états, précontrôles, transitions, contrôle de formats et de sauvegardes |
| `public/storage.mjs` | Ouverture IndexedDB et transactions de sauvegarde |
| `public/styles.css` | Tokens, cartes, navigation mobile, formulaires, adaptation des largeurs |
| `public/sw.js` | Cache des ressources applicatives, repli hors ligne |
| `server.mjs` | Serveur de fichiers statiques GET/HEAD, types MIME et en-têtes de base |
| `tests/` | Règles métier et réponses HTTP |

Le serveur ne reçoit pas les formulaires ni les documents. IndexedDB conserve un objet d’état comprenant le profil fictif, les dossiers, les documents encodés en base64 et les notifications. La file de sauvegarde sérialise les écritures et affiche les échecs. Les mutations sensibles reviennent à l’état précédent si la transaction échoue.

Les données saisies sont échappées avant rendu HTML. L’import de sauvegarde valide les structures, les identifiants UUID, les références, les types de fichiers et leur signature. Ces contrôles de format ne constituent pas une analyse antivirus ou une preuve d’authenticité.

## États

`BROUILLON`, `A_COMPLETER`, `PRET_A_SOUMETTRE`, `TRANSMIS_SIMULATION`, `EN_VERIFICATION_SIMULATION`, `COMPLEMENT_DEMANDE`, `TERMINE_SIMULATION`, `ANNULE`.

L’envoi demande d’abord un précontrôle réussi. Une demande de complément exige un motif. La correction permet une nouvelle soumission, puis une nouvelle prise en charge par l’agent. Les événements sont ajoutés à l’historique local. Celui-ci reste modifiable par l’utilisateur de l’appareil et ne possède pas les garanties d’un journal serveur inviolable.

## Écarts assumés avec la cible

- Aucune API métier ni base PostgreSQL exécutée.
- Pas d’authentification, MFA ou comptes distincts : un seul espace fictif par origine navigateur.
- Pas de stockage cloud privé, chiffrement applicatif, antivirus ou ancienne version binaire conservée.
- Pas de partage externe, mandat vérifié, droit ARCH réel, réseau SMS/USSD réel ou identification SIM réelle.
- Pas de synchronisation temps réel ou entre appareils.
- Manifeste et cache PWA présents ; l’installabilité, les quotas et l’accessibilité doivent être vérifiés sur les appareils cibles.

## Passage à la cible

1. Porter les écrans vers Next.js/TypeScript et les composants accessibles choisis.
2. Déplacer les règles de `core.mjs` vers des services serveur typés et valider chaque requête.
3. Brancher une authentification réelle ; dériver le propriétaire côté serveur.
4. Implémenter les politiques d’accès et leurs tests d’isolation avant tout compte réel.
5. Remplacer les données base64 par des objets de stockage privé avec liens temporaires.
6. Écrire dossiers, événements et notifications dans une transaction serveur.
7. Ajouter les mandats, habilitations agents, MFA, conservation, sauvegardes et restauration.
8. Activer seulement les connecteurs pour lesquels une convention et un environnement de test existent.

Le schéma SQL joint est un point de départ séparé, pas une migration appliquée ou une configuration complète de production.
