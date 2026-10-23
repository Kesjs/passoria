# Vérification locale — 23 octobre 2026

Serveur : http://localhost:3000. Prototype fonctionnel local ; conformité exacte aux maquettes non acquise.

## Modifications

- Recherche fonctionnelle ajoutée à l'accueil.
- Navigation mobile alignée : Accueil, Démarches, Documents, Aide, Profil. Dossiers accessibles depuis l'accueil et sur ordinateur.
- Signature de marque visible sur mobile ; accueil compacté et cartes ajustées.
- Astérisques des champs sur la ligne des libellés ; deux colonnes à partir de 380 px, une en dessous.
- Actions documentaires agrandies à 44 px.
- Introduction retirée après 100 ms avec réduction des animations, contre 1600 ms normalement. Modification contrôlée dans le code ; préférence système non émulée dans le navigateur.
- Version du cache PWA incrémentée.

## Parcours navigateur réellement exécutés

1. Connexion : écran affiché et entrée sans compte fonctionnelle. Google/SMS réels non testés.
2. Introduction : observée au rechargement puis disparition confirmée, application utilisable.
3. Accueil : recherche « naissance » filtrant correctement les services.
4. Naissance : formulaire vide refusé avec erreurs explicites ; saisie fictive et passage au déclarant réussis.
5. Brouillon : sauvegarde puis affichage de la référence et des noms fictifs dans le suivi.
6. Documents : PDF exemple ajouté et toujours présent après rechargement.
7. Responsive : accueil/documents inspectés à 320 et 390 px ; accueil à 768 et 1280 px. Aucun débordement horizontal global mesuré sur ces états. Appareils iOS/Android réels non testés.

Captures dans `captures/`. Aucun avertissement ni erreur console relevé pendant ces vérifications. Les captures longues montrent la barre fixe à la position du viewport de capture.

## Vérifications automatisées

`npm run check` réussi ; `npm test` : 18 réussites, zéro échec. Les deux parcours naissance/décès et les transitions sont couverts par les tests existants. Décès complet et traitement agent non exécutés manuellement dans le navigateur.

## Écarts visuels restants

- Logo actuel « Le lien » différent des maquettes, présenté comme déjà choisi dans la documentation du projet.
- Portrait, décor du Bénin et fleurs absents sous forme de ressources indépendantes ; illustration actuelle différente.
- Typographie, icônes, proportions et organisation des étapes encore différentes.
- Statuts réels du prototype conservés : aucune vérification officielle ni partage absent ne sont annoncés comme disponibles.
- Références JPEG avec cadre de téléphone ; pas de fichier de conception, de polices ni de mesures associées. Comparaison visuelle, sans attestation pixel à pixel.

## Suite fonctionnelle

Authentification réelle à activer sur un projet choisi ; API métier, base, stockage privé et autorisations serveur à implémenter ou connecter ; synchronisation et intégrations institutionnelles à construire. Aucun schéma appliqué à une base externe.

Un brouillon et un PDF explicitement fictifs restent dans le navigateur de recette. Aucune administration ne reçoit ces données.
