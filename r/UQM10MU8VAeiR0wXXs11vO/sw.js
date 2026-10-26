// Service worker of the encrypted web reader (filled in by publish_web.py). Scope: its own folder only.
// Caches the shell and every encrypted file on install, then serves from the cache first, so the reader works offline.
// A new build has a new VERSION, so the browser installs it on the next visit and drops the old cache.
const VERSION = 'cb0bdc15d9b1c3bf';
const PREFIX = 'reader:' + self.registration.scope + ':';
const CACHE = PREFIX + VERSION;

self.addEventListener('install', e => e.waitUntil((async () => {
  const man = await (await fetch('manifest.json', {cache: 'reload'})).json();
  if (man.version !== VERSION) throw new Error('manifest and sw.js are from different builds');  // half-deployed; retry next visit
  const cache = await caches.open(CACHE);
  await cache.addAll([...man.shell, ...man.bin.map(f => 'd/' + f)].map(u => new Request(u, {cache: 'reload'})));
  await self.skipWaiting();
})()));

self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith(PREFIX) && k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(c => c.match(e.request, {ignoreSearch: true})).then(r => r || fetch(e.request)));
});
