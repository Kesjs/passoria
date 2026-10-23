const CACHE = 'passoria-v9-lucide-services';
const ASSETS = ['/', '/index.html', '/styles.css', '/auth-brand.css', '/app.js', '/core.mjs', '/storage.mjs', '/brand.mjs', '/startup.mjs', '/auth-core.mjs', '/auth-ui.mjs', '/auth-config.json', '/vendor/auth/dependencies.mjs', '/logo.svg', '/icon.svg', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/maskable-512.png', '/icons/apple-touch-icon.png', '/manifest.webmanifest', '/vendor/lucide/icons.mjs', '/vendor/lucide/createElement.mjs', '/vendor/lucide/defaultAttributes.mjs'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('passoria-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  // Ne conserver ni les codes OAuth ni une URL de rappel avec paramètres.
  if (new URL(event.request.url).search) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && ASSETS.includes(new URL(event.request.url).pathname)) {
      const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy)));
    }
    return response;
  }).catch(async () => (await caches.match(event.request)) || new Response('Ressource indisponible hors connexion', {status:503})));
});

