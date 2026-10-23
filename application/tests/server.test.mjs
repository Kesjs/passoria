import {test} from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {makeServer} from '../server.mjs';
test('le serveur livre les ressources et interdit les écritures HTTP',async()=>{
 const server=makeServer();server.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}`;
 try{
  for(const file of ['/', '/app.js','/styles.css','/core.mjs','/storage.mjs','/sw.js','/manifest.webmanifest','/icon.svg','/vendor/lucide/icons.mjs','/vendor/lucide/createElement.mjs','/vendor/lucide/defaultAttributes.mjs','/auth-config.json','/auth-ui.mjs','/auth-core.mjs','/auth-brand.css','/brand.mjs','/startup.mjs','/vendor/auth/dependencies.mjs','/logo.svg','/icons/icon-192.png','/icons/icon-512.png','/icons/maskable-512.png','/icons/apple-touch-icon.png','/brand-preview.html','/logo-intro.gif']){const r=await fetch(base+file);assert.equal(r.status,200,file);assert.ok((await r.arrayBuffer()).byteLength>10);assert.equal(r.headers.get('x-content-type-options'),'nosniff');}
  assert.equal((await fetch(base+'/icons/icon-192.png')).headers.get('content-type'),'image/png');
  const config=await(await fetch(base+'/auth-config.json')).json();assert.equal(config.phoneEnabled,false);assert.equal(config.googleEnabled,false);assert.equal(config.publishableKey,'');
  assert.equal((await fetch(base+'/absent')).status,404);
  assert.equal((await fetch(base+'/',{method:'POST'})).status,405);
  assert.equal((await fetch(base+'/%2e%2e%2fpackage.json')).status,403);
 }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});
