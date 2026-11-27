self.addEventListener("install",function(e){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
self.addEventListener("push",function(e){
  var d={title:"LIVREUR 24/24",body:"Nouvelle offre",url:"./app.html"};
  try{d=Object.assign(d,e.data.json())}catch(x){}
  e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:"icon-192%20(2).png",badge:"icon-192%20(2).png",tag:d.tag,renotify:true,vibrate:[300,100,300,100,300],requireInteraction:true,data:{url:d.url}}));
});
self.addEventListener("notificationclick",function(e){
  e.notification.close();
  var u=new URL((e.notification.data&&e.notification.data.url)||"./app.html",self.registration.scope).href;
  e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(function(l){
    for(var i=0;i<l.length;i++){if(l[i].url.indexOf("app.html")>-1&&"focus" in l[i])return l[i].focus()}
    return clients.openWindow(u)}));
});
