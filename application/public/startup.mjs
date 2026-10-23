import {brandMark} from './brand.mjs';
const introDuration=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches?100:1600;
let introTimer;
export function replayIntro(){
 clearTimeout(introTimer);
 document.querySelector('#splash-screen')?.remove();
 const splash=document.createElement('div');splash.id='splash-screen';splash.className='splash-screen';splash.setAttribute('role','status');splash.setAttribute('aria-label','Ouverture de Passoria');
 splash.innerHTML=`<div class="splash-symbol">${brandMark()}</div><strong>Passoria</strong><span>Toutes vos démarches, un seul espace.</span>`;
 document.body.append(splash);introTimer=setTimeout(()=>splash.remove(),introDuration());
}
introTimer=setTimeout(()=>document.querySelector('#splash-screen')?.remove(),introDuration());
