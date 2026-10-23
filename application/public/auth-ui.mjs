import {createClient,getCountries,getCountryCallingCode} from './vendor/auth/dependencies.mjs';
import {makeAuthController,validateConfig} from './auth-core.mjs';
import {brandLockup,brandMark} from './brand.mjs';
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const demoIdentity={id:'demo',isDemo:true,name:'Aïssatou Adé',contact:'Démonstration locale'};
export function createAuthUI({onIdentity,notify,renderApp}){
 let identity=null,controller,config,client,mode='connexion',country='BJ',phone='',error='',startupError='',busy=false,main;
 let interval;const names=new Intl.DisplayNames(['fr'],{type:'region'});
 const countries=getCountries().sort((a,b)=>a==='BJ'?-1:b==='BJ'?1:names.of(a).localeCompare(names.of(b),'fr'));
 function capturePhone(){const form=document.querySelector('#auth-phone-form');if(form){country=form.elements.country.value;phone=form.elements.phone.value;}}
 function statusError(e){const code=e.code||'';if(/^(Renseignez|Vérifiez le numéro|Saisissez le code|Patientez|Une demande de code|Demandez d’abord)/.test(e.message||''))return e.message;if(code.includes('rate_limit')||e.status===429)return 'Trop de demandes. Patientez avant de réessayer.';if(code.includes('otp_expired'))return 'Ce code est incorrect ou expiré. Vérifiez-le ou demandez un nouvel envoi.';if(/fetch|network/i.test(e.message))return 'Connexion au service impossible. Vérifiez votre connexion Internet.';return 'La connexion n’a pas abouti. Vérifiez vos informations et réessayez. Si le problème persiste, le service doit être vérifié.';}
 function flag(code){return String.fromCodePoint(...code.toUpperCase().split('').map(c=>127397+c.charCodeAt(0)));}
 const googleLogo='<svg class="google-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.45a5.51 5.51 0 0 1-2.39 3.61v3h3.87c2.27-2.09 3.56-5.17 3.56-8.64Z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.87-3c-1.07.72-2.43 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.09A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.27 14.3A7.2 7.2 0 0 1 4.9 12c0-.8.14-1.58.37-2.3V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.09Z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.36.61 4.61 1.81l3.45-3.45C17.95 1.12 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.09C6.22 6.86 8.87 4.75 12 4.75Z"/></svg>';
 function ready(kind){return config?.ready&&config[`${kind}Enabled`];}
 function onboarding(){return `<section class="auth-onboarding"><div class="onboarding-mark">${brandMark()}</div><p class="onboarding-eyebrow">Bienvenue dans votre espace</p><h1>Vos démarches, plus simples à chaque étape.</h1><p class="onboarding-intro">Passoria vous aide à préparer, suivre et retrouver vos démarches au même endroit.</p><div class="onboarding-benefits"><p><strong>Préparer sereinement</strong><span>Des étapes claires pour savoir quoi renseigner.</span></p><p><strong>Tout retrouver au même endroit</strong><span>Vos dossiers et documents restent accessibles.</span></p><p><strong>Garder le contrôle</strong><span>Vos informations restent enregistrées sur cet appareil.</span></p></div><button class="button primary onboarding-start" data-auth-action="onboarding-start">Commencer</button></section>`;}
 function draw(){
  if(!main)return;document.body.classList.add('auth-mode');
  const signup=mode==='inscription',otp=mode==='code';
  const available=ready('phone')||ready('google');
  main.innerHTML=`<section class="auth-page"><a href="#connexion" class="auth-brand" aria-label="Passoria, connexion">${brandLockup()}</a><div class="auth-card"><div class="auth-symbol">${brandMark()}</div><h1>${otp?'Vérifiez votre téléphone':signup?'Bienvenue sur Passoria':'Heureux de vous retrouver'}</h1><p class="auth-intro">${otp?`Saisissez le code envoyé au <strong>${escape(controller.pending?.phone||'')}</strong>.`:signup?'Créez votre espace pour préparer et suivre vos démarches.':'Connectez-vous pour retrouver votre espace.'}</p>${error||startupError?`<p class="auth-error" role="alert">${escape(error||startupError)}</p>`:''}
  ${otp?`<form id="auth-otp-form"><label class="field" for="otp-code">Code de vérification<input id="otp-code" name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6,8}" minlength="6" maxlength="8" required placeholder="······" class="otp-input" aria-describedby="otp-help"></label><small id="otp-help">Le code est personnel. Ne le communiquez à personne.</small><button type="submit" class="button primary auth-submit" ${busy?'disabled':''}>${busy?'Vérification…':'Vérifier et continuer'}</button></form><button class="text-button resend" data-auth-action="resend" ${controller.resendIn||busy?'disabled':''}>${controller.resendIn?`Renvoyer le code dans ${controller.resendIn} s`:'Renvoyer le code'}</button><button class="text-button" data-auth-action="change-phone">Modifier le numéro</button>`:
  `<div class="auth-tabs" aria-label="Compte"><a href="#connexion" class="${!signup?'selected':''}" ${!signup?'aria-current="page"':''}>Connexion</a><a href="#inscription" class="${signup?'selected':''}" ${signup?'aria-current="page"':''}>Inscription</a></div><form id="auth-phone-form">${signup?'<label class="field">Nom et prénoms (facultatif)<input name="name" autocomplete="name" maxlength="100" placeholder="Comment vous appeler ?"></label>':''}<label class="field" for="auth-country">Pays et indicatif<select id="auth-country" name="country" autocomplete="country">${countries.map(c=>`<option value="${c}" ${c===country?'selected':''}>${flag(c)} ${escape(names.of(c))} (+${getCountryCallingCode(c)})</option>`).join('')}</select></label><label class="field" for="auth-phone">Numéro de téléphone<input id="auth-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="01 97 12 34 56" value="${escape(phone)}" maxlength="40" required aria-describedby="phone-help"></label><small id="phone-help">Un code vous sera envoyé par SMS pour vérifier votre numéro.</small><button class="button primary auth-submit" type="submit" ${busy?'disabled':''}>${busy?'Envoi en cours…':'Recevoir mon code SMS'}</button></form><div class="auth-divider"><span>ou continuer avec</span></div><button class="button google-button" data-auth-action="google" ${busy?'disabled':''}>${googleLogo}Continuer avec Google</button><button class="text-button demo-entry" data-auth-action="demo">Continuer sans compte pour découvrir Passoria</button>`}
  <details class="auth-privacy"><summary>À propos de votre espace</summary><p>Le numéro est transmis au service d’authentification et au prestataire SMS uniquement lors d’une demande de code. Les dossiers de cette version restent fictifs et enregistrés sur l’appareil, sans synchronisation cloud. L’accès à un compte ne vaut pas vérification d’identité administrative.</p></details></div><p class="auth-footer">Toutes vos démarches, un seul espace.</p></section>`;
  document.title=`Passoria · ${otp?'Code SMS':signup?'Inscription':'Connexion'}`;
  clearInterval(interval);if(otp)interval=setInterval(()=>{const el=document.querySelector('.resend');if(!el)return;el.disabled=Boolean(controller.resendIn||busy);el.textContent=controller.resendIn?`Renvoyer le code dans ${controller.resendIn} s`:'Renvoyer le code';},1000);
 }
 async function enter(value){await onIdentity(value);identity=value;sessionStorage.removeItem('passoria-demo-active');if(value?.isDemo)sessionStorage.setItem('passoria-demo-active','1');clearInterval(interval);document.body.classList.toggle('auth-mode',!identity);if(identity){location.hash=localStorage.getItem('passoria-onboarding-seen')?'#accueil':'#onboarding';renderApp();}else{location.hash='#connexion';draw();}}
 async function send(){if(!ready('phone')){error='L’envoi de codes SMS sera disponible après activation du service de connexion.';draw();return;}capturePhone();busy=true;error='';const currentForm=document.querySelector('#auth-phone-form');const enteredName=currentForm?.elements.name?.value.trim();if(enteredName)sessionStorage.setItem('passoria-pending-name',enteredName);draw();try{await controller.send({phone,country,signup:mode==='inscription'});mode='code';location.hash='#code';}catch(e){error=statusError(e);}finally{busy=false;draw();}}
 async function signOut(){await controller.signOut();sessionStorage.removeItem('passoria-demo-active');await enter(null);}
 document.addEventListener('click',async e=>{
  const button=e.target.closest('[data-auth-action]');if(!button)return;e.preventDefault();e.stopImmediatePropagation();if(busy)return;
  const action=button.dataset.authAction;
  try{
   if(action==='onboarding-start'){localStorage.setItem('passoria-onboarding-seen','1');await enter(demoIdentity);return;}
   if(action==='demo'){await enter(demoIdentity);return;}
   if(action==='logout'){await signOut();return;}
   if(action==='change-phone'){mode='connexion';error='';location.hash='#connexion';draw();return;}
   if(action==='resend'){if(controller.resendIn)return;const p=controller.pending;await controller.send({phone:p.phone,country,signup:p.signup});error='';draw();notify('Un nouvel envoi de code a été demandé.');return;}
   if(action==='google'){capturePhone();if(!ready('google')){error='La connexion Google sera disponible après activation du service de connexion.';draw();return;}busy=true;draw();await controller.google(location.origin+'/');}
  }catch(e){error=statusError(e);notify(error,true);}finally{busy=false;if(!identity)draw();}
 },true);
 document.addEventListener('submit',async e=>{
  if(!['auth-phone-form','auth-otp-form'].includes(e.target.id))return;e.preventDefault();e.stopImmediatePropagation();if(busy)return;
  if(e.target.id==='auth-phone-form'){await send();return;}
  const token=e.target.elements.code.value;busy=true;error='';draw();try{const value=await controller.verify(token);const name=sessionStorage.getItem('passoria-pending-name');sessionStorage.removeItem('passoria-pending-name');if(name)value.name=name;await enter(value);notify('Vous êtes connecté.');}catch(e){error=statusError(e);}finally{busy=false;if(!identity)draw();}
 },true);
 return {
  get identity(){return identity;},
  async initialize(){
   try{
    const response=await fetch('/auth-config.json',{cache:'no-store',signal:AbortSignal.timeout(6000)});if(!response.ok)throw Error('Configuration indisponible');config=validateConfig(await response.json());
    if(config.ready)client=createClient(config.supabaseUrl,config.publishableKey,{auth:{flowType:'pkce',detectSessionInUrl:true,persistSession:true,autoRefreshToken:true,storageKey:'passoria-auth-v1'}});
   }catch(e){config={allowDemo:false,ready:false};startupError='Le service de connexion est indisponible. Rechargez avec Internet ou vérifiez la configuration.';}
   controller=makeAuthController({client});
   try{identity=await controller.restore();}catch{startupError='Votre session doit être vérifiée. Reconnectez-vous avec Internet.';}
   if(!identity&&config.allowDemo&&sessionStorage.getItem('passoria-demo-active')==='1')identity=demoIdentity;
   if(client)client.auth.onAuthStateChange((event)=>{if(event==='SIGNED_OUT')setTimeout(()=>{if(identity&&!identity.isDemo)enter(null).catch(()=>{});},0);});
   const url=new URL(location.href);if(url.searchParams.has('code')){url.searchParams.delete('code');history.replaceState(null,'',url.pathname+url.search+url.hash);}
   return identity;
  },
  render(target,route){main=target;if(identity){document.body.classList.remove('auth-mode');return false;}if(route==='onboarding'&&!localStorage.getItem('passoria-onboarding-seen')){document.body.classList.add('auth-mode');main.innerHTML=onboarding();return true;}if(!busy&&route!=='code')mode=route==='inscription'?'inscription':'connexion';if(route==='code'&&!controller.pending)mode='connexion';draw();return true;},
  accountPanel(){return `<section class="panel form-panel account-panel"><div class="account-brand">${brandMark()}<div><h2>${identity?.isDemo?'Mode démonstration':'Mon compte'}</h2><p>${escape(identity?.contact||'')}</p></div></div><button class="button secondary" data-auth-action="logout">${identity?.isDemo?'Quitter la démonstration':'Se déconnecter'}</button><button class="text-button" data-action="replay-intro">Revoir l’animation du logo</button></section>`;}
 };
}
