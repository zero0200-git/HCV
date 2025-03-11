async function enableNavigationPreload(){
if(self.registration.navigationPreload){await self.registration.navigationPreload.enable()}
}
async function cacheHCVCore(){
const core=[
"./",
"./index",
"./index.php",
"./style.css",
"./script.js",
"./manifest.json",
"./icons/favicon.png",
"./icons/favicon-16x16.png",
"./icons/favicon-32x32.png",
"./icons/favicon-64x64.png",
"./icons/favicon-128x128.png",
"./icons/favicon-180x180.png",
"./icons/favicon-256x256.png",
"./icons/favicon-512x512.png"
]
const coreCache=await caches.open("core");
await coreCache.addAll(core);
}
async function cacheCheck(req,pre,fall,online=settings.onlineFirst){
if(online){
try{
const netResp=await fetch(req);
if(netResp && netResp.ok){

toCache(req,netResp.clone());
return netResp;
}
else{throw new Error("Network error")}
} catch(e){
return await cacheCheck(req,pre,fall,false);
}
}else{
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
if(await caches.delete("altcore")){toMessage({msg:'Deleted altcore cache'},e.source.id)}
if(await caches.delete("core")){
toMessage({msg:'Deleted core cache'},e.source.id);
cacheHCVCore();
toMessage({msg:'Reload core cache'},e.source.id);
}
}
else if(choice=="deleteother"){
if(await caches.delete("other")){toMessage({msg:'Deleted other cache'},e.source.id)}
}
else if(choice=="deleteimage"){
if(await caches.delete("image")){toMessage({msg:'Deleted image cache'},e.source.id)}
}
else if(choice=="deletespec"){
deleteSpec(e.data.msg.path,false,e.source.id)
}
else if(choice=="preloadimage"){
imgCaching(e.data.msg.path,e.data.msg.incl,e.data.msg.block,e.source.id)
}
else if(choice=="settings"){
if(e.data.msg!=null&&typeof e.data.msg=="object"){settings=e.data.msg}
}
}
async function toMessage(msg={msg:""},cid){
const c=await clients.get(cid);
if(!!c){c.postMessage(msg)}
}
async function imgCaching(pathArray=[],includeWord,blockWord,cid){
let otherCache=await caches.open("other");
let imgCache=await caches.open("image");
let req;
try{
req=await fetch("request?type=main");
if(!req.ok){
req=await fetch("request.php?type=main")
if(!req.ok){throw new Error("Network error")
}else{req="request.php?type=specific&p="}
}else{req="request?type=specific&p="}
}catch(err){
console.error("Fetch error:",err);
toMessage({msg:"Preload folder image error \"cannot reach server\""},cid)
}
for(let i=0;i<pathArray.length;i++){
let path=pathArray[i];
try{
let request=new Request(req+encodeURIComponent(path)+"&i="+includeWord+"&b="+blockWord);
let resp=await fetch(request);
if(!resp.ok){throw new Error("Network error");}
let res=await resp.json();
await otherCache.add(request);

let imgList=res.picList;
let imgLength=imgList.length;
for(let i=0;i<imgLength;i++){
let imgPath=encodeURIComponent(res.path+imgList[i]).replace(/%2F/ig,"/");
let imgRequest=new Request(imgPath);
let imgResp=await fetch(request);
if(!imgResp.ok){throw new Error("Network error");}
await imgCache.add(imgRequest);
toMessage({msg:`Preload image complete (${i+1}/${imgLength}) ${path.substr(0,path.length-1).replace(/.*\//,"")}`},cid);
}
toMessage({msg:"Preload folder image complete "+path.substr(0,path.length-1).replace(/.*\//,"")},cid);
toMessage({func:"dlqManage",funcParam:["complete",path]},cid);
}catch(error){
console.error("Fetch error:",error);
toMessage({msg:"Preload folder image error "+path.substr(0,path.length-1).replace(/.*\//,"")},cid)
}
}
}
async function deleteSpec(pathArray=[],reload=false,cid){
let req=await caches.open("other");
let img=await caches.open("image");
let reqKeys=await req.keys();
let imgKeys=await img.keys();

try{
for(let i=0;i<pathArray.length;i++){
toMessage({msg:"Deleting data "+pathArray[i]},cid);
reqKeys.filter(function(r){return r.url.replace(/^.*[?&]p=([^&]+).*$/,"$1").indexOf(encodeURIComponent(pathArray[i]))>=0}).forEach(function(r){req.delete(r.url)})
imgKeys.filter(function(r){return r.url.replace(new RegExp(".*?"+pathArray[i]),"").indexOf("/")==-1}).forEach(function(r){img.delete(r.url)})
toMessage({msg:"Deleted data "+pathArray[i]},cid);
if(reload==true){toMessage({func:""},cid)}
}
}catch(error){
console.error("Cache delete error:",error);
toMessage({msg:"Cannot complately detele data "+path.substr(0,path.length-1).replace(/.*\//,"")},cid)
}
}


settings={}
self.addEventListener("install",function(e){
e.waitUntil(cacheHCVCore());
e.waitUntil(self.skipWaiting());
})
self.addEventListener("activate",function(e){
e.waitUntil(self.registration?.navigationPreload.enable());
e.waitUntil(self.clients.claim());
})
self.addEventListener("fetch",function(e){e.respondWith(cacheCheck(e.request,e.preloadResponse,'./'))})
self.addEventListener('message',function(e){fromMessage(e)})