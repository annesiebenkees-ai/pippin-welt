/* Offline-Speicher für Pippins erste Schritte. Version hochzählen, wenn sich Dateien ändern. */
const VERSION = 'erste-schritte-v4';
const DATEIEN = [
  './', 'index.html', 'app.js', 'inhalt.js', 'manifest.webmanifest',
  'fonts/fredoka.woff2', 'fonts/nunito.woff2',
  'img/logo.png', 'img/logo-nacht.png', 'img/face.png', 'img/morgenmaus.png', 'img/nestmaus.png', 'img/nachtmaus.png', 'img/mutmaus.png', 'img/entdeckermaus.png',
  'icons/icon-192.png', 'icons/icon-512.png'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((n) => n !== VERSION).map((n) => caches.delete(n)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // Erst das Netz (damit Updates ankommen), ohne Netz aus dem Speicher
  e.respondWith(
    fetch(e.request).then((r) => { const kopie = r.clone(); caches.open(VERSION).then((c) => c.put(e.request, kopie)); return r; })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('index.html')))
  );
});
