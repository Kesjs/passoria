# PASSORIA — Cahier des charges fonctionnel (PRD)
## Produit unifié pour la simplification des démarches administratives au Bénin

**Version :** 1.0, 22 octobre 2026  
**Slogan :** Toutes vos démarches, un seul espace.  
**Statut :** vision validée, prototype non institutionnel à construire.  
**Positionnement :** couche d'accompagnement et de continuité des démarches, intégrable aux services publics existants ; jamais un remplacement de leurs registres ou décisions.

## 1. Problème et opportunité

Les citoyens sont confrontés à des parcours qui peuvent cumuler découverte tardive des justificatifs, informations ressaisies, manque de visibilité et déplacements évitables. Chaque dysfonctionnement doit être confirmé par enquête sur une procédure précise. Passoria rend les démarches compréhensibles, préparables et suivables, y compris pour un usager peu connecté.

**Proposition de valeur :** trouver la bonne démarche, constituer un dossier conforme, repérer les incohérences, savoir quelle action effectuer ensuite et retrouver ses pièces dans un espace unique. Pour une procédure réellement interconnectée, Passoria relaie le statut authentique de l'organisme source.

## 2. Publics et droits

| Rôle | Besoin | Principales autorisations |
|---|---|---|
| Citoyen | Préparer et suivre ses demandes | Voir ses seules demandes et pièces, autoriser des partages |
| Proche / mandataire | Aider dans une formalité | Agir seulement avec mandat et périmètre vérifiés |
| Agent de guichet | Accompagner un usager | Accès limité au dossier confié, trace des actions |
| Agent instructeur | Contrôler le dossier | Décisions de démonstration au MVP, officielles seulement si habilité |
| Superviseur service | Mesurer la qualité du service | Mesures agrégées et contrôles d'accès ; pas d'accès illimité |
| Administrateur Passoria | Exploiter le produit | Paramétrage technique, sans visibilité automatique sur les documents |

## 3. Six domaines de Passoria

**D1 — Naissances :** orientation selon le contexte, formulaire progressif, vérification de cohérence des données du nourrisson et des parents, aide aux pièces, préparation du dossier, suivi de la procédure et rectification si la fonction officielle existe.

**D2 — Formalités après décès :** parcours destiné à un proche habilité, étapes et pièces contextualisées, suivi de la formalité relative à l'acte, checklist indicative des démarches complémentaires (pension, organismes concernés, succession), sans transmissions automatiques non autorisées.

**D3 — Dossier administratif réutilisable :** coffre de documents, métadonnées, versionnement, durée d'usage, accès par finalité, historique des partages, consentement lorsque pertinent et suppression selon obligations de conservation.

**D4 — ARCH Santé :** information sur les droits et les démarches, orientation vers les dispositifs officiels, réclamation et suivi seulement après accord avec l'organisme compétent. Pas de divulgation de données médicales par SMS.

**D5 — SIMIdentité :** parcours réglementaire de mise à jour d'identification d'abonnés, sous réserve de conformité, d'accord avec ARCEP et opérateurs, et de contrôles renforcés d'identité. Le MVP n'effectue aucune activation.

**D6 — Accès universel :** PWA navigateur, simulation SMS et USSD, assistance en guichet, langage simple, progression accessible et usage possible en connexion faible.

## 4. Capacités transversales

- Compte de démonstration et authentification réelle adaptée au niveau de risque.
- Catalogue de parcours, avec sources officielles, version des consignes et date de vérification.
- Assistant de préparation, checklist de pièces et affichage explicite des frais officiels confirmés.
- Précontrôle de complétude et de cohérence, d'abord par règles déterministes ; IA seulement si justifiée, explicable et testée.
- Référence interne du dossier, états standardisés, journal d'événements et prochaine action.
- Notifications de statut génériques et préférences de canal.
- Espace agent avec files d'attente, demandes de complément et revue humaine.
- Console d'administration à rôles séparés et statistiques agrégées.
- Interface en français dès le MVP ; préparation à l'internationalisation et aux langues locales.

## 5. MVP démontrable — périmètre figé

| Identifiant | Fonction | Priorité | Condition de succès |
|---|---|---|---|
| MVP-01 | Accueil et catalogue | P0 | Naissance / décès identifiables sans recherche complexe |
| MVP-02 | Authentification test | P0 | Rôles citoyen et agent séparés, comptes fictifs |
| MVP-03 | Dossier documentaire | P0 | Ajouter, remplacer, supprimer une pièce fictive |
| MVP-04 | Parcours naissance | P0 | Une incohérence détectée, correction possible |
| MVP-05 | Parcours décès | P0 | Préparation, pièce manquante, recours à un agent |
| MVP-06 | Suivi chronologique | P0 | Statuts, dates, prochaine action et mention « simulation » |
| MVP-07 | Espace agent | P0 | Réception, demande de complément, validation simulée |
| MVP-08 | Notification factice | P1 | Reçoit événement sans données sensibles |
| MVP-09 | Simulateur SMS/USSD | P1 | Consulter étape générique par référence test |
| MVP-10 | Assistance sourcée | P1 | Indique limites et lien vers service officiel |

**Hors MVP :** émission d'actes officiels, accès aux registres publics, lecture des droits ARCH réels, activation SIM, facturation publique, signature officielle, interconnexion X-Road effective, automatisation de décision juridique ou médicale.

## 6. Règles de fonctionnement et états

Statuts internes : `BROUILLON`, `A_COMPLETER`, `PRET_A_SOUMETTRE`, `TRANSMIS_SIMULATION`, `EN_VERIFICATION_SIMULATION`, `COMPLEMENT_DEMANDE`, `TERMINE_SIMULATION`, `ANNULE`. Ne jamais présenter ces statuts comme un état administratif officiel.

Une décision sensible requiert un agent compétent et une justification. L'usager peut voir l'historique de son dossier mais pas les journaux de sécurité complets. Le partage d'une pièce n'est permis que si la finalité, le destinataire, la base juridique et l'autorisation requise ont été contrôlés.

## 7. Exigences non fonctionnelles

| Domaine | Exigence MVP |
|---|---|
| Accessibilité | WCAG 2.2 AA visé, clavier, libellés, contraste, messages d'erreurs |
| Performance | Chargement perçu rapide en connexion mobile faible, budget à tester |
| Sécurité | TLS, RBAC, politiques de sécurité de ligne, MFA pour agent |
| Traçabilité | Journal d'événement immuable côté application, sans secret |
| Confidentialité | Données fictives au concours ; aucune donnée médicale réelle |
| Résilience | Sauvegardes et restauration testées avant pilote réel |
| Internationalisation | Textes externalisés et dates/localisation paramétrables |
| Intégration | Adaptateurs versionnés, désactivés tant que non autorisés |

## 8. Indicateurs et hypothèses

Mesurer taux de complétude initiale, temps de préparation, demandes de complément, erreurs utiles/faux positifs, compréhension du parcours, abandon et nombre de déplacements lors d'un vrai pilote. Les gains annoncés sont à mesurer et ne sont pas acquis.

## 9. Critères de livraison

Une démonstration est acceptée lorsque les scénarios naissance et décès sont jouables de bout en bout avec données fictives ; un agent peut demander une correction ; aucun écran n'affirme qu'un acte a été officiellement délivré ; aucune API gouvernementale n'est appelée ; l'accès mobile et les erreurs sont testés.

## 10. Décisions ouvertes

Confirmer une seule procédure prioritaire lors de la candidature ; valider la recevabilité du déposant ; obtenir un avis d'agent sur les pièces et délais ; choisir les textes applicables ; formaliser la gouvernance et le responsable de traitement avant tout pilote officiel ; vérifier disponibilité du nom Passoria.

**Références :** [F02] [F03] [B01] [B04] [B05].
