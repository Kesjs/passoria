# Livraison 0.2 : Le lien, ouverture animée et connexion

## Ce qui est intégré

- Adaptation vectorielle du concept 03 « Le lien » choisi sur la planche visuelle.
- Le même symbole dans l’en-tête, le favicon, les écrans de connexion, le profil et l’ouverture.
- Icônes PNG 192/512 px, icône maskable et Apple Touch Icon. Les icônes de l’interface restent celles de Lucide.
- Introduction SVG/CSS : les deux formes se rejoignent, le nom apparaît, puis l’écran se dévoile en environ 1,3 seconde. Elle ne bloque pas le chargement.
- Respect de `prefers-reduced-motion`, reprise sans animation au retour d’arrière-plan ; animation à chaque chargement complet et bouton de relecture dans le profil.
- Retours de boutons, transitions discrètes d’écrans et messages d’erreur.
- Pas de landing page. Ouverture sur connexion lors du premier lancement, puis accès direct à l’accueil existant après restauration d’une session ou entrée en démonstration.
- Écrans Connexion / Inscription Google ou téléphone, pays et indicatif, code SMS, modification du numéro, renvoi temporisé et déconnexion.
- Validation téléphonique par `libphonenumber-js`, SDK officiel `@supabase/supabase-js`, flux OAuth PKCE.

L’animation est dans l’application web après son premier affichage. L’écran de démarrage système éventuellement montré par iOS/Android reste contrôlé par le navigateur et n’est pas une animation native personnalisable depuis ce code.

## Voir l’animation

Après `npm run dev` depuis `application`, ouvrir `http://localhost:3000/brand-preview.html` pour la rejouer. L’aperçu partageable est `application/public/logo-intro.gif`. Le logo vectoriel est `application/public/logo.svg` ; la source commune des deux formes est `brand.mjs`.

Les modules et les images nécessaires sont déjà dans l’archive. Pour régénérer après modification :

```bash
npm install
npm run build:brand
npm run build:auth
npm run vendor:icons
```

## État de la connexion réelle

**L’archive n’est reliée à aucun projet Supabase et ne peut pas envoyer de SMS en l’état.** Les appels Google et OTP sont implémentés, mais ils nécessitent la configuration du projet et des fournisseurs. Aucun faux code ni faux succès de connexion n’est utilisé. Une démonstration locale distincte reste accessible sans compte.

Deux comptes Supabase sont disponibles dans l’environnement : « Supabase » et « kennedy ». Aucun n’a été sélectionné ou modifié sans connaître le compte et le projet destinés à Passoria. Aucun SMS payant n’a été envoyé et aucune clé secrète n’a été récupérée.

## Configuration nécessaire

1. Choisir le compte et le projet Supabase dédiés à Passoria.
2. Dans Google Cloud, configurer le fournisseur OAuth et ses domaines autorisés. Ajouter comme URI de redirection celle fournie par Supabase, de la forme `https://PROJECT.supabase.co/auth/v1/callback`.
3. Activer Google dans Supabase Auth et y enregistrer les identifiants OAuth. Le secret Google reste exclusivement dans le fournisseur, jamais dans l’archive ni dans le navigateur.
4. Activer le fournisseur Phone dans Supabase Auth et connecter un prestataire SMS. Valider couverture au Bénin, tarification, quotas, règles anti-abus et politique de codes. Le code prévu par l’écran est numérique de 6 à 8 chiffres.
5. Ajouter l’origine réelle de Passoria, terminée par `/`, dans les URL de retour autorisées de Supabase. Pour le développement, autoriser par exemple `http://localhost:3000/`.
6. Modifier `application/public/auth-config.json` :

```json
{
  "supabaseUrl": "https://PROJECT.supabase.co",
  "publishableKey": "sb_publishable_VOTRE_CLE_PUBLIQUE",
  "googleEnabled": true,
  "phoneEnabled": true,
  "allowDemo": true
}
```

Utiliser exclusivement la clé publique **publishable**. Les clés `service_role`, `sb_secret_…`, secrets Google et identifiants SMS ne doivent pas être exposés. Le serveur n’autorise en CSP que l’origine Supabase configurée. Il filtre la réponse publique du fichier de configuration pour ne pas exposer de champs supplémentaires ou une clé secrète placée par erreur.

Les boutons signalent un service à activer si la configuration manque. L’étape code n’est affichée qu’après succès de la demande OTP. Le contrôle de 60 secondes côté interface complète les limites du serveur ; il ne remplace pas la protection anti-abus du fournisseur. Une configuration CAPTCHA côté serveur nécessite aussi de brancher son widget dans l’interface avant activation : ce widget n’est pas inclus dans cette livraison.

## Données et limites

Une connexion réelle ne transforme pas les dossiers locaux en dossiers administratifs officiels. Les dossiers restent fictifs et enregistrés dans IndexedDB, sans synchronisation cloud. Les jeux de données sont séparés par identifiant de compte dans ce navigateur, et la démonstration retrouve son espace historique. Cette séparation d’interface n’est pas un contrôle d’accès de base de données et ne sécurise pas un appareil partagé contre son utilisateur.

Les métadonnées utilisateur servent uniquement à l’affichage du nom. Aucun rôle institutionnel ou droit serveur n’en est déduit. Le sélecteur agent reste explicitement une simulation locale. Une vraie habilitation agent, une base métier sécurisée et des politiques RLS restent à construire.

Les sessions réelles sont gérées par le SDK. Le code vérifie l’utilisateur auprès du service lors de la restauration et après l’OTP. Une restauration de session réelle demande Internet ; l’espace de démonstration peut fonctionner hors connexion après chargement complet. Les jetons et les rappels OAuth ne sont pas stockés par le service worker. La déconnexion ferme la session locale et retire le contenu actif de l’interface ; elle ne supprime pas les sauvegardes locales.

Google peut créer un compte lors de la première autorisation ; pour le téléphone, `shouldCreateUser` est vrai dans Inscription et faux dans Connexion. Les données locales d’un compte ne sont pas automatiquement fusionnées avec celles du mode démonstration.

## Vérification effectuée

Les tests de connexion utilisent un client simulé : numéro international, configuration, création de compte, temporisation, erreur d’envoi, code invalide, vérification utilisateur, OAuth et session révoquée. Le logo PNG a été inspecté comme image et le GIF possède plusieurs images. Aucun parcours Google réel, SMS réel ni essai visuel complet des pages dans un navigateur n’est attesté.

Références consultées :

- https://supabase.com/docs/guides/auth/social-sign-in/auth-google
- https://supabase.com/docs/guides/auth/phone-login
- https://supabase.com/docs/reference/javascript/auth-signinwithotp
- https://supabase.com/docs/reference/javascript/auth-verifyotp
- https://supabase.com/changelog.md
