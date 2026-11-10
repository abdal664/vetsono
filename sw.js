const CACHE_NAME = "vetsono-v1";
const FILES = [
  "/vetsono/",
  "/vetsono/index.html",
  "/vetsono/manifest.webmanifest",
  "/vetsono/icon-192.png",
  "/vetsono/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
