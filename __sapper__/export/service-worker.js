!function(){"use strict";const e=["client/index.3b8decd1.js","client/about.ac4aec3f.js","client/index.7cf3b97f.js","client/index.8f6d700e.js","client/[slug].b2e9b97f.js","client/[slug].c7a849c2.js","client/client.5c4a0642.js","client/index.44ffbe0e.js","client/client.933ae399.js"].concat(["service-worker-index.html","favicon.png","global.css","logo-192.png","logo-512.png","manifest.json","resume.pdf","successkid.jpg"]),t=new Set(e);self.addEventListener("install",t=>{t.waitUntil(caches.open("cache1590554374133").then(t=>t.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const t of e)"cache1590554374133"!==t&&await caches.delete(t);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const s=new URL(e.request.url);s.protocol.startsWith("http")&&(s.hostname===self.location.hostname&&s.port!==self.location.port||(s.host===self.location.host&&t.has(s.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1590554374133").then(async t=>{try{const s=await fetch(e.request);return t.put(e.request,s.clone()),s}catch(s){const c=await t.match(e.request);if(c)return c;throw s}}))))})}();