/* Basé sur Math3AM (© 2026, son auteur), réutilisé avec son autorisation. */
/* عامل الخدمة: يحفظ التطبيق في الجهاز ليعمل دون اتصال.
   عند نشر نسخة جديدة: استبدل index.html ثمّ غيّر قيمة V أدناه.
   Service worker : garde l'application sur l'appareil. À chaque nouvelle version, changer V. */
const V='mathbac-2026-10-27b';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(FILES.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
/* نُرجع النسخة المحفوظة فورا، ونحدّثها في الخلفية إن وُجد اتصال. */
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url); if(url.origin!==self.location.origin) return;
  e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request,{cache:'no-cache'}).then(res=>{ if(res&&res.ok) c.put(e.request,res.clone()); return res; }).catch(()=>hit||c.match('./index.html'));
    return hit||net;
  })));
});
