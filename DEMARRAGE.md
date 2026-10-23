# Démarrer Passoria

## Sur Ubuntu, Windows ou macOS

1. Décompresser toute l’archive.
2. Installer Node.js version 22 ou supérieure si nécessaire.
3. Ouvrir un terminal dans `Passoria/application`.
4. Exécuter `npm run dev`.
5. Ouvrir `http://localhost:3000` dans le navigateur.

`npm install` peut être lancé avant pour installer Lucide et régénérer ses fichiers avec `npm run vendor:icons`. Les modules nécessaires à l’exécution sont déjà intégrés dans l’archive. Laisser le terminal ouvert pendant l’utilisation. `Ctrl+C` arrête le serveur.

Si le port 3000 est occupé :

```bash
npm run dev -- --port 3001
```

Ouvrir alors `http://localhost:3001`. Chaque port/origine possède un stockage navigateur distinct : vos dossiers enregistrés sur 3000 ne s’afficheront pas sur 3001 sans export/import.

## Premier essai : naissance

Au premier lancement, l’écran de connexion apparaît après l’animation. Choisir **Explorer la démonstration sans compte** pour tester sans configurer de fournisseur. Les boutons Google/SMS restent en attente d’activation réelle. Les instructions sont dans `documentation/CONNEXION_ET_LOGO.md`.

1. Choisir **Naissance** sur l’accueil.
2. Utiliser des noms fictifs, une date passée valide et un lieu au Bénin.
3. Renseigner un déclarant fictif et sa qualité.
4. À l’étape Pièces, choisir **Ajouter**, puis **Importer ou utiliser un exemple**, puis **Utiliser un PDF exemple** pour chaque pièce.
5. Vérifier et soumettre : l’envoi est simulé.
6. Ouvrir **Profil** depuis les initiales en haut à droite, puis **Espace agent de démonstration**. Sur ordinateur, l’accès figure aussi dans le menu latéral.
7. Entrer dans l’espace agent et prendre le dossier en charge.
8. Rédiger un motif, par exemple « Corriger le nom fictif du déclarant », puis demander un complément.
9. Revenir à l’espace citoyen, reprendre le dossier, corriger puis soumettre à nouveau.
10. Revenir à l’agent, reprendre en charge et terminer la simulation.

## Tester un décès

Choisir **Après un décès** et suivre les quatre étapes. Les formalités associées (état civil, pension, succession) sont des orientations indicatives. Elles ne sont pas envoyées à des organismes.

## Sauvegarder et changer d’appareil

Pour voir uniquement l’animation et le nouveau logo, ouvrir `http://localhost:3000/brand-preview.html` après avoir démarré le serveur. Les fichiers SVG/PNG et l’aperçu GIF sont dans `application/public`.

Dans **Profil**, exporter la sauvegarde JSON. Sur l’autre navigateur ou appareil, ouvrir Passoria puis importer ce fichier. Confirmer le remplacement des données locales. Il s’agit d’un transfert manuel, pas d’une synchronisation cloud.

Les fichiers exportés incluent le contenu des pièces fictives. Le quota de démonstration est de 5 Mo par pièce et 18 Mo de documents cumulés ; l’import JSON est limité à 30 Mo.

## Téléphone et tablette

Les écrans possèdent des règles CSS pour les petits et grands écrans. Pour ouvrir depuis un autre appareil, le serveur doit être joignable sur le réseau local ou hébergé. `localhost` sur votre téléphone désigne le téléphone, pas votre ordinateur.

Sur un réseau Wi-Fi local de confiance, l’adresse prend la forme `http://ADRESSE_IP_DU_PC:3000`. Le pare-feu peut bloquer le port. L’accès par HTTP à une IP locale n’offre généralement pas le contexte sécurisé nécessaire au service worker et à certaines API du navigateur. Privilégier un hébergement HTTPS pour tester la PWA sur téléphone ; aucun hébergement n’est inclus dans cette archive.

## Installation PWA et hors connexion

Sur `localhost` ou un hébergement HTTPS, un manifeste et un service worker sont fournis. Après chargement complet, les ressources peuvent être utilisées hors connexion. Les options « Installer » et « Ajouter à l’écran d’accueil » dépendent du navigateur et du système ; leur disponibilité sur iOS/Android n’a pas été validée ici.

## Dépannage

- **Stockage indisponible** : autoriser le stockage du site et éviter un mode privé qui le bloque.
- **Un autre onglet est ouvert** : fermer l’autre fenêtre Passoria, puis recharger. Un verrou évite les écritures concurrentes quand le navigateur prend en charge Web Locks.
- **Document non visible** : utiliser le téléchargement dans l’aperçu si le navigateur n’affiche pas les PDF intégrés.
- **Une pièce transmise ne peut être remplacée** : demander un complément depuis l’agent pour rouvrir le dossier. Les pièces partagées avec un autre dossier verrouillé restent protégées du remplacement ; ajouter une nouvelle pièce à la place.
- **Pas de données sur un autre appareil** : importer l’export JSON ; cette version n’a pas de serveur de données.
- **Installation npm** : aucun package externe n’est requis ; `npm run dev` suffit avec Node installé.
