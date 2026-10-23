# Recette à exécuter dans le navigateur

Utiliser exclusivement des données et pièces fictives.

| Scénario | Résultat attendu |
| --- | --- |
| Créer une naissance puis continuer sans rien remplir | Les champs obligatoires sont listés, le dossier reste récupérable |
| Saisir une date future | La vérification explique l’erreur |
| Recharger un brouillon après enregistrement | Les valeurs réapparaissent |
| Essayer un fichier HTML renommé en PDF | Le fichier est refusé par le contrôle de signature |
| Utiliser les deux PDF exemples | Chaque pièce apparaît comme ajoutée, non vérifiée |
| Réutiliser une pièce du dossier unique | La pièce est liée au dossier choisi |
| Soumettre une naissance | Le statut devient « Transmis · simulation » |
| Agent : prendre en charge | L’événement et le statut sont visibles côté citoyen |
| Agent : demander un complément sans motif | L’action est refusée |
| Agent : demander un complément motivé | Le citoyen peut reprendre et corriger |
| Corriger et soumettre à nouveau | Le dossier revient en attente de prise en charge |
| Agent : terminer | Le statut précise la simulation et aucun acte n’est produit |
| Faire tout le parcours décès | La qualité du déclarant et les formalités associées sont présentes |
| Supprimer ou remplacer une pièce transmise | L’opération est refusée pour préserver l’historique |
| Exporter, puis importer dans un autre navigateur | Les dossiers et les documents fictifs sont retrouvés après confirmation |
| Importer un JSON mal formé | Une erreur est affichée, les données actuelles restent présentes |
| Fermer le dialogue d’effacement | Les données restent inchangées |
| Parcourir les menus USSD | Aucune donnée personnelle réelle n’apparaît |
| Ouvrir ARCH/SIM | Les limites et l’orientation sont explicites |
| Après chargement complet, couper Internet | Les écrans locaux restent accessibles si le service worker est actif |
| Navigation clavier | Focus visible, champs accessibles, dialogue refermable avec Échap |
| Largeurs 390, 768 et 1440 px | Formulaires lisibles, navigation et actions sans débordement horizontal |

Ces vérifications manuelles ne sont pas toutes attestées dans cette livraison : consulter `VERIFICATION.md` pour la preuve effectivement obtenue.
