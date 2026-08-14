/* ==========================================================================
   Fire Up The Grill — Service Worker
   Caches the app shell so the menu keeps working offline once installed,
   and satisfies the "installable PWA" requirement on Chrome/Android.
   Bump CACHE_NAME whenever you deploy changes to force a cache refresh.
   ========================================================================== */
const CACHE_NAME = "fire-up-the-grill-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo.webp",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => {}) // don't block install if an optional asset 404s
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Cache-first for the app shell, network-first fallback for everything else
// (so menu prices/images can update without waiting for a new cache version).
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached); // offline: fall back to cache

      return cached || networkFetch;
    })
  );
});
