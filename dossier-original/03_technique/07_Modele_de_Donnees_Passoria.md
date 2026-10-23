# PASSORIA — Modèle de données logique (MVP)

**Principe :** toutes les données sont fictives en démonstration. Le modèle ci-dessous n'est pas une base de registre d'état civil ; il sert à préparer et suivre les démarches.

## Entités principales

| Entité | Identifiant | Champs essentiels | Règle de sécurité |
|---|---|---|---|
| users | id (UUID) | email, display_name, status, locale | Propriétaire / admin autorisé |
| memberships | id | user_id, organization_id, role, active | Invitation validée |
| organizations | id | name, type, external_code_optional | Réservé aux agents habilités |
| service_definitions | id | code, sector, title, published, source_url, version | Consultation publique si publiée |
| service_steps | id | service_id, step_order, schema_json, rule_version | Vérifié par équipe produit |
| cases | id | service_id, owner_id, status, reference, created_at | Politique propriétaire ou délégation |
| case_participants | id | case_id, user_id, capacity, authorization_scope | Mandat contrôlé |
| case_answers | id | case_id, step_id, encrypted_payload, version | Accès restreint au dossier |
| documents | id | owner_id, storage_key, kind, status, created_at | Stockage privé uniquement |
| case_documents | id | case_id, document_id, purpose | Vérification finalité et droits |
| precheck_results | id | case_id, rule_id, severity, status, detail_safe | Pas de données sensibles dans logs |
| case_events | id | case_id, actor_id, event_type, occurred_at, metadata_safe | Append-only log applicatif |
| notifications | id | recipient_id, case_id, channel, state, sent_at | Contenu générique |
| consent_records | id | subject_id, purpose, scope, created_at, revoked_at | Traçabilité par finalité |
| audit_logs | id | actor_id, action, resource_id, at, ip_hash | Visibilité sécurité limitée |
| content_sources | id | url, title, checked_at, published_at | Provenance de toute procédure |

## Relations essentielles

- `users (1) -> (N) cases` via `owner_id` ; `service_definitions (1) -> (N) cases`.
- `cases (1) -> (N) case_events`, `case_answers`, `case_participants`, `precheck_results`.
- `documents (N) <-> (N) cases` via `case_documents`.
- `organizations (1) -> (N) memberships` et `users (1) -> (N) memberships`.
- Pas de `official_birth_records` ni de `official_death_records` : ces registres appartiennent aux administrations compétentes.

## États et invariants

`BROUILLON -> A_COMPLETER -> PRET_A_SOUMETTRE -> TRANSMIS_SIMULATION -> EN_VERIFICATION_SIMULATION -> TERMINE_SIMULATION`. Passage possible à `COMPLEMENT_DEMANDE` puis retour à `A_COMPLETER`. `ANNULE` terminal. Toutes les transitions sont contrôlées côté serveur et journalisées.

**Invariant :** un usager ne lit ni ne modifie le dossier d'un autre par simple connaissance de sa référence. **Invariant :** une pièce ne peut être liée à un dossier sans autorisation de son propriétaire ou base légale correspondante. **Invariant :** une notification SMS n'inclut jamais une pièce d'identité, un diagnostic ou un NPI.

## API de démonstration envisagée

| Méthode | Route | Rôle |
|---|---|---|
| GET | `/api/services` | Catalogue versionné |
| POST | `/api/cases` | Créer dossier fictif |
| GET | `/api/cases/{id}` | Lire dossier autorisé |
| PATCH | `/api/cases/{id}` | Mettre à jour brouillon autorisé |
| POST | `/api/cases/{id}/precheck` | Résultats règles |
| POST | `/api/cases/{id}/documents` | Associer pièce d'essai |
| GET | `/api/cases/{id}/events` | Chronologie |
| POST | `/api/agent/cases/{id}/request-info` | Complément simulé |

## Points à décider en pilote

Responsable de traitement, délégations légales, politique de conservation, gestion des consentements pertinents vs bases légales non fondées sur le consentement, authentification des proches, schémas par démarches, classification et sécurité du stockage.
