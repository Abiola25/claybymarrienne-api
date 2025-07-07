const CACHE_NAME = "cbm-v1";

// 🔐 Assets to Cache
const assetsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/offline.html",
  "/assets/logo.png"
];

// 🧱 Install Event – Cache Core Files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting(); // Activate instantly
});

// 🔄 Activate Event – Cleanup Old Caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// 📡 Fetch Event – Serve Cached or Offline Page
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match("/offline.html");
      });
    })
  );
});
