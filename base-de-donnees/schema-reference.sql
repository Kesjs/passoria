-- PASSORIA 0.1 : schéma de référence PostgreSQL 15+, non connecté à la démo.
-- À exécuter uniquement dans une base de test dédiée, après revue.
-- RLS activée sans politique publique : accès applicatif fermé par défaut.
-- Authentification, rôles SQL, politiques d'autorisation, mandats, journal
-- immuable et stockage privé doivent être implémentés avant tout usage réel.
BEGIN;
CREATE SCHEMA passoria;

CREATE TYPE passoria.case_status AS ENUM (
  'BROUILLON','A_COMPLETER','PRET_A_SOUMETTRE','TRANSMIS_SIMULATION',
  'EN_VERIFICATION_SIMULATION','COMPLEMENT_DEMANDE','TERMINE_SIMULATION','ANNULE'
);

CREATE TABLE passoria.users (
  id uuid PRIMARY KEY,
  display_name text NOT NULL,
  locale text NOT NULL DEFAULT 'fr-BJ',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE passoria.organizations (
  id uuid PRIMARY KEY, name text NOT NULL, organization_type text NOT NULL
);
CREATE TABLE passoria.memberships (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES passoria.users(id),
  organization_id uuid NOT NULL REFERENCES passoria.organizations(id),
  role text NOT NULL CHECK (role IN ('AGENT','SUPERVISEUR')),
  active boolean NOT NULL DEFAULT false,
  UNIQUE(user_id,organization_id,role)
);
CREATE TABLE passoria.content_sources (
  id uuid PRIMARY KEY, url text NOT NULL, title text NOT NULL,
  checked_at timestamptz, note text
);
CREATE TABLE passoria.service_definitions (
  id uuid PRIMARY KEY, code text NOT NULL, version integer NOT NULL CHECK(version>0),
  title text NOT NULL, published boolean NOT NULL DEFAULT false,
  source_id uuid REFERENCES passoria.content_sources(id),
  UNIQUE(code,version), CHECK (NOT published OR source_id IS NOT NULL)
);
CREATE TABLE passoria.service_steps (
  id uuid PRIMARY KEY,
  service_id uuid NOT NULL REFERENCES passoria.service_definitions(id),
  position integer NOT NULL CHECK(position>=0), schema_json jsonb NOT NULL,
  rule_version text NOT NULL,
  UNIQUE(service_id,position)
);
CREATE TABLE passoria.cases (
  id uuid PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES passoria.users(id),
  service_id uuid NOT NULL REFERENCES passoria.service_definitions(id),
  assigned_agent_id uuid REFERENCES passoria.users(id),
  reference text NOT NULL UNIQUE,
  status passoria.case_status NOT NULL DEFAULT 'BROUILLON',
  revision integer NOT NULL DEFAULT 1 CHECK(revision>0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE passoria.case_participants (
  id uuid PRIMARY KEY,
  case_id uuid NOT NULL REFERENCES passoria.cases(id),
  user_id uuid NOT NULL REFERENCES passoria.users(id),
  capacity text NOT NULL, authorization_scope jsonb NOT NULL DEFAULT '{}',
  verified_at timestamptz, expires_at timestamptz,
  UNIQUE(case_id,user_id)
);
CREATE TABLE passoria.case_answers (
  id uuid PRIMARY KEY,
  case_id uuid NOT NULL REFERENCES passoria.cases(id),
  step_id uuid NOT NULL REFERENCES passoria.service_steps(id),
  encrypted_payload bytea NOT NULL, key_reference text NOT NULL,
  version integer NOT NULL CHECK(version>0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(case_id,step_id,version)
);
CREATE TABLE passoria.documents (
  id uuid PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES passoria.users(id),
  title text NOT NULL, kind text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);
CREATE TABLE passoria.document_versions (
  id uuid PRIMARY KEY,
  document_id uuid NOT NULL REFERENCES passoria.documents(id),
  version integer NOT NULL CHECK(version>0),
  storage_key text NOT NULL UNIQUE,
  mime_type text NOT NULL CHECK(mime_type IN ('application/pdf','image/jpeg','image/png')),
  size_bytes bigint NOT NULL CHECK(size_bytes>0), sha256 text NOT NULL,
  scan_state text NOT NULL DEFAULT 'PENDING' CHECK(scan_state IN ('PENDING','CLEAN','BLOCKED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(document_id,version)
);
CREATE TABLE passoria.case_documents (
  case_id uuid NOT NULL REFERENCES passoria.cases(id),
  document_version_id uuid NOT NULL REFERENCES passoria.document_versions(id),
  purpose text NOT NULL,
  PRIMARY KEY(case_id,document_version_id)
);
CREATE TABLE passoria.precheck_results (
  id uuid PRIMARY KEY, case_id uuid NOT NULL REFERENCES passoria.cases(id),
  rule_id text NOT NULL, rule_version text NOT NULL,
  severity text NOT NULL CHECK(severity IN ('INFO','WARNING','ERROR')),
  passed boolean NOT NULL, message_safe text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE passoria.case_events (
  id uuid PRIMARY KEY, case_id uuid NOT NULL REFERENCES passoria.cases(id),
  actor_id uuid NOT NULL REFERENCES passoria.users(id),
  event_type text NOT NULL, metadata_safe jsonb NOT NULL DEFAULT '{}',
  occurred_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE passoria.notifications (
  id uuid PRIMARY KEY,
  recipient_id uuid NOT NULL REFERENCES passoria.users(id),
  case_id uuid REFERENCES passoria.cases(id),
  channel text NOT NULL CHECK(channel IN ('IN_APP','SMS_SIMULATION')),
  template_code text NOT NULL, state text NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now(), read_at timestamptz
);
CREATE TABLE passoria.consent_records (
  id uuid PRIMARY KEY,
  subject_id uuid NOT NULL REFERENCES passoria.users(id),
  purpose text NOT NULL, scope jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(), revoked_at timestamptz
);
CREATE TABLE passoria.audit_logs (
  id uuid PRIMARY KEY, actor_id uuid REFERENCES passoria.users(id),
  action text NOT NULL, resource_id uuid, metadata_safe jsonb NOT NULL DEFAULT '{}',
  occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX cases_owner_updated ON passoria.cases(owner_id,updated_at DESC);
CREATE INDEX cases_agent_status ON passoria.cases(assigned_agent_id,status);
CREATE INDEX documents_owner ON passoria.documents(owner_id);
CREATE INDEX case_events_timeline ON passoria.case_events(case_id,occurred_at);
CREATE INDEX notifications_recipient ON passoria.notifications(recipient_id,created_at DESC);

-- Aucune politique d'accès n'est installée dans ce livrable.
-- Les rôles applicatifs non propriétaires ne liront aucune ligne tant que
-- les politiques ne sont pas définies. Le propriétaire SQL et un rôle
-- BYPASSRLS ne sont pas des identités applicatives acceptables.
DO $$ DECLARE item record; BEGIN
  FOR item IN SELECT tablename FROM pg_tables WHERE schemaname='passoria' LOOP
    EXECUTE format('ALTER TABLE passoria.%I ENABLE ROW LEVEL SECURITY',item.tablename);
    EXECUTE format('ALTER TABLE passoria.%I FORCE ROW LEVEL SECURITY',item.tablename);
  END LOOP;
END $$;
REVOKE ALL ON SCHEMA passoria FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA passoria FROM PUBLIC;
COMMIT;
