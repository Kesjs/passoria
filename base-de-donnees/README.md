# Schéma de référence, non branché

`schema-reference.sql` décrit les entités prévues pour un backend PostgreSQL. Il n’est pas utilisé par l’application locale et n’a pas été testé sur un serveur PostgreSQL dans cette livraison.

Le script crée un schéma `passoria` dans une base de test dédiée. Il n’est pas réentrant : un schéma existant provoquera une erreur et la transaction sera annulée. Aucune opération de suppression ou remplacement de base existante n’est incluse.

La sécurité de ligne est activée avec accès fermé par défaut ; aucune politique, aucun rôle d’application ni compte de connexion n’est créé. Ne pas fournir le compte propriétaire à un navigateur ou à un utilisateur. Les politiques propriétaire, mandataire et agent assigné sont à implémenter et tester.

La validation des transitions, l’intégrité entre version de démarche et étape, les autorisations de réutilisation d’une pièce, les habilitations de l’agent, l’immutabilité des journaux et les clés de chiffrement restent des travaux backend. Les noms des colonnes ne réalisent pas ces garanties à eux seuls.

Les documents doivent être placés dans un stockage privé ; seuls les chemins d’objets sont prévus ici. Les anciennes versions binaires sont prévues par ce schéma, alors que la démo locale conserve uniquement le fichier courant et son compteur de version.
