async function enableNavigationPreload(){
if(self.registration.navigationPreload){await self.registration.navigationPreload.enable()}
}
async function cacheHCVCore(){
const core=[
"./",
"./index",
"./index.php",
"./style.css",
"./script.js"
]
const coreCache=await caches.open("core");
await coreCache.addAll(core);
}
async function cacheCheck(req,pre,fall){
const cacheResp=await caches.match(req);
if(cacheResp){return cacheResp}
const preResp=await pre;
if(preResp){
toCache(req,preResp.clone());
return preResp;
}
try{
const netResp=await fetch(req);
toCache(req,netResp.clone())
return netResp;
} catch(e){
const fallResp=await caches.match(fall);
if(fallResp){return fallResp}
return new Response('Network error "Not Found"',{status:404,headers:{"Content-Type":"text/plain"}})
}
}
async function toCache(req,resp){
const des=await req.destination;
if(des=="image"){
const imgCache=await caches.open("image");
await imgCache.put(req,resp);
}else if(des=="document"||des=="style"||des=="script"){
const altcoreCache=await caches.open("altcore");
await altcoreCache.put(req,resp);
}else{
const otherCache=await caches.open("other");
await otherCache.put(req,resp);
}
}
async function fromMessage(e){
const choice=e.data.choice;
if(choice=="deletecore"){
if(await caches.delete("altcore")){toMessage('Deleted altcore cache',e.source.id)}
if(await caches.delete("core")){
toMessage('Deleted core cache',e.source.id);
cacheHCVCore();
toMessage('Reload core cache',e.source.id);
}
}
else if(choice=="deleteother"){
if(await caches.delete("other")){toMessage('Deleted other cache',e.source.id)}
}
else if(choice=="deleteimage"){
if(await caches.delete("image")){toMessage('Deleted image cache',e.source.id)}
}
}
async function toMessage(msg,cid){
const c=await clients.get(cid);
if(!!c){c.postMessage({msg:msg})}
}


self.addEventListener("install",function(e){e.waitUntil(cacheHCVCore())})
self.addEventListener("activate",function(e){
e.waitUntil(self.registration?.navigationPreload.enable());
e.waitUntil(clients.claim());
})
self.addEventListener("fetch",function(e){e.respondWith(cacheCheck(e.request,e.preloadResponse,'./'))})
self.addEventListener('message',function(e){fromMessage(e)})