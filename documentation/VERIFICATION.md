# Rapport de vérification

Version : 0.2.0. Date : 22 octobre 2026.

## Réalisé

Icônes : les 28 définitions intégrées ont été comparées aux exports du package officiel `lucide@1.61.0`. Les trois modules exécutés sont inclus dans la liste de cache du service worker. La licence est fournie et la version npm est verrouillée. Les tests existants ont été réexécutés après ce remplacement.

`npm run check` : analyse syntaxique des modules applicatifs, du stockage, du service worker et du serveur.

`npm test` : **18 tests réussis, 0 échec** sur Node.js 24.19.0. Ils couvrent les champs et pièces manquants, les dates futures/impossibles, le mandat fictif, les parcours naissance/décès avec complément, la suppression d’une pièce avant soumission, l’annulation terminale, les formats de fichiers, la structure d’une sauvegarde, les réponses HTTP, la validation téléphonique, la configuration, les appels Google/OTP sur un client simulé, les codes invalides et la session révoquée.

Le logo PNG a été inspecté comme image. Le GIF d’aperçu a été généré avec plusieurs images ; le nombre et les dimensions des images sont contrôlés. Les modules embarqués sont produits à partir des versions npm verrouillées. Les nouvelles ressources et les types MIME des icônes sont contrôlés par le test HTTP.

Le serveur de développement démarre avec l’argument `--port`, y compris sur le port d’aperçu. Les ressources de l’application sont contrôlées par le test HTTP.

## Non attesté

L’inspection visuelle par le navigateur de cet environnement a été bloquée par sa politique d’accès. Aucun parcours utilisateur exécuté dans un navigateur, aperçu mobile validé, installation PWA ou essai hors connexion réel n’est revendiqué. La recette manuelle est fournie pour poursuivre cette vérification localement.

Le schéma SQL est fourni comme référence et n’a pas été exécuté sur PostgreSQL. Aucun backend ni compte réel n’est configuré. Il n’y a pas eu de test d’intrusion, d’audit juridique ni de validation institutionnelle.

Google/SMS : code d’intégration présent, mais aucun fournisseur ni projet n’a été activé. Les tests sont simulés et n’attestent pas une délivrance SMS réelle ou une connexion Google de bout en bout. Il faut choisir le compte/projet, configurer les fournisseurs et effectuer ces essais.
