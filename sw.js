const CACHE='nexto-site-v3';
const PRECACHE=['./','./index.html','./css/styles.css','./js/main.js','./assets/nexto-simbolo.png','./assets/nexto-logo-clara.png','./assets/icon-192.png','./assets/icon-512.png','./offline.html','./imgs/medium_AF_DIGITAL_2024_maio_catalogo_hospitality_FOOD_SERVICE_MI_001_d0ae84a3a0.jpg','./imgs/medium_AF_DIGITAL_2024_maio_Livro_Catalogo_FURNITURE_001_edd5e7db1a.jpg','./imgs/medium_Equipment_712d66e584.jpg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 // Do not cache large PDFs automatically: retain browser quota for the site.
 if(new URL(event.request.url).pathname.toLowerCase().endsWith('.pdf'))return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return response;}).catch(async()=>(await caches.match(event.request))||(await caches.match('./index.html'))||(await caches.match('./offline.html'))));return;
 }
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;})));
});
