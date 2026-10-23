# PASSORIA — Annexe 1
## Parcours administratifs et protocole de mesure de l'impact

**Nature :** annexe technique et méthodologique destinée à soutenir la proposition. Tous les écrans et statuts présentés sont des prototypes non officiels.

## 1. Choix du pilote

Le **secteur du concours** est « État civil, Identité et Voyages ». Le besoin prioritaire à mesurer est la préparation des dossiers et la continuité de suivi, avec deux cas de démonstration : la naissance et les formalités administratives après un décès. Le lancement d'une procédure réelle nécessite un cadrage avec les acteurs légalement compétents.

## 2. Parcours AS-IS / TO-BE : décès

| Moment | À observer dans l'existant | Proposition Passoria |
|---|---|---|
| Comprendre | Où déclarer ? Quel acte demander ? | Questionnaire court d'orientation |
| Préparer | Pièces et formulaires parfois découverts tard | Liste contextualisée et contrôle de complétude |
| Déposer | Canal compétent déterminé par la procédure | Redirection officielle ou dépôt interopéré après convention |
| Suivre | Référence et statut potentiellement dispersés | Une chronologie lisible, sans inventer de statuts officiels |
| Continuer | Autres démarches auprès d'organismes distincts | Liste personnalisée, sans déclenchement non autorisé |

### Scénario de démonstration D-01

- Usager : « Proche habilité », identité **entièrement fictive**.
- Objectif : préparer la demande relative à un décès et suivre les étapes administratives.
- Le système affiche un avertissement de compétence : un signalement dans Passoria n'est **pas** une déclaration officielle.
- L'usager joint des documents d'essai puis reçoit un résultat de précontrôle « dossier incomplet : justificatif à vérifier ».
- L'usager corrige ; l'agent de démonstration accuse réception et passe « En instruction (simulation) ».
- L'usager suit « Complément demandé » puis « Étape terminée (simulation) ».
- L'écran suivant donne une checklist indicative de formalités postérieures sans transfert automatique à des tiers.

**Cas à tester :** pièce illisible ; représentant non habilité ; nom divergent ; usager sans Internet ; interruption de session ; suppression d'un document ; doublon d'une demande.

## 3. Parcours AS-IS / TO-BE : naissance

### Scénario de démonstration N-01

1. Parent ou agent habilité ouvre « Enregistrer une naissance ».
2. Passoria indique les éléments attendus ; il ne prétend pas remplacer le système officiel de déclaration.
3. Les informations fictives sont saisies ; une règle détecte par exemple une date de naissance incohérente avec la date de déclaration.
4. L'usager rectifie la saisie ou explique la discordance.
5. Le dossier reçoit un identifiant **de démonstration** et une fiche récapitulative à présenter au service compétent.
6. Une notification simulée indique la prochaine étape, puis la disponibilité d'un document fictif.

**Point juridique à valider :** le délai réglementaire, les autorités responsables et les règles relatives aux déclarations en maternité, en mairie et à l'étranger varient selon la situation. Le système doit distinguer ces cas à partir de sources officielles [B03].

## 4. Parcours accès universel

| Canal | Fonctions minimales | Restrictions |
|---|---|---|
| Navigateur/PWA | Préparer dossier, documents, historique, notifications | Authentification renforcée pour données sensibles |
| SMS | Informations publiques, rappel générique, consultation statut peu sensible | Pas de détails médicaux ou documents d'identité en SMS |
| USSD | Arbre d'orientation, référence, prochaine étape générique | Contrôle de session et confidentialité limités |
| Guichet assisté | Agent aide à renseigner la demande au nom de l'usager | Mandat, preuve d'accord, rôles et journalisation |

## 5. Mesure avant/après : protocole reproductible

**Échantillon initial proposé :** 5 à 10 entretiens exploratoires par scénario, puis échantillon élargi à définir avec une administration partenaire. L'échantillon exploratoire ne permet pas d'inférer des résultats nationaux.

- Relever le nombre de démarches / visites réellement exigées, et le temps passé par cas.
- Observer la préparation du même dossier avec consignes habituelles puis avec Passoria sur des cas fictifs comparables.
- Mesurer temps d'orientation, complétude, erreurs, compréhension et satisfaction.
- En pilote officiel, comparer les flux et délais réels avant/après sur des groupes raisonnablement équivalents.
- Noter systématiquement les exceptions et abandons ; ne pas retenir uniquement les cas réussis.

| KPI | Formule | Source | Fréquence |
|---|---|---|---|
| Complétude initiale | Dossiers complets / dossiers commencés | Journal de précontrôle | Hebdomadaire |
| Taux de correction | Anomalies résolues / anomalies signalées | Historique dossier | Hebdomadaire |
| Faux positifs de contrôle | Alertes infondées / alertes examinées | Revue agent | Hebdomadaire |
| Temps de constitution | Médiane minutes début-fin | Instrumentation consentie | Hebdomadaire |
| Déplacements évités | Visites avant - visites après | Entretiens + traces de guichet | Mensuelle |
| Abandon du parcours | Dossiers abandonnés / commencés | Analytics respectueux de la vie privée | Mensuelle |
| Accessibilité | Parcours réussis par canal/handicap | Tests utilisateurs | Trimestrielle |

## 6. Questions d'entretien — usagers et agents

**Usagers :** Quelle démarche avez-vous réellement effectuée ? Quel service ? Combien de visites ? Quelles pièces non prévues ? À quelle étape avez-vous dû demander de l'aide ? Comment avez-vous connu le statut ? Quel a été le coût des déplacements ?

**Agents :** À quelles étapes des dossiers sont-ils fréquemment incomplets ? Quelles pièces peuvent être récupérées légalement ? Quel statut peut être communiqué ? Quelles exceptions requièrent un arbitrage humain ? Quel système existant fait autorité ?

## 7. Résultats non encore établis

Aucun chiffre de gain, aucune intégration partenaire et aucune preuve d'amélioration sur données réelles n'est revendiqué à la date du 22 octobre 2026. Les objectifs indiqués dans le dossier principal sont des hypothèses destinées à être éprouvées en pilote.

**Sources :** [B01] [B02] [B03] [F02].
