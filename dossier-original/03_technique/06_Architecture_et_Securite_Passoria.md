# PASSORIA — Architecture technique, interopérabilité et sécurité
## Référence d'implémentation pour prototype et pilote institutionnel

**Date :** 22 octobre 2026. Les intégrations institutionnelles ci-dessous sont des **interfaces envisagées**, non des accords obtenus.

## 1. Choix d'architecture

**MVP recommandé :** Next.js + TypeScript + Tailwind + shadcn/ui (PWA responsive), API métier typée (Route Handlers ou NestJS lorsque complexité accrue), PostgreSQL/Supabase en environnement de test, hébergement Vercel ou équivalent et stockage privé de documents fictifs. Découpler moteur des démarches, pièces, notifications et adaptateurs partenaires pour éviter un couplage à un seul service officiel.

## 2. Diagramme de flux logique

```text
Citoyen Web/PWA ----┐
Guichet assisté ----+--> API / Auth --> Moteur de parcours --> Dossiers / statuts
SMS/USSD (démo) ---┘        |                 |                    |
                            |            Précontrôles         Documents privés
                            |                 |                    |
                            +------------ Journal d'audit / Notifications
                            |
                            +-- Adaptateurs futurs (désactivés en MVP)
                                  ANIP, ARCH, opérateurs, X-Road sous conventions
```

## 3. Domaines logiciels

- **Identity & Access :** utilisateur, rôles, sessions, mandats de représentation, MFA agent.
- **Service Catalog :** démarches, critères d'orientation, documentation sourcée et versionnée.
- **Case Management :** demandes, étapes, transitions d'états et assignation agent.
- **Documents :** métadonnées, objet chiffré, versions, visibilité et durées.
- **Validation Engine :** règles de complétude, de format et de cohérence ; intervention humaine pour ambiguïtés.
- **Notifications :** événements, modèles, canal et consentements / préférences.
- **Audit & Metrics :** suivi des actions, indicateurs agrégés et conformité.
- **Partner Connectors :** adaptateurs isolés activables uniquement après conventions.

## 4. Technologie et responsabilités

| Couche | Choix MVP | Motivation |
|---|---|---|
| Client | Next.js / TS / PWA | Une base mobile/desktop, SEO pages d'information |
| UI | Tailwind, shadcn/ui | Composants accessibles et design cohérent |
| Auth | Supabase Auth ou solution équivalente | Comptes de test et sécurisation de base |
| Base | PostgreSQL | Contraintes, journalisation, relations |
| Stockage | Bucket privé | Liens temporaires, pas d'URL publique des pièces |
| Backend | API TypeScript | Règles métier côté serveur |
| Contrôles | Schémas Zod + règles métier | Erreurs explicables, testables |
| Messaging | Simulateur dans MVP | Aucun SMS officiel sans partenaire |
| Observabilité | Journaux structurés sans PII | Suivi d'erreur et investigation |

## 5. Données à protéger

NPI, documents d'état civil, données de santé, identifiants de SIM et informations sur un décès appellent des mesures de confidentialité renforcées. **Aucune véritable pièce d'identité ou médicale dans le prototype**. Pour un pilote : inventaire des données, base légale et finalités documentées, analyse d'impact si nécessaire, contrats de traitement et durées de conservation validées.

## 6. Mesures techniques minimales

1. Autorisation au niveau de chaque dossier, non seulement au niveau de la page ; principe du moindre privilège.
2. Contrôles d'accès PostgreSQL (RLS si Supabase), politiques testées, séparation agent/citoyen.
3. MFA pour agents, limitation des tentatives, expiration des sessions et journal de connexion.
4. TLS ; chiffrement au repos selon services utilisés ; secrets en gestionnaire d'environnement.
5. Téléversement par liste blanche, quota de taille, antivirus/inspection, stockage privé.
6. Audit des modifications : acteur, événement, horodatage, raison et ressource ; éviter le contenu sensible dans les logs.
7. Sauvegarde et restauration vérifiées avant la production.
8. Sécurité de développement : scan des dépendances, revue code, tests IDOR, contrôle de navigation, secrets non commités.

## 7. Interopérabilité X-Road et intégrations

L'ASIN indique que le cadre national XROAD BJ a été institué par le décret n°2020-209 du 18 mars 2020 [B05]. Cela **ne donne aucun droit d'accès automatique** aux données gouvernementales. Avant connexion : partenaire signataire, registre de traitement, spécifications contractuelles, tests en bac à sable, contrôle des flux autorisés, monitoring et mécanisme de révocation. Prévoir adaptateur par administration ; en cas d'échec, aucune fausse confirmation.

## 8. Séquence de préparation d'un dossier

1. Client demande catalogue à `GET /api/services`.
2. Client ouvre brouillon à `POST /api/cases`.
3. API valide l'identité de session, les droits, la version du parcours et le contenu.
4. Usager ajoute pièces fictives via URL de téléversement temporaire et métadonnées.
5. `POST /api/cases/{id}/precheck` renvoie erreurs expliquées.
6. Agent de démo confirme/sollicite complément ; événement ajouté à l'historique.
7. Notification test créée et statut visible au titulaire.

## 9. Critères de sécurité avant pilote réel

Aucun lancement institutionnel si absence de base légale, gestion des mandats, politique de conservation, tests d'intrusion, dispositif d'incident, contact responsable de traitement, authentification renforcée des agents ou convention de partage des données nécessaires.

## 10. Décisions d'implémentation

**ADR-01** : couche de parcours, pas registre souverain. **ADR-02** : simulation explicite sans API publique au MVP. **ADR-03** : règles vérifiables avant usage d'IA générative. **ADR-04** : contenu administratif sourcé et versionné. **ADR-05** : pas de données sensibles via SMS. **ADR-06** : architecture adaptable aux six modules mais développement échelonné.

**Références :** [B01] [B04] [B05] ; documents du concours [F02] et [F03].
