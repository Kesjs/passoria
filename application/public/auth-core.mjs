import {parsePhoneNumberFromString} from './vendor/auth/dependencies.mjs';

export function normalizePhone(value,country='BJ') {
  const raw=String(value||'').trim();
  if(!raw || raw.length>40 || !/^[+\d\s().-]+$/.test(raw))throw Error('Renseignez un numéro de téléphone valide.');
  const parsed=parsePhoneNumberFromString(raw,country);
  if(!parsed?.isValid())throw Error('Vérifiez le numéro et l’indicatif du pays.');
  return parsed.number;
}
export function validateConfig(config) {
  if(!config || typeof config!=='object')throw Error('Configuration d’authentification invalide.');
  const url=String(config.supabaseUrl||'');const key=String(config.publishableKey||'');
  if(Boolean(url)!==Boolean(key))throw Error('Renseignez l’URL Supabase et la clé publique ensemble.');
  if(url){const u=new URL(url);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||u.pathname!=='/')throw Error('L’URL Supabase doit être une origine HTTPS.');
    // Seules les nouvelles clés publiques sont acceptées pour éviter une clé secrète par erreur.
    if(!/^sb_publishable_[a-zA-Z0-9_-]+$/.test(key))throw Error('Utilisez une clé Supabase publishable, jamais une clé secrète.');}
  return {supabaseUrl:url,publishableKey:key,googleEnabled:config.googleEnabled===true,phoneEnabled:config.phoneEnabled===true,allowDemo:config.allowDemo===true,ready:Boolean(url&&key)};
}
export function identityFor(user){
  if(!user || !/^[a-f0-9-]{36}$/i.test(user.id||''))throw Error('Session invalide. Reconnectez-vous.');
  return {id:user.id,isDemo:false,name:String(user.user_metadata?.full_name||user.user_metadata?.name||'Mon espace').slice(0,100),contact:String(user.phone||user.email||'')};
}
export function makeAuthController({client,clock=()=>Date.now(),cooldownMs=60000}){
  let pending=null,sending=false;
  return {
    get pending(){return pending;},
    get resendIn(){return pending?Math.max(0,Math.ceil((pending.retryAt-clock())/1000)):0;},
    async send({phone,country,signup=false,captchaToken}){
      if(!client)throw Error('L’envoi SMS attend la configuration du service de connexion.');
      if(sending)throw Error('Une demande de code est déjà en cours.');
      const number=normalizePhone(phone,country);
      if(pending && clock()<pending.retryAt)throw Error('Patientez avant de demander un nouveau code.');
      sending=true;
      try{const {error}=await client.auth.signInWithOtp({phone:number,options:{shouldCreateUser:signup,...(captchaToken?{captchaToken}:{})}});if(error)throw error;pending={phone:number,signup,retryAt:clock()+cooldownMs};return pending;}
      finally{sending=false;}
    },
    async verify(token){
      if(!pending)throw Error('Demandez d’abord un code SMS.');
      if(!/^\d{6,8}$/.test(String(token)))throw Error('Saisissez le code numérique reçu par SMS.');
      const {data,error}=await client.auth.verifyOtp({phone:pending.phone,token:String(token),type:'sms'});
      if(error)throw error;if(!data?.session||!data?.user)throw Error('La vérification n’a pas ouvert de session.');
      const {data:verified,error:verificationError}=await client.auth.getUser();
      if(verificationError)throw verificationError;
      const identity=identityFor(verified.user);pending=null;return identity;
    },
    async google(redirectTo){if(!client)throw Error('Google attend la configuration du service de connexion.');const {error}=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo}});if(error)throw error;},
    async restore(){if(!client)return null;const {data,error}=await client.auth.getSession();if(error)throw error;if(!data.session)return null;const {data:verified,error:verificationError}=await client.auth.getUser();if(verificationError)throw verificationError;return identityFor(verified.user);},
    async signOut(){if(client){const {error}=await client.auth.signOut({scope:'local'});if(error)throw error;}pending=null;}
  };
}
