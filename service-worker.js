const CACHE_NAME = "private-vault-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./vault.html",
    "./style.css",
    "./manifest.json",

    "./css/vault.css",

    "./script.js",

    "./js/database.js",
    "./js/photos.js",
    "./js/vault.js",
    "./js/recycle.js"
];

// Install
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});

// Fetch
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request).then(response => {

            return response || fetch(event.request);

        })

    );

});
