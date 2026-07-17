/* Service worker for offline play WITHOUT going stale.
   Network-first for same-origin requests: online visitors always get the
   freshly deployed page, and the cache is only a fallback when offline.
   (The previous cache-first strategy pinned everyone to an old build.)
   Bump CACHE whenever this file changes so old caches are purged. */
const CACHE = 'spotkick-v3';
const ASSETS = [
  './', './index.html', './penalty.html',
  './manifest.webmanifest', './icon-192.png', './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Cross-origin (e.g. the three.js CDN) — let the browser handle it.
  if (new URL(req.url).origin !== location.origin) return;
  // Network-first: fetch fresh, refresh the cache, fall back to cache offline.
  e.respondWith(
    fetch(req).then(resp => {
      if (resp && resp.ok) {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      }
      return resp;
    }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
  );
});
