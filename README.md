# Passoria — livraison 0.2.0

**22 octobre 2026. Prototype fonctionnel local, avec données fictives.**

Cette archive réunit l’application, ses tests, le dossier de conception initial et les quatre maquettes fournies. Commencez par `DEMARRAGE.md`.

## Démarrage rapide

Installer Node.js 22 ou supérieur. Depuis le dossier `application` :

```bash
npm install
npm run dev
```

Ouvrir **http://localhost:3000**. Les fichiers nécessaires, y compris les icônes Lucide, sont intégrés à l’archive : `npm install` est facultatif pour démarrer. Il installe la bibliothèque pour régénérer les icônes. Ne pas ouvrir `public/index.html` directement avec `file://` : les modules et le stockage nécessitent un serveur local.

## Contenu

| Dossier | Contenu |
| --- | --- |
| `application/` | Code exécutable, serveur Node, modules métier, CSS, manifeste PWA, service worker et tests |
| `documentation/` | Fonctionnalités livrées, limites, architecture effective, recette, suite du développement |
| `base-de-donnees/` | Proposition de schéma PostgreSQL pour le futur backend, non connectée à la démo |
| `dossier-original/` | Intégralité du kit de conception et de candidature initial, sans modification |
| `maquettes/` | Les quatre références visuelles fournies |
| `SHA256SUMS.txt` | Empreintes des fichiers livrés |

## Ce qui fonctionne dans cette version

- Accueil citoyen, catalogue filtrable et navigation mobile à cinq entrées.
- Déclarations de naissance et formalités après décès en quatre étapes.
- Saisie, sauvegarde des brouillons, reprise, précontrôles explicites et suivi chronologique.
- Import PDF/JPG/PNG, ajout d’exemples fictifs, aperçu/téléchargement, remplacement avec compteur de version, suppression des pièces des brouillons et réutilisation ciblée.
- Espace agent de démonstration : prise en charge, complément motivé, retour au citoyen, nouvelle soumission et fin du scénario.
- Notifications internes génériques et préférences.
- Menu USSD de démonstration, pages d’orientation ARCH/SIM et aide.
- Export/import JSON des dossiers et fichiers ; remise à zéro avec confirmation.
- Sauvegarde IndexedDB sur l’appareil ; service worker pour les ressources hors ligne après chargement initial sur origine sécurisée.
- Logo « Le lien », introduction animée SVG/CSS, icônes PWA/Apple et aperçu GIF.
- Écrans connexion et inscription Google/téléphone, indicatifs pays, OTP et renvoi temporisé ; activation du service requise.

## Statut technique exact

Cette livraison est une application **HTML/CSS/JavaScript modulaire**, servie par Node.js, avec **Lucide 1.61.0** pour les icônes d’interface. Les modules sélectionnés sont fournis localement, sans CDN. Ce choix fournit un prototype portable et facile à lancer. Ce n’est pas encore l’implémentation Next.js/TypeScript/Supabase recommandée dans le dossier initial. Cette stack reste la cible de la phase backend ; la différence est explicitée dans `documentation/ARCHITECTURE_EFFECTIVE.md`.

La démo démarre sur l’écran de connexion, avec une entrée distincte sans compte. Les profils citoyen et agent sont deux vues d’un même jeu de données fictif local ; ce sélecteur de rôle n’est pas une authentification. L’intégration Supabase Auth Google/SMS est écrite mais n’est reliée à aucun projet dans l’archive. Après configuration, elle vérifie la connexion et sépare les espaces locaux par compte ; les dossiers ne sont pas synchronisés dans le cloud. Aucune API gouvernementale ou activation SIM n’est connectée. Les pièces ne sont pas vérifiées officiellement. Voir `documentation/CONNEXION_ET_LOGO.md` pour la configuration et les limites.

Le remplacement d’une pièce conserve son identifiant et incrémente sa version ; les anciens octets ne sont pas archivés. Le partage de documents à des tiers, la gestion de mandats et le coffre-fort documentaire chiffré restent à construire.

## Vérification

```bash
cd application
npm run check
npm test
```

Les tests vérifient les règles métier et le serveur HTTP. Les résultats et la limite d’inspection visuelle de cet environnement figurent dans `documentation/VERIFICATION.md`. Aucun test de conformité institutionnelle ou audit de sécurité de production n’est revendiqué.
