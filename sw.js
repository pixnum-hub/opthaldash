/**
 * OphthalDash Service Worker
 * Cache-first strategy for offline use
 * © Manik Roy 2026
 */

const CACHE_NAME = 'ophthaldash-v3';
const STATIC_ASSETS = [
  './OphthalDash_v3.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  // CDN assets cached on first fetch
];

const CDN_CACHE = 'ophthaldash-cdn-v3';
const CDN_ORIGINS = [
  'cdn.jsdelivr.net',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// ── INSTALL ──────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ─────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CDN_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH ─────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isCDN = CDN_ORIGINS.some(o => url.hostname.includes(o));

  if (isCDN) {
    // CDN: cache-first, fallback to network
    event.respondWith(
      caches.open(CDN_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  // App shell: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      }).catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('./OphthalDash_v3.html');
        }
      });
    })
  );
});
