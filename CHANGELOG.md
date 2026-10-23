# Historique

## 0.2.0 — 22 octobre 2026

- Intégration vectorielle du logo n° 3 « Le lien » et déclinaisons favicon, PWA et Apple.
- Introduction SVG/CSS, réduction des mouvements, relecture et aperçu GIF.
- Connexion/inscription sans landing page ; accueil actuel conservé après connexion ou entrée en démo.
- Intégration configurable de Supabase Auth : Google PKCE et téléphone/OTP, indicatifs pays, renvoi temporisé, déconnexion et erreurs explicites.
- Aucune activation de fournisseur sans compte/projet choisi ; la démo reste accessible séparément.
- Espaces locaux distincts par identifiant de compte, sans migration automatique ni synchronisation cloud.
- Modules officiels d’authentification et de validation téléphonique intégrés, licences incluses.
- 18 tests automatisés réussis ; connexions et SMS réels non testés faute de configuration.

## 0.1.1 — 22 octobre 2026

- Remplacement des icônes d’interface dessinées à la main par 28 icônes officielles de Lucide 1.61.0.
- Bibliothèque épinglée dans package.json et le verrou npm, modules embarqués localement et licences incluses.
- Cache du service worker actualisé pour les modules Lucide.
- Ajout du script reproductible `npm run vendor:icons` et de la correspondance `icon-map.json`.
- Le logo Passoria reste un élément de marque, distinct des icônes d’interface.

## 0.1.0 — 22 octobre 2026

- Première application locale exécutable et navigation responsive.
- Parcours naissance et décès, dossier unique, chronologie et simulation agent.
- Imports documentaires avec contrôle de taille/type/signature, PDF exemple et réutilisation.
- Sauvegarde IndexedDB, export/import et préférences de notifications.
- Simulateur USSD et orientation ARCH/SIM.
- Manifeste, service worker et serveur statique sans dépendances.
- Tests métier/HTTP, recette et documentation d’état.
- Ajout des quatre maquettes et conservation du kit original.

Le passage à Next.js/TypeScript, l’authentification et le backend restent planifiés et sont explicitement distingués de la démonstration livrée.
