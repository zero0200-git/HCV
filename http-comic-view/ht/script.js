function preloadImage(lo){
const i=document.createElement("img");
const url=lo.slice(lo.slice(0,lo.lastIndexOf("/")).lastIndexOf("/")+1);
const popid="_"+url.replace(/[^A-Za-z0-9]+/g,"");
const poptxt=decodeURIComponent(url).replace(/\//ig,"/<br>");
if(document.querySelector("."+popid)==null||document.querySelector("."+popid)==""){
const div=document.createElement("div");
div.classList.add(popid);
div.classList.add("loading");
div.innerHTML="Preloading: "+poptxt;
document.querySelector("#popWarpper").appendChild(div);
}
i.src=lo;
i.onload=function(){
if(document.querySelector("."+popid)!=null&&document.querySelector("."+popid)!=""){
document.querySelector("."+popid).innerHTML="Preloaded: "+poptxt;
document.querySelector("."+popid).classList.remove("loading");
document.querySelector("."+popid).classList.add("loaded");
setTimeout(function(){if(document.querySelector("."+popid+".loaded")!=null&&document.querySelector("."+popid+".loaded")!=""){document.querySelector("#popWarpper").removeChild(document.querySelector("."+popid+".loaded"))}},2000)}
}
i.onerror=function(){
if(document.querySelector("."+popid)!=null&&document.querySelector("."+popid)!=""){
document.querySelector("."+popid).innerHTML="Preload error: "+poptxt;
document.querySelector("."+popid).classList.remove("loading");
document.querySelector("."+popid).classList.add("error");
setTimeout(function(){if(document.querySelector("."+popid+".error")!=null&&document.querySelector("."+popid+".error")!=""){document.querySelector("#popWarpper").removeChild(document.querySelector("."+popid+".error"))}},2000)
}
}
}
function setImg(){
const ic=document.querySelector(".imgContainer");
let p=hcv.current.picList;
if(typeof p=="object"&&p!=""&&p!=null){
const ig=document.createElement("img");
ig.src=encodeURIComponent(hcv.current.path+p[curGet()-1]).replace(/%2F/ig,"/");

ig.onload=function(){
let url;
let winLoO=window.location.origin;
let winLoP=window.location.pathname;
let path=encodeURIComponent(hcv.current.path+p[curGet()-1]).replace(/%2F/ig,"/");
if(winLoP.charAt(winLoP.length-1)=="/"){url=winLoO+winLoP+path}
else{url=winLoO+winLoP+"/"+path}

if(ig.src==path||ig.src==url){
setImgSize(ig);
if(ic.hasChildNodes()){
for(let i=0;i<ic.childNodes.length;i++){ic.removeChild(ic.childNodes[i])}
}
ic.appendChild(ig);
document.querySelector("#currentDisplay").innerHTML=p[curGet()-1]+' ('+curGet()+')';
hcvCheck("read");
hcv.read[hcv.current.path]={};
hcv.read[hcv.current.path]["read"]=curGet();
hcv.read[hcv.current.path]["page"]=hcv.current.picList.length;
if(hcv.settings.lcReadSwitch==true){localStorage.setItem("read",JSON.stringify(hcv.read))};
}
}
}else{
if(ic.hasChildNodes()){
for(let i=0;i<ic.childNodes.length;i++){ic.removeChild(ic.childNodes[i])}
}
}
}
function curGet(){
let re;
let pu=parseInt(window.location.hash.replace("#",""));
let phr,php;
if(typeof hcv.read=="object"&&typeof hcv.read[hcv.current.path]=="object"){
phr=parseInt(hcv.read[hcv.current.path]["read"]);
php=parseInt(hcv.read[hcv.current.path]["page"]);
}

if(pu!=null&&pu<=hcv.current.picList.length&&pu!=""&&isNaN(pu)==false){re=pu}
else if(phr!=null&&phr<=hcv.current.picList.length&&php==hcv.current.picList.length&&phr!=""&&isNaN(phr)==false){re=phr}
else if(1<=hcv.current.picList.length){re=1}
else(re=0)
window.location.hash=re;
return re
}
function prev(){
let cur=curGet();
if(hcv.settings.pnSwitch==true&&typeof hcv.current.previousDir=="object"&&cur<=1){
history.pushState({path:hcv.current.previousDir.path,act:"prev"},"","?p="+encodeURIComponent(hcv.current.previousDir.path)+"&fc=true");
requestInfo("current",null,false,true);setFolderActive();
} else if(0==hcv.current.picList.length){
cur=hcv.current.picList.length;
history.pushState({path:hcv.current.path,page:cur,act:"prev"},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+cur);
hashPictureUpdate();
} else if(cur<=1){
cur=1
} else{
--cur;
history.pushState({path:hcv.current.path,page:cur},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+cur);
hashPictureUpdate();
}
if(document.querySelector(".imgContainer").style.height=="auto"){document.body.scrollTop=0;document.documentElement.scrollTop=0;}
}
function next(){
let cur=curGet();
if(hcv.settings.pnSwitch==true&&typeof hcv.current.nextDir=="object"&&cur>=hcv.current.picList.length){
history.pushState({path:hcv.current.nextDir.path,act:"next"},"","?p="+encodeURIComponent(hcv.current.nextDir.path)+"&fc=true");
requestInfo("current",null,false,true);setFolderActive();
} else if(cur>=hcv.current.picList.length){
cur=hcv.current.picList.length;
history.pushState({path:hcv.current.path,page:cur,act:"next"},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+cur);
hashPictureUpdate();
} else{
++cur;
history.pushState({path:hcv.current.path,page:cur},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+cur);
hashPictureUpdate();
}

if(document.querySelector(".imgContainer").style.height=="auto"){document.body.scrollTop=0;document.documentElement.scrollTop=0;}
}
function hashPictureUpdate(){
let cur=curGet();
curDisImg()
setImg()
if(cur<hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur]).replace(/%2F/ig,"/"))}
if(cur+1<hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur+1]).replace(/%2F/ig,"/"))}
if(cur+2<hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur+2]).replace(/%2F/ig,"/"))}
if(cur-2>0&&cur-2<=hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur-2]).replace(/%2F/ig,"/"))}
if(cur-3>0&&cur-3<=hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur-3]).replace(/%2F/ig,"/"))}
if(cur-4>0&&cur-4<=hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur-4]).replace(/%2F/ig,"/"))}
}

function requestInfo(type,query=null,first=false,folderReload=false){
const xhr=new XMLHttpRequest();
let async=true;
let request;
let retry=1;
if(type!=undefined&&type!=null&&type!=""){type=type.toLowerCase()}else{return}
if(first==true){async=false;}

if(type=="main"){request="type=main"}
else if(type=="all"){request="type=all"}
else if(type=="current"){
let url=window.location.search.slice(1).split("&");
let re={};
for(let i=0;i < url.length;i++){re[url[i].split("=")[0]]={};re[url[i].split("=")[0]]=url[i].split("=")[1];}
if(re["p"]==null||re["p"]==""){re["p"]=hcv.main}request="type=specific&p="+re["p"]}
else if(type=="specific"){request="type=specific&p="+encodeURIComponent(query)}
else{console.log("no input type \""+type+"\"");return}

xhr.onerror=function(){
xhr.abort();
console.log("retry: "+retry++)
xhr.open("POST","request.php",async);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send(request);
}
xhr.onreadystatechange=function(){
if((this.readyState==4&&(this.responseText==null||this.responseText==""))&&retry<4){
xhr.abort();
console.log("retry: "+retry++)
xhr.open("POST","request.php",async);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send(request);
} else if(this.readyState==4&&this.status==200&&(this.responseText!=null||this.responseText!="")){
hcvCheck()

if(type=="main"){hcv.main=JSON.parse(xhr.responseText);}
else if(type=="all"){hcv.all=JSON.parse(xhr.responseText);}
else if(type=="current"){
hcv.current=JSON.parse(xhr.responseText);
if(first==true){loadRead()}
let ic=document.querySelector(".imgContainer");
if(ic.hasChildNodes()){for(let i=0;i<ic.childNodes.length;i++){ic.removeChild(ic.childNodes[i])}}
}

if(folderReload==true&&(type=="all"||type=="current")){folderArrSplit();loadFolder();hashPictureUpdate();}
return JSON.parse(xhr.responseText);
}
}
xhr.open("POST","request",async);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send(request);
}

function curDisImg(){
if(0==hcv.current.picList.length){document.querySelector("#gotoOpen").innerHTML="0 / 0";document.querySelector("#currentDisplay").innerHTML="N/A"}
else{document.querySelector("#gotoOpen").innerHTML=document.querySelector("#gotoOpen").value=curGet()+" / "+hcv.current.picList.length;}
}
function curDisFolder(){
const curFolder=document.querySelector("#currentFolder");
if(typeof hcv.settings.curPathSwitch==true){curFolder.innerHTML=hcv.current.path;}
else{curFolder.innerHTML=hcv.current.name;}
}
function folderArrSplit(){
let arr;
let out=[];
if(hcv.settings.displayAllSwitch==true&&hcv.settings.imgFirstSwitch==true&&typeof hcv.all=="object"){arr=hcv.all.dirValid.concat(hcv.all.dirNotValid);}
else if(hcv.settings.displayAllSwitch==true&&hcv.settings.imgFirstSwitch!=true&&typeof hcv.all=="object"){arr=hcv.all.dirList;}
else if(hcv.settings.displayAllSwitch!=true&&hcv.settings.imgFirstSwitch==true&&typeof hcv.current=="object"){arr=hcv.current.dirValid.concat(hcv.current.dirNotValid);}
else if(hcv.settings.displayAllSwitch!=true&&hcv.settings.imgFirstSwitch!=true&&typeof hcv.current=="object"){arr=hcv.current.dirList;}
else{return ;}

if(parseInt(hcv.settings.dirLimit)>0){
let p;
let size=parseInt(hcv.settings.dirLimit);

if((arr.length/size)/Math.floor(arr.length/size)>1){p=Math.floor(arr.length/size)+1}
else{p=Math.floor(arr.length/size)}

for(let i=0;i<p;i++){
if(i==p){out[i]=arr.slice(size*i)}
else{out[i]=arr.slice(size*i,size*(i+1))}
}
} else{
out[0]=arr;
}
if(hcv.settings.displayAllSwitch==true){hcv.all.sorted=out;}
else{hcv.current.sorted=out;}
hcv.dirPage=0;
}
function loadFolder(){
curDisFolder();
let lo,dir,read;
let subCon=document.querySelector("#folderListWarpper .containerSubHead");
document.querySelector("#folderListContainer").innerHTML="";
if(hcv.settings.displayAllSwitch==true){lo=hcv.all;}else{lo=hcv.current;}
subCon.innerHTML="";

if(lo.sorted.length>1){
const pgtx=document.createElement("div");
pgtx.innerHTML="Page: ";
subCon.appendChild(pgtx);
for(let i=0;i<lo.sorted.length;i++){
const pageEl=document.createElement("button");
pageEl.innerHTML=i+1;
pageEl.classList.add("button");
if(i==hcv.dirPage){pageEl.classList.add("select");}
else{pageEl.addEventListener("click",function(){hcv.dirPage=i;loadFolder();})}
subCon.appendChild(pageEl);
}
dir=lo.sorted[hcv.dirPage];
}else if(lo.sorted.length=1){
hcv.dirPage=0;
dir=lo.sorted[0];
}

if(dir!=null&&dir!=""){
for(let i=0;i<dir.length;i++){
if(typeof hcv.read=="object"&&typeof hcv.read[dir[i].path]=="object"&&typeof hcv.read[dir[i].path]["read"]=="number"){read=hcv.read[dir[i].path]["read"];}else{read=0;}
loadFolderDiv(dir[i].name,dir[i].path,encodeURIComponent(dir[i].path),dir[i].pic,dir[i].subDir,dir[i].picNum,read)
}
setFolderActive();
}
}
function loadFolderDiv(text,path,encPath,imageUrl,subDirNum,picNum,picRead){
let query=window.location.search.slice(1).split("&");
let re={};
for(let i=0;i<query.length;i++){
re[query[i].split("=")[0]]={};
re[query[i].split("=")[0]]=query[i].split("=")[1];
}
const a=document.createElement("a");
const name=document.createElement("div");
const cover=document.createElement("img");
const spcon=document.createElement("div");
const spf=document.createElement("div");
const spp=document.createElement("div");
const spr=document.createElement("div");
name.dataset.nodeType="name";
cover.dataset.nodeType="cover";
spcon.dataset.nodeType="info";
spf.dataset.nodeType="folder";
spp.dataset.nodeType="image";
spr.dataset.nodeType="read";

if(hcv.settings.displayAllSwitch==false){name.innerHTML=text;a.title=text;}else{name.innerHTML=path;a.title=path;}
a.classList.add("folderListNode");
a.href=window.location.origin+window.location.pathname+"?p="+encPath+"&fc=true";
a.addEventListener("click",function(e){e.preventDefault();
if(encPath!=re["p"]){history.pushState({path:hcv.current.path,act:"load"},"","?p="+encPath+"&fc=true");requestInfo("current",null,false,true);setFolderActive();}}
);
if(imageUrl!=="notvalid"&&hcv.settings.imgFolderSwitch==true){
cover.src=encodeURIComponent(path+imageUrl).replace(/%2F/ig,"/");a.appendChild(cover);}
spf.innerHTML=subDirNum;
spp.innerHTML=picNum;
spr.innerHTML=picRead;
spcon.appendChild(spf);
spcon.appendChild(spp);
spcon.appendChild(spr);
a.appendChild(name);
a.appendChild(spcon);
document.querySelector("#folderListContainer").appendChild(a);
}
function setFolderActive(){
let query=window.location.search.slice(1).split("&");
let re={};
for(let i=0;i<query.length;i++){
re[query[i].split("=")[0]]={};
re[query[i].split("=")[0]]=query[i].split("=")[1];
}
if(re["p"]==null||re["p"]==""||re["p"]==NaN){re["p"]=decodeURIComponent(hcv.main);}
for(let i=0;i<document.querySelectorAll(".folderListNode").length;i++){
if(document.querySelectorAll(".folderListNode")[i].title==re["p"]){
for(let i=0;i<document.querySelectorAll(".folderListNode.folderListNodeActive").length;i++){
document.querySelectorAll(".folderListNode.folderListNodeActive")[i].classList.remove("folderListNodeActive");
}
document.querySelectorAll(".folderListNode")[i].classList.add("folderListNodeActive");
}
}
}
function checkFullScreen(){
const pg=window.document;
let full;
if(pg.fullscreenElement !=null || pg.mozFullScreenElement !=null || pg.webkitFullscreenElement !=null || pg.msFullscreenElement !=null){full=true;}else{full=false}
document.querySelector("[data-settings-name='fullscreenSwitch'] input").checked=full;hcv.settings.fullscreenSwitch=full;
}
function changeFullScreen(){
const requestFullScreen=window.document.documentElement.requestFullscreen || window.document.documentElement.mozRequestFullScreen || window.document.documentElement.webkitRequestFullScreen || window.document.documentElement.msRequestFullscreen;
const exitFullScreen=window.document.exitFullscreen || window.document.mozCancelFullScreen || window.document.webkitExitFullscreen || window.document.msExitFullscreen;
if(typeof hcv.settings.fullscreenSwitch=="boolean"&&hcv.settings.fullscreenSwitch==true){
requestFullScreen.call(window.document.documentElement);
} else if(window.document.fullscreenElement!=null){
exitFullScreen.call(window.document);
}
}
function changeLR(){
const l=document.querySelector("#imgWarpper>.L.nc");
const r=document.querySelector("#imgWarpper>.R.nc");
if(typeof hcv.settings.lrSwitch=="boolean"&&hcv.settings.lrSwitch==true){l.style.display="";r.style.display="";}
else{l.style.display="none";r.style.display="none";}
}
function changeLRInv(){
const l=document.querySelector("#imgWarpper>.L.nc");
const r=document.querySelector("#imgWarpper>.R.nc");
if(typeof hcv.settings.lrInvSwitch=="boolean"&&hcv.settings.lrInvSwitch==true){
l.removeEventListener("click",prev);l.addEventListener("click",next);
r.removeEventListener("click",next);r.addEventListener("click",prev);
}
else{
l.removeEventListener("click",next);l.addEventListener("click",prev);
r.removeEventListener("click",prev);r.addEventListener("click",next);
}
}
function changeCurDis(va=null){
const curDisplayP=document.querySelector("#currentDisplayP");
if(typeof hcv.settings.curDisSwitch=="boolean"&&hcv.settings.curDisSwitch==true){curDisplayP.style.display="";}
else{curDisplayP.style.display="none";}
}
function changeUZ(){
if(typeof hcv.settings.uzSwitch=="boolean"&&hcv.settings.uzSwitch==true){
document.getElementsByName("viewport")[0].content="width=device-width,initial-scale=1.0,maximum-scale=30.0,minimum-scale=1.0,user-scalable=yes";
}else{
document.getElementsByName("viewport")[0].content="width=device-width,initial-scale=1.0,maximum-scale=3.0,minimum-scale=1.0,user-scalable=yes";
}
}
function buttonValueFiller(){
const bt=document.querySelectorAll("button");
for(let i=0;i < bt.length;i++){
if(bt[i].value==""){
bt[i].value=bt[i].textContent;
}
}
}
function changeImgSize(e){
const con=document.querySelector(".imgContainer");
if(e=="w"){
con.style.height="auto";
con.dataset.imgSize="width";
setImgSize();
}else if(e=="h"){
con.style.height="";
con.dataset.imgSize="height";
setImgSize();
} else{
if (isNaN(parseFloat(e))==false&&parseFloat(e)>0&&(parseFloat(e)<100||parseFloat(e)==100)){
con.style.height="";
con.dataset.imgSize=parseFloat(e);
setImgSize();
}
else{console.error("What are you doing!!! (input: \""+e+"\" function: \"changeImgSize()\")")}
}
}
function changeImgPos(e){
const con=document.querySelector(".imgContainer");
if(e=="tl"){
con.style.justifyContent="left";con.style.alignItems="flex-start";
} else if(e=="t"){
con.style.justifyContent="center";con.style.alignItems="flex-start";
} else if(e=="tr"){
con.style.justifyContent="right";con.style.alignItems="flex-start";
} else if(e=="l"){
con.style.justifyContent="left";con.style.alignItems="center";
} else if(e=="c"){
con.style.justifyContent="center";con.style.alignItems="center";
} else if(e=="r"){
con.style.justifyContent="right";con.style.alignItems="center";
} else if(e=="bl"){
con.style.justifyContent="left";con.style.alignItems="flex-end";
} else if(e=="b"){
con.style.justifyContent="center";con.style.alignItems="flex-end";
} else if(e=="br"){
con.style.justifyContent="right";con.style.alignItems="flex-end";
} else{console.error("What are you doing!!! (input: \""+e+"\" function: \"changeImgPos()\")")}
}
function navHide(e){
if(e=="Ex"){
for(let i=0;i<document.querySelectorAll("#navWarpper > *").length;i++){document.querySelectorAll("#navWarpper > *")[i].style.display="";}
document.querySelector("#navWarpper").style.background="";
document.querySelector("#navWarpper").style.width="";
document.querySelector("#navWarpper>#navHideEx").style.display="none";
document.querySelector("#navWarpper>#navHideColl").style.display="";
} else if(e=="Coll"){
for(let i=0;i<document.querySelectorAll("#navWarpper > *").length;i++){document.querySelectorAll("#navWarpper > *")[i].style.display="none";}
document.querySelector("#navWarpper").style.background="transparent";
document.querySelector("#navWarpper").style.width="auto";
document.querySelector("#navWarpper>#navHideEx").style.display="";
} else{console.error("What are you doing!!! (input: \""+e+"\" function: \"navHide()\")")}
}
function gotoPage(){
if(parseInt(this.value,10)>hcv.current.picList.length){
this.value=hcv.current.picList.length;
}
if(parseInt(this.value,10)<0||parseInt(this.value,10)==null||isNaN(parseInt(this.value,10))||parseInt(this.value,10)===0){
this.value=1;
}
if(hcv.current.picList.length==0||hcv.current.picList.length==null||isNaN(hcv.current.picList.length)){
this.value="";
} else if (this.value !=""){console.log("run");
this.value=parseInt(this.value,10);
window.location.hash=this.value=parseInt(this.value,10);
}
}
function popShow(){
if(hcv.settings.popSwitch==true){
document.querySelector("#popWarpper").style.display="";
} else{document.querySelector("#popWarpper").style.display="none";}
}
function popAdd(popid,poptext){
popid=popid.replace(/[^A-Za-z0-9]+/g,"");
if(document.querySelector("#"+popid)==null||document.querySelector("#"+popid)==""){
const div=document.createElement("div");
div.id(popid);
div.innerHTML=poptext;
document.querySelector("#popWarpper").appendChild(div);
}
}
function popRemove(popid,text){
let el=document.querySelector(popid);
el.classList.add("remove");
setTimeout(function(){el.remove();},2000)
}
function checkState(){
if(history.state==null||history.state==""){
history.replaceState({path:hcv.current.path,page:curGet()},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+curGet())
}
}
function getImgOrent(img=document.querySelector(".imgContainer>img")){
if(img.naturalHeight>img.naturalWidth){return"H";}
else if(img.naturalHeight<img.naturalWidth){return"W";}
else if(img.naturalHeight==img.naturalWidth){return"WH";}
}
function getBodyOrent(){
let b=document.body;
if(b.offsetHeight>b.offsetWidth){return"H";}
else if(b.offsetHeight<b.offsetWidth){return"W";}
else if(b.offsetHeight=b.offsetWidth){return"WH";}
}
function compareImgAspect(img=document.querySelector(".imgContainer>img")){
let bW=document.body.offsetWidth;
let bH=document.body.offsetHeight;
let iW=img.naturalWidth;
let iH=img.naturalHeight;

if(bW>bH&&(bW/bH>iW/iH)){return "b";}
else if(bW>bH&&(bW/bH<iW/iH)){return "i";}
else if(bW<bH&&(bH/bW>iH/iW)){return "b";}
else if(bW<bH&&(bH/bW<iH/iW)){return "i";}
else{return "b";}
}
function setImgSize(img=document.querySelector(".imgContainer>img")){
if(document.querySelector(".imgContainer>img")!=null||img!=document.querySelector(".imgContainer>img")){
let re;
let percent;
let imgConPer=parseFloat(document.querySelector(".imgContainer").dataset.imgSize);
if(isNaN(imgConPer)==true||imgConPer<0||imgConPer>100){
percent=100;
}else{percent=imgConPer;}
let bOrent=getBodyOrent();
let iOrent=getImgOrent(img);
let cAsp=compareImgAspect(img);

if(document.querySelector(".imgContainer").dataset.imgSize=="width"){re="w"}
else if(document.querySelector(".imgContainer").dataset.imgSize=="height"){re="h"}
else if(bOrent=="W"&&iOrent=="H"){re="h";}
else if(bOrent=="H"&&iOrent=="W"){re="w";}
else if(bOrent=="WH"&&iOrent=="H"){re="h";}
else if(bOrent=="WH"&&iOrent=="W"){re="w";}
else if(bOrent=="W"&&iOrent=="WH"){re="h";}
else if(bOrent=="H"&&iOrent=="WH"){re="w";}
else if(bOrent=="W"&&iOrent=="W"){if(cAsp=="b"){re="h";}else if(cAsp=="i"){re="w";}}
else if(bOrent=="H"&&iOrent=="H"){if(cAsp=="b"){re="w";}else if(cAsp=="i"){re="h";}}
else{re="w"}

if(re=="w"){
img.style.width=percent+"%";
img.style.height="";
}else if(re=="h"){
img.style.width="";
img.style.height=percent+"%";
}
}
}
function checkTouch(){
return (('ontouchstart' in window)||(navigator.maxTouchPoints>0)||(navigator.msMaxTouchPoints>0));
}
function hideCusSelect(){
for(let i=0;i<document.querySelectorAll(".seCon.show").length;i++){document.querySelectorAll(".seCon.show")[i].classList.remove("show");}
for(let i=0;i<document.querySelectorAll(".seTed.show").length;i++){document.querySelectorAll(".seTed.show")[i].classList.remove("show");}
for(let i=0;i<document.querySelectorAll(".selectCon.show").length;i++){document.querySelectorAll(".selectCon.show")[i].classList.remove("show");}
}
function findConWarp(ele,fwtime=0){
fwtime++;
let re="";
if(ele.classList.contains("containerWarpper")==true){re=ele;}
else if(ele==document.body){re=null}
else{re=findConWarp(ele.parentNode,fwtime);}
return re;
}
function hcvCheck(sc=null){
if(typeof hcv!="object"){hcv={};}
if(sc!=null&&sc!=""){
if(sc=="settings"&&typeof hcv.settings!="object"){hcv.settings={};}
else if(sc=="style"&&typeof hcv.settings!="object"){hcv.settings={};hcv.settings.style={};}
else if(sc=="style"&&typeof hcv.settings=="object"){hcv.settings.style={};}
else if(sc=="read"&&typeof hcv.read!="object"){hcv.read={};}
}
}
function loadSettings(){
let settingsObjName="settings";
let load=JSON.parse(localStorage.getItem(settingsObjName));
if(typeof load=="object"&&load!=null&&load!=""&&load.lcSettingsSwitch==true){
hcvCheck();
hcv[settingsObjName]=load;
setSettings();
}else{saveSettings();}
applySettings();
}
function setSettings(){
let settingsObjName="settings";
hcvCheck();
if(typeof hcv[settingsObjName]!="object"){hcv[settingsObjName]={};}
let settings=hcv[settingsObjName];
let settingsName=Object.keys(settings).filter(function(na){return ['style','custom'].includes(na)!=true}).concat(Object.keys(settings.style).filter(function(na){return ['custom'].includes(na)!=true}));

for(let i=0;i<settingsName.length;i++){
let settingsNa=settingsName[i];
let settingsVa=settings[settingsNa];
let settingsEl=document.querySelector('.settingsList[data-settings-name="'+settingsNa+'"]');
let settingsTy=settingsEl.dataset.settingsType;
if(settingsTy=="color"){settingsVa=settings.style[settingsNa];}

if(settingsTy=="switch"){
if(typeof settingsVa!="boolean"){
settingsVa=settingsEl.querySelector("input").checked;
settings[settingsNa]=settingsVa;
if((typeof settings.lcSettingsSwitchSwitch=="boolean"&&settings.lcSettingsSwitchSwitch==true)||(typeof settings.lcSettingsSwitchSwitch!="boolean"&&document.querySelector('.settingsList[data-settings-name="'+settingsNa+'"] input').checked==true)){
localStorage.setItem(settingsObjName,JSON.stringify(settings));
}
}
settingsEl.querySelector("input").checked=settingsVa;
}
else if(settingsTy=="select"){
if(settingsVa==null||settingsVa==""){
settingsVa=settingsEl.querySelector(".seTed").dataset.selectedKey;
settings[settingsNa]=settingsVa;
if((typeof settings.lcSettingsSwitchSwitch=="boolean"&&settings.lcSettingsSwitchSwitch==true)||(typeof settings.lcSettingsSwitchSwitch!="boolean"&&document.querySelector('.settingsList[data-settings-name="'+settingsNa+'"] input').checked==true)){
localStorage.setItem(settingsObjName,JSON.stringify(settings));
}
}
settingsEl.querySelectorAll(".seced").forEach(function(e){e.classList.remove("seced")});
settingsEl.querySelector('[data-key="'+settingsVa+'"]').classList.add("seced");
settingsEl.querySelector(".seTed").dataset.selectedKey=settingsEl.querySelector(".seced").dataset.key;
settingsEl.querySelector(".seTed").innerHTML=settingsEl.querySelector(".seced").innerHTML;
}
else if(settingsTy=="color"){console.log(settingsEl);console.log('va: ');console.log(settingsVa);console.log(settingsEl.dataset.cssQuery);
if(typeof settings.style!="object"){settings.style={};}
if(typeof settingsVa!="object"&&(settingsVa[settingsEl.dataset.cssQuery]!=null&&settingsVa[settingsEl.dataset.cssQuery]!="")){
settingsVa={};
settingsVa[settingsEl.dataset.cssQuery]={};
settingsVa[settingsEl.dataset.cssQuery][settingsEl.dataset.elCss]=settingsEl.querySelector("input").value;
settings.style[settingsNa]=settingsVa;
if((typeof settings.lcSettingsSwitchSwitch=="boolean"&&settings.lcSettingsSwitchSwitch==true)||(typeof settings.lcSettingsSwitchSwitch!="boolean"&&document.querySelector('.settingsList[data-settings-name="'+settingsNa+'"] input').checked==true)){
localStorage.setItem(settingsObjName,JSON.stringify(settings));
}
}
settingsEl.querySelector("input").value=settingsVa[settingsEl.dataset.cssQuery][settingsEl.dataset.elCss];
}

}

hcv[settingsObjName]=settings;
}
function saveSettings(){
let settingsObjName="settings";
hcvCheck();
let settings={};
let stList=document.querySelectorAll(".settingsList");

for(let i=0;i<stList.length;i++){
if(stList[i].dataset.settingsType=="switch"){
settings[stList[i].dataset.settingsName]=stList[i].querySelector("input").checked;
}
else if(stList[i].dataset.settingsType=="select"){
settings[stList[i].dataset.settingsName]=stList[i].querySelector(".seTed").dataset.selectedKey;
}
else if(stList[i].dataset.settingsType=="color"){
if(typeof settings.style!="object"){settings.style={};}
settings.style[stList[i].dataset.settingsName]={};
settings.style[stList[i].dataset.settingsName][stList[i].dataset.cssQuery]={};
settings.style[stList[i].dataset.settingsName][stList[i].dataset.cssQuery][stList[i].dataset.elCss]=stList[i].querySelector("input").value;
}
}

hcv[settingsObjName]=settings;
if(settings.lcSettingsSwitch==true){localStorage.setItem(settingsObjName,JSON.stringify(settings))};
}
function applySettings() {
changeFullScreen();
changeUZ();
changeLR();
changeLRInv();
if(typeof hcv.current=="object"){curDisFolder();}
changeCurDis();
changeImgSize(hcv.settings.imgSize);
changeImgPos(hcv.settings.imgPos);
if((typeof hcv.current=="object"&&hcv.settings.displayAllSwitch==false)||(typeof hcv.all=="object"&&hcv.settings.displayAllSwitch==true)){folderArrSplit();loadFolder();}
changeStyle();
}
function loadRead(){
if(hcv.settings.lcReadSwitch==true&&JSON.parse(localStorage.getItem("read"))!=null&&JSON.parse(localStorage.getItem("read"))!=""){
hcvCheck("read");
hcv.read=JSON.parse(localStorage.getItem("read"));
}
}
function changeStyle(){
let settingsObjName="settings";
let sty;
let styVa=hcv[settingsObjName].style;
let styVaK=Object.keys(styVa);
if(document.styleSheets.length==1){sheet=document.styleSheets[0]}
else if(document.styleSheets.length>1){
for(let i=0;i<document.styleSheets.length;i++){
if(document.styleSheets[i].href!=null&&document.styleSheets[i].href.match(window.location.origin+window.location.pathname)!=null){sty=document.styleSheets[i];}
}
if(typeof sheet!="object"){
sty=document.styleSheets[document.styleSheets.length-1];
}
}
else{
if(typeof CSSStyleSheet=="function"){
sty=new CSSStyleSheet();
document.adoptedStyleSheets=[sty];
} else{
let st=document.createElement("style");
document.body.appendChild(st);
sty=st.sheet;
}
}

for(let s=0;s<styVaK.length;s++){
let qa=Object.keys(styVa[styVaK[s]]);
for(let q=0;q<qa.length;q++){
let query=qa[q];
let cs=Object.keys(styVa[styVaK[s]][query]);
for(let c=0;c<cs.length;c++){sty.insertRule(query+' {'+cs[c]+': '+styVa[styVaK[s]][qa[q]][cs[c]]+'}',sty.cssRules.length);}
}
}
}

function shortKey(k){
if(k.altKey==false && k.ctrlKey==false && k.shiftKey==false && k.metaKey==false){

if(k.code=="ArrowLeft" || k.code=="KeyA"){
prev();
} else if(k.code=="ArrowRight" || k.code=="KeyD"){
next();
} else if(k.code=="KeyH" || k.code=="Escape"){
if(document.querySelectorAll(".containerWarpper.show").length>0){
document.querySelectorAll(".containerWarpper.show")[document.querySelectorAll(".containerWarpper.show").length-1].classList.remove("show");
} else if(document.querySelector("#navWarpper>#navHideColl").style.display !="none"){
navHide("Coll");
} else if(document.querySelector("#navWarpper>#navHideEx").style.display!="none"){
navHide("Ex");
}
} else if(k.code=="KeyF"){
document.querySelector("#folderListWarpper").classList.toggle("show");
} else if(k.code=="KeyJ"){
document.querySelector("#settingsWarpper").classList.toggle("show");
} else if(k.code=="KeyG"){
document.querySelector("#gotoWarpper").classList.toggle("show");
if(document.querySelector("#gotoWarpper").classList.contains("show")==true){document.querySelector("#gotoWarpper").focus();}
document.querySelector("#gotoWarpper").value="";
} else if(k.code=="Space" && k.target.tabIndex>=0){
k.preventDefault();k.target.click();
}

}
}

function cusSelectEvent(){
let seCus=document.querySelectorAll(".selectCon");
for(let i=0;i<seCus.length;i++){
let seTed=seCus[i].querySelector(".seTed");
let seCC=seCus[i].querySelectorAll(".seCC");

seTed.addEventListener("click",function(){
if(this.parentNode.classList.contains("show")){
hideCusSelect();
this.parentNode.classList.remove("show");
}else{
hideCusSelect();
this.parentNode.classList.add("show");
}});

for(let i=0;i<seCC.length;i++){
seCC[i].addEventListener("click",function(){
let parent=this.parentNode.parentNode;
parent.querySelector(".seTed").innerHTML=this.innerHTML;
parent.querySelector(".seTed").dataset.selectedKey=this.dataset.key;
parent.classList.remove("show");
for(let i=0;i<parent.querySelectorAll(".seCC").length;i++){
parent.querySelectorAll(".seCC")[i].classList.remove("seced");}
this.classList.add("seced");
})
}
}
}

function postScript(){
/*---- addevent to custom selector ----*/
cusSelectEvent();
}


document.addEventListener("DOMContentLoaded",loadSettings);
document.addEventListener("DOMContentLoaded",function(){requestInfo("main",null,true,true);if(hcv.settings.displayAllSwitch==true){requestInfo("current",null,true);requestInfo("all",null,false,true)}else{requestInfo("current",null,true,true);}});
document.addEventListener("DOMContentLoaded",curDisImg);
document.addEventListener("DOMContentLoaded",checkState);
document.addEventListener("DOMContentLoaded",setImg);
document.addEventListener("DOMContentLoaded",buttonValueFiller);
document.addEventListener("DOMContentLoaded",postScript);
window.addEventListener("hashchange",hashPictureUpdate);
document.querySelector("#goto").addEventListener("input",gotoPage)
document.querySelector("#goto").addEventListener("focusout",function(){this.value=""})
document.addEventListener("click",function(e){if(e.target.classList.contains("containerWarpper")==true){e.target.classList.remove("show");}});
document.querySelector("#gotoOpen").addEventListener("click",function(){document.querySelector("#gotoWarpper").classList.add("show");document.querySelector("#goto").focus();document.querySelector("#goto").value="";});
document.querySelector("#gotoClose").addEventListener("click",function(){findConWarp(this).classList.remove("show");});
document.querySelector("#settingsOpen").addEventListener("click",function(){document.querySelector("#settingsWarpper").classList.add("show");});
document.querySelector("#settingsClose").addEventListener("click",function(){findConWarp(this).classList.remove("show");});
document.querySelector("#folderGoBack").addEventListener("click",function(){if(hcv.current.backDir!=null&&hcv.current.backDir!=""){history.pushState({path:hcv.current.backDir,act:"back"},"","?p="+encodeURIComponent(hcv.current.backDir)+"&fc=true");requestInfo("current",null,false,true);setFolderActive();}});
document.querySelector("#folderReload").addEventListener("click",function(){if(hcv.settings.displayAllSwitch==true){requestInfo("all",null,false,true);document.querySelector("#folderGoBack").style.display="none"}else{requestInfo("current",null,false,true);document.querySelector("#folderGoBack").style.display=""}});
document.querySelector("#folderClose").addEventListener("click",function(){findConWarp(this).classList.remove("show");});
document.querySelector("#folderOpen").addEventListener("click",function(){document.querySelector("#folderListWarpper").classList.add("show");});
document.querySelector("#navHideEx").addEventListener("click",function(){navHide("Ex")});
document.querySelector("#navHideColl").addEventListener("click",function(){navHide("Coll")});
document.addEventListener("keydown",function(k){shortKey(k)});
document.querySelector("#prev").addEventListener("click",prev);
document.querySelector("#next").addEventListener("click",next);
document.querySelector("#imgWarpper>div.L").addEventListener("click",prev);
document.querySelector("#imgWarpper>div.R").addEventListener("click",next);
document.querySelector("#settingsApply").addEventListener("click",function(){saveSettings();applySettings();});
document.querySelector("#imgWarpper").addEventListener("mousemove",function(){hcvCheck();hcv.naviHide=0;if((hcv.settings.autoHideNaviSwitch==true&&checkTouch()!=true)||(hcv.settings.autoHideNaviTouchSwitch==true&&checkTouch()==true)){navHide("Ex")}});
document.querySelector("#imgWarpper").addEventListener("mouseenter",function(){hcvCheck();hcv.naviHide=0;hcv.naviHideTime=setInterval(function(){if(hcv.naviHide==30&&((hcv.settings.autoHideNaviSwitch==true&&checkTouch()!=true)||(hcv.settings.autoHideNaviTouchSwitch==true&&checkTouch()==true))){navHide("Coll")}else{hcv.naviHide++}},100)});
document.querySelector("#imgWarpper").addEventListener("mouseleave",function(){hcvCheck();hcv.naviHide=0;clearInterval(hcv.naviHideTime)});
window.addEventListener("resize",function(){setImgSize();});
document.addEventListener("fullscreenchange",checkFullScreen);
document.addEventListener("mozfullscreenchange",checkFullScreen);
document.addEventListener("webkitfullscreenchange",checkFullScreen);
document.addEventListener("msfullscreenchange",checkFullScreen);