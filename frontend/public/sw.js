let cacheData = 'appV1';
this.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(cacheData).then(cache => {
      cache.addAll([
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/static/js/bundle.js',
        '/static/css/main.chunk.css',
        '/index.html',
        '/',
      ]);
    })
  );
});

this.addEventListener('fetch', ev => {
  ev.respondWith(
    caches.match(ev.request).then(resp => {
      if (resp) return resp;
    })
  );
});
