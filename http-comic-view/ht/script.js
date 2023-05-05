function preloadImage(lo){
const i=document.createElement("img");
const url=lo.slice(lo.slice(0,lo.lastIndexOf("/")).lastIndexOf("/")+1);
const popid=url.replace(/[^A-Za-z0-9]+/g,"");
const poptxt=decodeURIComponent(url).replace(/\//ig,"/<br>");
popup("replace",popid,"Preloading: "+poptxt);
i.onload=function(){popup("replacetemp",popid,"Preloaded: "+poptxt)}
i.onerror=function(){popup("replacetemp",popid,"Preload error: "+poptxt)}
i.src=lo;
}
function setImg(){
const ic=document.querySelector(".imgContainer");
let p=hcv.current.picList;
if(ic.hasChildNodes()){for(let i=0;0<ic.childNodes.length;i++){ic.removeChild(ic.childNodes[ic.childNodes.length-1])}}
if(typeof p=="object"&&p!=""&&p!=null){
let url;
let winLoO=window.location.origin;
let winLoP=window.location.pathname;
const igFstRelPath=p[curGet()-1];
const igFstRealPath=hcv.current.path+igFstRelPath;
const igFst=document.createElement("img");
igFst.draggable=false;
igFst.src=encodeURIComponent(igFstRealPath).replace(/%2F/ig,"/");
igFst.dataset.load="1";

igFst.onload=function(){
let path=encodeURIComponent(igFstRealPath).replace(/%2F/ig,"/");
if(winLoP.charAt(winLoP.length-1)=="/"){url=winLoO+winLoP+path}
else{url=winLoO+winLoP+"/"+path}
if(igFst.src==path||igFst.src==url){
setImgSize(igFst);
let igFstCl=ic.querySelectorAll('[data-load="1"]');
for(let i=0;0<igFstCl.length;i++){ic.removeChild(igFstCl.length-1)}
if(ic.childNodes>=1&&hcv.settings.twoPageSwitch==true&&(hcv.settings.twoPageOffsetSwitch==false&&p.length>=curGet())){insertBefore(igFst,ic.childNodes[0])}
else{ic.appendChild(igFst);}
document.querySelector("#currentDisplay").innerHTML=igFstRelPath+' ('+curGet()+')';
hcvCheck("read");
hcv.read[hcv.current.path]={};
hcv.read[hcv.current.path]["read"]=curGet();
hcv.read[hcv.current.path]["page"]=hcv.current.picList.length;
if(hcv.settings.lcReadSwitch==true){localStorage.setItem("read",JSON.stringify(hcv.read))};
}
}

if(hcv.settings.twoPageSwitch==true&&((hcv.settings.twoPageOffsetSwitch==true&&0<=curGet()-2)||(hcv.settings.twoPageOffsetSwitch==false&&p.length>=curGet()))){
let igSndRelPath;
if(twoPageOffsetSwitch==true){igSndRelPath=p[curGet()-2];}
else{igSndRelPath=p[curGet()];}
const igSndRealPath=hcv.current.path+igSndRelPath;
const igSnd=document.createElement("img");
igSnd.draggable=false;
igSnd.src=encodeURIComponent(igSndRealPath).replace(/%2F/ig,"/");
igSnd.dataset.load="2";

let path=encodeURIComponent(igFstRealPath).replace(/%2F/ig,"/");
if(winLoP.charAt(winLoP.length-1)=="/"){url=winLoO+winLoP+path}
else{url=winLoO+winLoP+"/"+path}
if(igFst.src==path||igFst.src==url&&((hcv.settings.twoPageOffsetSwitch==true&&0<=curGet()-2)||(hcv.settings.twoPageOffsetSwitch==false&&p.length>=curGet()))){
igSnd.onload=function(){
setImgSize(igSnd);
let igSndCl=ic.querySelectorAll('[data-load="2"]');
for(let i=0;0<igSndCl.length;i++){ic.removeChild(igSndCl.length-1)}
if(ic.childNodes>=1&&hcv.settings.twoPageOffsetSwitch==true){insertBefore(igSnd,ic.childNodes[0])}
else{ic.appendChild(igSnd);}
}
}
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
requestInfo("current",null,true,true);
} else{
if(0==hcv.current.picList.length){cur=hcv.current.picList.length}
else if(cur<=1){cur=1;}
else if(hcv.settings.twoPageSwitch==true&&cur-2>=1){cur-=2;}
else{cur--;}
history.pushState({path:hcv.current.path,page:cur,act:"prev"},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+cur);
hashPictureUpdate();
}
if(document.querySelector(".imgContainer").style.height=="auto"){document.body.scrollTop=0;document.documentElement.scrollTop=0;}
}
function next(){
let cur=curGet();
if(hcv.settings.pnSwitch==true&&typeof hcv.current.nextDir=="object"&&(cur>=hcv.current.picList.length||(hcv.settings.twoPageSwitch==true&&cur>=hcv.current.picList.length))){
history.pushState({path:hcv.current.nextDir.path,act:"next"},"","?p="+encodeURIComponent(hcv.current.nextDir.path)+"&fc=true");
requestInfo("current",null,true,true);
} else{
if(cur>=hcv.current.picList.length){cur=hcv.current.picList.length}
else if(hcv.settings.twoPageSwitch==true&&hcv.settings.twoPageOffsetSwitch==true&&cur==1&&cur+1<=hcv.current.picList.length){cur+=1}
else if(hcv.settings.twoPageSwitch==true&&cur+2<=hcv.current.picList.length){cur+=2}
else{cur++}
history.pushState({path:hcv.current.path,page:cur,act:"next"},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+cur);
hashPictureUpdate();
}

if(document.querySelector(".imgContainer").style.height=="auto"){document.body.scrollTop=0;document.documentElement.scrollTop=0;}
}
function hashPictureUpdate(){
let cur=curGet()-1;
curDisImg()
curTitle()
setImg()
for(let i=0;i<parseInt(hcv.settings.preNext);i++){
if(cur+i+1>=0&&cur+i+1<hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur+i+1]).replace(/%2F/ig,"/"))}
else{break;}
}
for(let i=0;i<parseInt(hcv.settings.prePrev);i++){
if(cur-i-1>=0&&cur-i-1<hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur-i-1]).replace(/%2F/ig,"/"))}
else{break;}
}
}

async function requestInfo(type,query=null,folderReload=false,forceReload=false,fall=false){
let request;
let infoType;
let infoId;
if(type!=undefined&&type!=null&&type!=""){type=type.toLowerCase()}else{return}

if(type=="main"){request="type=main";infoType="main folder name"}
else if(type=="all"){request="type=all&i="+hcv.settings.includeWord+"&b="+hcv.settings.blockWord;infoType="all folders"}
else if(type=="current"&&hcv.settings.folderRecusiveSwitch==false){
let url=window.location.search.slice(1).split("&");
let re={};
for(let i=0;i < url.length;i++){re[url[i].split("=")[0]]={};re[url[i].split("=")[0]]=url[i].split("=")[1];}
if(re["p"]==null||re["p"]==""){re["p"]=hcv.main}request="type=specific&p="+re["p"]+"&i="+hcv.settings.includeWord+"&b="+hcv.settings.blockWord;
infoType="folder"}
else if(type=="current"&&hcv.settings.folderRecusiveSwitch==true){
let url=window.location.search.slice(1).split("&");
let re={};
for(let i=0;i < url.length;i++){re[url[i].split("=")[0]]={};re[url[i].split("=")[0]]=url[i].split("=")[1];}
if(re["p"]==null||re["p"]==""){re["p"]=hcv.main}request="type=specificRecusive&p="+re["p"]+"&i="+hcv.settings.includeWord+"&b="+hcv.settings.blockWord;
infoType="folder"}
else if(type=="specific"){request="type=specific&p="+encodeURIComponent(query)+"&i="+hcv.settings.includeWord+"&b="+hcv.settings.blockWord;
infoType="folder"}
else if(type=="settings"){request="type=settings";infoType="settings"}
else{console.error('Not support input type "'+type+'"');return}

try{
infoId=request.replace(/[^A-Za-z0-9]+/g,"");
popup("replace",infoId,"Loading "+infoType);
let resp;
if(fall==false){resp=await fetch("request?"+request)}
else{resp=await fetch("request.php?"+request)}
if(!resp.ok){throw new Error("Network error");}
popup("replacetemp",infoId,"Loaded "+infoType);
const res=await resp.json();
hcvCheck();
if(type=="main"){hcv.main=res;}
else if(type=="all"){hcv.all=res;}
else if(type=="current"){
hcv.current=res;
let ic=document.querySelector(".imgContainer");
if(ic.hasChildNodes()){for(let i=0;i<ic.childNodes.length;i++){ic.removeChild(ic.childNodes[i])}}
}
else if(type=="settings"){hcv.settings=res;}

if(folderReload==true&&(type=="all"||type=="current")){folderArrSplit();loadFolder();hashPictureUpdate();}
setFolderActive();
}catch(error){
console.error("Fetch error:",error);
popup("replacetemp",infoId,"Load error "+infoType);
if(fall==false){
console.log("Fetch retry");
popup("replacetemp",infoId+"_retry","Retry loading "+infoType+" after 5 seconds");
setTimeout(async function(){requestInfo(type,query,folderReload,forceReload,true);},5000);
}
}
}

function curDisImg(){
const go=document.querySelector("#gotoOpen");
const goC=document.querySelector("#gotoOpen>[data-value=current]");
const goA=document.querySelector("#gotoOpen>[data-value=all]");
if(0==hcv.current.picList.length){goC.innerHTML="0";goA.innerHTML="0";go.value=go.textContent;document.querySelector("#currentDisplay").innerHTML="N/A";}
else{goC.innerHTML=curGet();goA.innerHTML=hcv.current.picList.length;go.value=go.textContent;}
}
function curDisFolder(){
const curFolder=document.querySelector("#currentFolder");
if(hcv.settings.curPathSwitch==true){curFolder.innerHTML=hcv.current.path;}
else{curFolder.innerHTML=hcv.current.name;}
}
function curTitle(format=hcv.settings.titleText){
const t=document.querySelector("title");
let f=format;
let l=[
[/_\{name\}_/ig,hcv.current.name],
[/_\{prna\}_/ig,hcv.current.backDir.replace(/\/$/g,"").replace(/.*\//g,"")],
[/_\{path\}_/ig,hcv.current.path],
[/_\{img\}_/ig,hcv.current.picList[curGet()-1]],
[/_\{page\}_/ig,curGet()],
[/_\{all\}_/ig,hcv.current.picList.length]
];
for(let i=0;i<l.length;i++){f=f.replace(l[i][0],l[i][1])}
t.innerHTML=f;
}
function folderArrSplit(){
let arr;
let out=[];
if(hcv.settings.displayAllSwitch==true&&hcv.settings.imgFirstSwitch==true&&typeof hcv.all=="object"){arr=hcv.all.dirValid.concat(hcv.all.dirNotValid);}
else if(hcv.settings.displayAllSwitch==true&&hcv.settings.imgFirstSwitch!=true&&typeof hcv.all=="object"){arr=hcv.all.dirList;}
else if(hcv.settings.displayAllSwitch!=true&&hcv.settings.imgFirstSwitch==true&&typeof hcv.current=="object"){arr=hcv.current.dirValid.concat(hcv.current.dirNotValid);}
else if(hcv.settings.displayAllSwitch!=true&&hcv.settings.imgFirstSwitch!=true&&typeof hcv.current=="object"){arr=hcv.current.dirList;}
else{return ;}
if(arr.indexOf(null)>-1){arr.splice(arr.indexOf(null),1)}

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
hcvCheck("dirPage");
if(typeof(hcv.dirPage[hcv.current.path])!="object"){
hcv.dirPage[hcv.current.path]={}
hcv.dirPage[hcv.current.path]["limit"]=hcv.settings.dirLimit;
hcv.dirPage[hcv.current.path]["page"]=0;
}
}
function loadFolder(){
curDisFolder();
let lo,dir,read;
let subCon=document.querySelector("#folderListWarpper .containerSubHead");
document.querySelector("#folderListContainer").innerHTML="";
if(hcv.settings.displayAllSwitch==true){lo=hcv.all;}else{lo=hcv.current;}
subCon.innerHTML="";
hcvCheck("dirPage");
if(typeof(hcv.dirPage[hcv.current.path])!="object"){hcv.dirPage[hcv.current.path]={}}
dpi=parseInt(hcv.dirPage[hcv.current.path]["limit"]);
dpp=parseInt(hcv.dirPage[hcv.current.path]["page"]);

if(lo.sorted.length>1){
const pgtx=document.createElement("div");
pgtx.innerHTML="Page: ";
subCon.appendChild(pgtx);
for(let i=0;i<lo.sorted.length;i++){
const pageEl=document.createElement("button");
pageEl.innerHTML=i+1;
pageEl.classList.add("button");
if(hcv.settings.dirLimit==dpi&&i==dpp){pageEl.classList.add("select");}
else{pageEl.addEventListener("click",function(){hcv.dirPage[hcv.current.path]["limit"]=hcv.settings.dirLimit;hcv.dirPage[hcv.current.path]["page"]=i;loadFolder();})}
subCon.appendChild(pageEl);
}
dir=lo.sorted[hcv.dirPage[hcv.current.path]["page"]];
}else if(lo.sorted.length=1){
hcv.dirPage[hcv.current.path]["limit"]=hcv.settings.dirLimit;
hcv.dirPage[hcv.current.path]["page"]=0;
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
spcon.ariaHidden="true";
spf.dataset.nodeType="folder";
spp.dataset.nodeType="image";
spr.dataset.nodeType="read";

if(hcv.settings.displayAllSwitch==false){name.innerHTML=text;a.title=text;a.ariaLabel=text;}else{name.innerHTML=path;a.title=path;a.ariaLabel=path;}
a.classList.add("folderListNode");
a.href=window.location.origin+window.location.pathname+"?p="+encPath+"&fc=true";
a.addEventListener("click",function(e){e.preventDefault();
if(encPath!=re["p"]){history.pushState({path:hcv.current.path,act:"load"},"","?p="+encPath+"&fc=true");requestInfo("current",null,true,true);}}
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
for(let i=0;i<bt.length;i++){
if(bt[i].value==""){
bt[i].value=bt[i].textContent;
}
}
}
function titleToAriaFiller(){
const t=document.querySelectorAll("[title]");
for(let i=0;i<t.length;i++){
if(t[i].title!=""&&(t[i].ariaLabel==""||t[i].ariaLabel==null)){
t[i].ariaLabel=t[i].title;
}
}
}
function changeImgSize(e){
const warp=document.querySelector("#imgWarpper");
const con=document.querySelector(".imgContainer");
if(e=="w"){
con.style.height="auto";
warp.dataset.imgSize="width";
setImgSize();
}else if(e=="h"){
con.style.height="";
warp.dataset.imgSize="height";
setImgSize();
} else{
if (isNaN(parseFloat(e))==false&&parseFloat(e)>0&&(parseFloat(e)<100||parseFloat(e)==100)){
con.style.height="";
warp.dataset.imgSize=parseFloat(e);
setImgSize();
}
else{console.error("What are you doing!!! (input: \""+e+"\" function: \"changeImgSize()\")")}
}
}
function changeImgPos(e){
const con=document.querySelector("#imgWarpper");
if(e=="tl"){con.style.justifyContent="left";con.style.alignItems="flex-start";}
else if(e=="t"){con.style.justifyContent="center";con.style.alignItems="flex-start";}
else if(e=="tr"){con.style.justifyContent="right";con.style.alignItems="flex-start";}
else if(e=="l"){con.style.justifyContent="left";con.style.alignItems="center";}
else if(e=="c"){con.style.justifyContent="center";con.style.alignItems="center";}
else if(e=="r"){con.style.justifyContent="right";con.style.alignItems="center";}
else if(e=="bl"){con.style.justifyContent="left";con.style.alignItems="flex-end";}
else if(e=="b"){con.style.justifyContent="center";con.style.alignItems="flex-end";}
else if(e=="br"){con.style.justifyContent="right";con.style.alignItems="flex-end";}
else{console.error("What are you doing!!! (input: \""+e+"\" function: \"changeImgPos()\")")}
}
function navHide(e){
if(hcv.settings.hideNaviSwitch==true){document.querySelector(".navHide").style.display="none"}
else{document.querySelector(".navHide").style.display=""}

if(e!="Switch"){
if(e=="Auto"){
if(document.querySelector("#navWarpper").dataset.hide=="false"){navHide("Coll")}
else if(document.querySelector("#navWarpper").dataset.hide=="true"){navHide("Ex")}
} else if(e=="Ex"){
document.querySelector("#navWarpper").dataset.hide="false";
if(hcv.settings.hideNaviSwitch==true){document.querySelector("#navWarpper").style.display="";}
for(let i=0;i<document.querySelectorAll("#navWarpper>*:not(.navHide)").length;i++){document.querySelectorAll("#navWarpper>*:not(.navHide)")[i].style.display="";}
document.querySelector("#navWarpper").style.background="";
document.querySelector("#navWarpper").style.width="";
document.querySelector(".navHide>*:nth-child(1)").style.display="";
document.querySelector(".navHide>*:nth-child(2)").style.display="none";
} else if(e=="Coll"){
document.querySelector("#navWarpper").dataset.hide="true";
if(hcv.settings.hideNaviSwitch==true){document.querySelector("#navWarpper").style.display="none";}
for(let i=0;i<document.querySelectorAll("#navWarpper>*:not(.navHide)").length;i++){document.querySelectorAll("#navWarpper>*:not(.navHide)")[i].style.display="none";}
document.querySelector("#navWarpper").style.background="transparent";
document.querySelector("#navWarpper").style.width="auto";
document.querySelector(".navHide>*:nth-child(1)").style.display="none";
document.querySelector(".navHide>*:nth-child(2)").style.display="";
} else{console.error("What are you doing!!! (input: \""+e+"\" function: \"navHide()\")")}}
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
} else if (this.value !=""){
this.value=parseInt(this.value,10);
window.location.hash=this.value=parseInt(this.value,10);
}
}
function popup(action,id,text="",type=null,status=null){
let time=400;
if(typeof hcv!="undefined"&&typeof hcv.settings!="undefined"&&typeof hcv.settings.animationTime!="undefined"){time=hcv.settings.animationTime}
const popWarp=document.querySelector("#popWarpper");
action=action.toLowerCase();
id=id.toLowerCase();
if(action=="create"){
const pop=document.createElement("div");
pop.classList.add("popup");
pop.innerHTML=text;
pop.dataset.popid=id;
popWarp.appendChild(pop);
}
else if(action=="remove"){
let popList=popWarp.querySelectorAll('[data-popid="'+id+'"]');
if(popList.length>0){popWarp.removeChild(popList[0])}
}
else if(action=="replace"){
let popList=popWarp.querySelectorAll('[data-popid="'+id+'"]');
if(popList.length>0){popList[0].innerHTML=text;}
else{popup("create",id,text,type,status)}
}
else if(action=="temp"){
const pop=document.createElement("div");
pop.classList.add("popup");
pop.innerHTML=text;
pop.dataset.popid=id;
popWarp.appendChild(pop);
popup("waitremove",id,text,type,status)
}
else if(action=="replacetemp"){
let popList=popWarp.querySelectorAll('[data-popid="'+id+'"]');
if(popList.length>0){
popList[0].innerHTML=text;
popup("waitremove",id,text,type,status)
}else{popup("temp",id,text,type,status)}
}
else if(action=="log"){
console.log(text);
popup("temp",id,text,type,status)
}
else if(action=="waitremove"){
setTimeout(function(){popup("remove",id)},time*2);
}
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
let imgConPer=parseFloat(document.querySelector("#imgWarpper").dataset.imgSize);
if(isNaN(imgConPer)==true||imgConPer<0||imgConPer>100){
percent=100;
}else{percent=imgConPer;}
let bOrent=getBodyOrent();
let iOrent=getImgOrent(img);
let cAsp=compareImgAspect(img);

if(document.querySelector("#imgWarpper").dataset.imgSize=="width"){re="w"}
else if(document.querySelector("#imgWarpper").dataset.imgSize=="height"){re="h"}
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
document.querySelector(".imgContainer").style.width=percent+"%";
document.querySelector(".imgContainer").style.height="";
img.style.width="100%";
img.style.height="";
}else if(re=="h"){
document.querySelector(".imgContainer").style.width="";
document.querySelector(".imgContainer").style.height=percent+"%";
img.style.width="";
img.style.height="100%";
}
}
}
function checkTouch(){return (('ontouchstart' in window)||(navigator.maxTouchPoints>0)||(navigator.msMaxTouchPoints>0));}
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
if(sc=="settings"&&typeof hcv.settings!="object"){hcv.settings={}}
else if(sc=="style"&&typeof hcv.settings!="object"){hcv.settings={};hcv.settings.style={}}
else if(sc=="style"&&typeof hcv.settings=="object"&&typeof hcv.settings.style!="object"){hcv.settings.style={}}
else if(sc=="read"&&typeof hcv.read!="object"){hcv.read={}}
else if(sc=="dirPage"&&typeof hcv.dirPage!="object"){hcv.dirPage={}}
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
let settingsAllName=Object.keys(settings).filter(function(na){return ['style','key','custom'].includes(na)!=true}).concat(Object.keys(settings.style).filter(function(na){return ['custom'].includes(na)!=true}),Object.keys(settings.key));

for(let i=0;i<settingsAllName.length;i++){
let settingsNa=settingsAllName[i];
let settingsVa=settings[settingsNa];
let settingsEl=document.querySelector('.settingsList[data-settings-name="'+settingsNa+'"]');
if(settingsEl==null){continue;}
let settingsTy=settingsEl.dataset.settingsType;
if(settingsTy=="color"){settingsVa=settings.style[settingsNa];}
if(settingsTy=="shortkey"){settingsVa=settings.key[settingsNa];}
let save=(typeof settings.lcSettingsSwitch=="boolean"&&settings.lcSettingsSwitch==true)||(typeof settings.lcSettingsSwitch!="boolean"&&document.querySelector('.settingsList[data-settings-name="lcSettingsSwitch"] input').checked==true);

if(settingsTy=="switch"){
if(typeof settingsVa!="boolean"){
settingsVa=settingsEl.querySelector("input").checked;
settings[settingsNa]=settingsVa;
if(save==true){localStorage.setItem(settingsObjName,JSON.stringify(settings));}
}
settingsEl.querySelector("input").checked=settingsVa;
}
else if(settingsTy=="select"){
if(settingsVa==null||settingsVa==""){
settingsVa=settingsEl.querySelector(".seTed").dataset.selectedKey;
settings[settingsNa]=settingsVa;
if(save==true){localStorage.setItem(settingsObjName,JSON.stringify(settings));}
}
settingsEl.querySelectorAll(".seced").forEach(function(e){e.classList.remove("seced")});
settingsEl.querySelector('[data-key="'+settingsVa+'"]').classList.add("seced");
settingsEl.querySelector(".seTed").dataset.selectedKey=settingsEl.querySelector(".seced").dataset.key;
settingsEl.querySelector(".seTed").innerHTML=settingsEl.querySelector(".seced").innerHTML;
}
else if(settingsTy=="color"){
if(typeof settings.style!="object"){settings.style={};}
if(typeof settingsVa!="object"&&(settingsVa[settingsEl.dataset.cssQuery]!=null&&settingsVa[settingsEl.dataset.cssQuery]!="")){
settingsVa={};
settingsVa[settingsEl.dataset.cssQuery]={};
settingsVa[settingsEl.dataset.cssQuery][settingsEl.dataset.elCss]=settingsEl.querySelector("input").value;
settings.style[settingsNa]=settingsVa;
if(save==true){localStorage.setItem(settingsObjName,JSON.stringify(settings));}
}
settingsEl.querySelector("input").value=settingsVa[settingsEl.dataset.cssQuery][settingsEl.dataset.elCss];
}
else if(settingsTy=="shortkey"){
if(typeof settings.key!="object"){settings.key={};}
if(typeof settingsVa!="object"){
settingsVa=[];
let key=settingsVa.querySelectorAll('[data-keys]');
if(key.length>0){
for(let k=0;k<key.length;k++){settingsVa.push(key[k].dataset.keys);}
}
settings.key[settingsNa]=settingsVa;
if(save==true){localStorage.setItem(settingsObjName,JSON.stringify(settings));}
}
let keyCon=settingsEl.querySelector(".keys");
keyCon.innerHTML="";
for(let i=0;i<settingsVa.length;i++){
const newKey=document.createElement('button');
newKey.classList.add("buttonText");
newKey.dataset.keys=settingsVa[i];
newKey.innerHTML=settingsVa[i].replace(","," + ");
newKey.tabIndex=0;
newKey.addEventListener("click",function(){this.parentNode.removeChild(this);})
keyCon.appendChild(newKey);
}
}
else if(settingsTy=="text"){
if(typeof settingsVa!="string"){
settingsVa=settingsEl.querySelector("textarea").value;
settings[settingsNa]=settingsVa;
if(save==true){localStorage.setItem(settingsObjName,JSON.stringify(settings));}
}
settingsEl.querySelector("textarea").value=settingsVa;
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
else if(stList[i].dataset.settingsType=="shortkey"){
if(typeof settings.key!="object"){settings.key={};}
settings.key[stList[i].dataset.settingsName]=[];
let key=stList[i].querySelectorAll('[data-keys]');
if(key.length>0){
for(let k=0;k<key.length;k++){settings.key[stList[i].dataset.settingsName].push(key[k].dataset.keys);}
}
}
else if(stList[i].dataset.settingsType=="text"){
settings[stList[i].dataset.settingsName]=stList[i].querySelector("textarea").value;
}

}
if(typeof hcv[settingsObjName]!="object"){hcv[settingsObjName]={};}
hcv[settingsObjName]=Object.assign(hcv[settingsObjName],settings);
if(settings.lcSettingsSwitch==true){localStorage.setItem(settingsObjName,JSON.stringify(hcv[settingsObjName]))};
}
function applySettings(){
changeFullScreen();
changeUZ();
if(typeof hcv.current=="object"){curDisFolder();}
changeCurDis();
changeImgSize(hcv.settings.imgSize);
changeImgPos(hcv.settings.imgPos);
if((typeof hcv.current=="object"&&hcv.settings.displayAllSwitch==false)||(typeof hcv.all=="object"&&hcv.settings.displayAllSwitch==true)){folderArrSplit();loadFolder();}
changeAnimation();
changeStyle();
changeUISize();
changeNaviLocation();
navHide("Switch");
if(hcv.settings.popSwitch==true){document.querySelector("#popWarpper").style.display=""}else{document.querySelector("#popWarpper").style.display="none"}
if(hcv.settings.twoPageSideSwitch==true){document.querySelector(".imgContainer").style.flexDirection="row-reverse"}else{document.querySelector(".imgContainer").style.flexDirection=""}
if(typeof hcv.current=="object"){curTitle()}
}
function loadRead(){
if(hcv.settings.lcReadSwitch==true&&JSON.parse(localStorage.getItem("read"))!=null&&JSON.parse(localStorage.getItem("read"))!=""){
hcvCheck("read");
hcv.read=JSON.parse(localStorage.getItem("read"));
}
}
function changeStyle(){
let settingsObjName="settings";
let stySh;
let styVa=hcv[settingsObjName].style;
let styVaK=Object.keys(styVa);

if(document.styleSheets.length==1){stySh=document.styleSheets[0]}
else if(document.styleSheets.length>1){
for(let i=0;i<document.styleSheets.length;i++){
if(document.styleSheets[i].href!=null&&document.styleSheets[i].href.match(window.location.origin+window.location.pathname)!=null){stySh=document.styleSheets[i];}
}
if(typeof stySh!="object"){
stySh=document.styleSheets[document.styleSheets.length-1];
}
}
else{
if(typeof CSSStyleSheet=="function"){
stySh=new CSSStyleSheet();
document.adoptedStyleSheets=[stySh];
} else{
let st=document.createElement("style");
document.body.appendChild(st);
stySh=st.sheet;
}
}

for(let s=0;s<styVaK.length;s++){
let qa=Object.keys(styVa[styVaK[s]]);
for(let q=0;q<qa.length;q++){
let query=qa[q];
let cs=Object.keys(styVa[styVaK[s]][query]);
for(let c=0;c<cs.length;c++){stySh.insertRule(query+' {'+cs[c]+': '+styVa[styVaK[s]][qa[q]][cs[c]]+'}',stySh.cssRules.length);}
}
}
}
function changeUISize(){document.documentElement.style.fontSize=(hcv.settings.uiSize/6.25)+'px';}
function categorySettings(){
let el=document.querySelectorAll('.settingsList');
let category={};
for(let i=0;i<el.length;i++){category[el[i].dataset.settingsCategory]='';}
hcvCheck();
hcv.settingsCat={}
hcv.settingsCat.all=Object.keys(category);
hcv.settingsCat.current=hcv.settingsCat.all[0];
if(hcv.settingsCat.all.includes("Experimental")){hcv.settingsCat.all.splice(hcv.settingsCat.all.indexOf('Experimental'),1);hcv.settingsCat.all.push('Experimental')}

document.querySelector(".settingsCat").innerHTML='';
for (let i=0;i<hcv.settingsCat.all.length;i++){
let con=document.createElement('button');
con.classList.add('buttonText');
con.innerHTML=hcv.settingsCat.all[i];
con.addEventListener("click",function(){hcv.settingsCat.current=hcv.settingsCat.all[i];categoryChange();});
document.querySelector(".settingsCat").appendChild(con);
}
}
function categoryChange(){
let elh=document.querySelectorAll('.settingsList:not([data-settings-category="'+hcv.settingsCat.current+'"])');
let els=document.querySelectorAll('.settingsList[data-settings-category="'+hcv.settingsCat.current+'"]');

for(let i=0;i<elh.length;i++){elh[i].classList.add('hide');}
for(let i=0;i<els.length;i++){els[i].classList.remove('hide');}
}
function exportData(hcvVar){
hcvCheck();
let dt=new Date();
let dl=document.createElement("a");
dl.href="data:application/json,"+encodeURIComponent(JSON.stringify(hcv[hcvVar]));
dl.target="_blank";
dl.download="hcv-"+hcvVar+'-'+dt.getFullYear().toString()+'-'+(dt.getMonth()+1).toString().padStart(2,'0')+'-'+dt.getDate().toString().padStart(2,'0')+".json";
dl.style.display="none";
document.querySelector("#popWarpper").appendChild(dl);
dl.click();
document.querySelector("#popWarpper").removeChild(dl);
}
function importData(hcvVar,objValue){
hcvCheck();
if(typeof hcv[hcvVar]!="object"){hcv[hcvVar]={}}
Object.assign(hcv[hcvVar],objValue);
if(hcvVar=="settings"){
setSettings();applySettings();
if(hcv.settings.lcSettingsSwitch==true){localStorage.setItem("settings",JSON.stringify(hcv.settings))};
} else if(hcvVar=="read"){
if(hcv.settings.lcReadSwitch==true){localStorage.setItem("read",JSON.stringify(hcv.read))};
}
}
function imageTap(m){
if(document.querySelector("#imgWarpper").offsetWidth/2>m.pageX){
if(hcv.settings.imgTap=="rl"){prev()}
if(hcv.settings.imgTap=="lr"){next()}
} else{
if(hcv.settings.imgTap=="rl"){next()}
if(hcv.settings.imgTap=="lr"){prev()}
}
}
function changeNaviLocation(){
const vl=hcv.settings.naviLocation;
const navi=document.querySelector("#navWarpper");

document.querySelectorAll("[data-settings-name=naviLocation] .seCC").forEach(function(k){if(navi.classList.contains(k.dataset.key)){navi.classList.remove(k.dataset.key)}});
navi.classList.add(vl);
}
function callFunc(name){
if(typeof window[name]=='function'){return window[name]()}
else(console.error("Not a function (input: \""+name+"\" function: \"callFunc()\")"))
}
async function webServiceInstall(){
if("serviceWorker" in navigator){
try{
const sw=await navigator.serviceWorker.register("/service.js");
if(sw.installing){popup("temp","webServiceInstall","Offline mode installing")}
else if(sw.waiting){popup("temp","webServiceInstall","Offline mode installed")}
else if (sw.active){popup("temp","webServiceInstall","Offline mode active");}
setInterval(()=>{if(sw.active){popup("temp","webServiceInstall","Offline mode active");window.location.reload();}},100);
}catch(e){popup("temp","webServiceInstall",`Cannot install offline mode "${e}"`);}
}else{
popup("temp","webServiceInstall",`Cannot install offline mode "Browser not support"`);
}
}
async function webServiceUninstall(){
if("serviceWorker" in navigator){
try{
const sw=await navigator.serviceWorker.getRegistrations();
if(sw.length==0){popup("temp","webServiceInstall",`Cannot Uninstall offline mode "Not found"`);}
else{
for(let i=0;i<sw.length;i++){
if(await sw[i].unregister()==true){popup("temp","webServiceInstall",`Uninstalling offline mode (${i+1})`);}
else{popup("temp","webServiceInstall",`Cannot Uninstall offline mode "Not found" (${i+1})`);}
}
window.location.reload();
}
}catch(e){
popup("temp","webServiceInstall",`Cannot Uninstall offline mode "${e}"`);
}
}
}
async function cacheStorageDelAll(){
let c=await caches.keys();
for(let i=0;i<c.length;i++){if(await caches.delete(c[i])){popup("temp","cacheStorageDel",`Deleted cache (${i+1})`)}}
cacheStorageDelCore()
}
async function toWebService(msg){
if("serviceWorker" in navigator){
let sw=await navigator.serviceWorker.ready;
sw.active.postMessage(msg);
}
}
function cacheStorageDelCore(){
toWebService({choice:"deletecore"});
}
function cacheStorageDelOther(){
toWebService({choice:"deleteother"});
}
function cacheStorageDelImage(){
toWebService({choice:"deleteimage"});
}
function changeAnimation(){
const t=hcv.settings.animationTime;
const d=hcv.settings.disableAnimation;
if(d==true){t=0}

hcvCheck("style")
hcv.settings.style.animationTime={"*,::after,::before":{"transition-duration":t+"ms","animation-duration":t+"ms"}};
}

function shortKey(k){
if(["textarea","input"].indexOf(k.target.tagName.toLowerCase())!=-1){return;}
let key='';
if(k.ctrlKey){if(key!=''){key+=','}key+="CTRL"}
if(k.altKey){if(key!=''){key+=','}key+="ALT"}
if(k.shiftKey){if(key!=''){key+=','}key+="SHIFT"}
if(k.metaKey){if(key!=''){key+=','}key+="META"}
if(key!=''){key+=','}key+=k.code.replace(/(Key|Digit)/g,"");

let sKeyName=Object.keys(hcv.settings.key);
for(let i=0;i<sKeyName.length;i++){
if(hcv.settings.key[sKeyName[i]].indexOf(key)!=-1){
k.preventDefault();
shortKeyPress(sKeyName[i]);
}
}
}
function shortKeyPress(e){
if(e=="keyHide"){
if(document.querySelectorAll(".containerWarpper.show").length>0){
document.querySelectorAll(".containerWarpper.show")[document.querySelectorAll(".containerWarpper.show").length-1].classList.remove("show");
} else{navHide("Auto")}
}
if(e=="keyFolder"){document.querySelector("#folderListWarpper").classList.toggle("show")}
if(e=="keySettings"){document.querySelector("#settingsWarpper").classList.toggle("show")}
if(e=="keyGoto"){
document.querySelector("#gotoWarpper").classList.toggle("show");
if(document.querySelector("#gotoWarpper").classList.contains("show")==true){document.querySelector("#gotoWarpper").focus();}
document.querySelector("#gotoWarpper").value="";
}
if(e=="keyPrev"){prev()}
if(e=="keyNext"){next()}
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
function dataEIEvent(){
let el=document.querySelectorAll('[data-settings-type="dataImport"],[data-settings-type="dataExport"]');
for(let i=0;i<el.length;i++){
if(el[i].dataset.settingsType=="dataExport"){
el[i].querySelector(".buttonText").addEventListener("click",function(){exportData(el[i].dataset.hcvVar);});
} else if(el[i].dataset.settingsType=="dataImport"){
el[i].querySelector("button.buttonText").addEventListener("click",function(){
const r=new FileReader();
r.onload=function(){importData(el[i].dataset.hcvVar,JSON.parse(r.result))};
r.readAsText(el[i].querySelector('input[type="file"]').files[0]);
});
}
}
}
function shortkeyEvent(){
let key=document.querySelectorAll('.settingsList[data-settings-type="shortkey"] [data-keys]');
let addKey=document.querySelectorAll('.settingsList[data-settings-type="shortkey"] button.buttonText:not([data-keys])');
for(let i=0;i<key.length;i++){key[i].addEventListener("click",function(){this.parentNode.removeChild(this);})}
for(let i=0;i<addKey.length;i++){
addKey[i].addEventListener("click",function(){
const keyIn=document.createElement("input");
keyIn.type="text";
keyIn.classList.add("buttonText");

keyIn.addEventListener("blur",function(){
if(this.value!=''&&this.parentNode.querySelectorAll('[data-keys="'+this.value.replace(' + ',',')+'"]').length<1){
const newKey=document.createElement('button');
newKey.classList.add("buttonText");
newKey.dataset.keys=this.value.replace(' + ',',');
newKey.innerHTML=this.value;
newKey.tabIndex=0;
newKey.addEventListener("click",function(){this.parentNode.removeChild(this);})
this.parentNode.querySelector(".keys").appendChild(newKey);
}
keyIn.parentNode.removeChild(keyIn);});

keyIn.addEventListener("keydown",function(k){
if(k.code!="Tab"&&k.code!="Backspace"){
if(k.code!=''&&k.key!='Control'&&k.key!='Alt'&&k.key!='Shift'&&k.key!='Meta'){let key='';
if(k.ctrlKey){if(key!=''){key+=' + '}key+="CTRL"}
if(k.altKey){if(key!=''){key+=' + '}key+="ALT"}
if(k.shiftKey){if(key!=''){key+=' + '}key+="SHIFT"}
if(k.metaKey){if(key!=''){key+=' + '}key+="META"}
if(key!=''){key+=' + '}key+=k.code.replace(/(Key|Digit)/g,"");this.value=key}
k.preventDefault();}else{this.blur()};})

this.parentNode.insertBefore(keyIn,this);
keyIn.focus();
});
}
}
function funcButtonEvent(){
let el=document.querySelectorAll('[data-settings-type="funcButton"]');
for(let i=0;i<el.length;i++){
el[i].querySelector(".buttonText").addEventListener("click",function(){callFunc(el[i].dataset.func)});
}
}


document.addEventListener("DOMContentLoaded",async function(){
hcvCheck();
await requestInfo("settings");
categorySettings();
categoryChange();
shortkeyEvent();
loadSettings();
loadRead();
await requestInfo("main",null,true);if(hcv.settings.displayAllSwitch==true){await requestInfo("current");await requestInfo("all",null,true)}else{await requestInfo("current",null,true);};
curDisFolder();
curDisImg();
checkState();
buttonValueFiller();
titleToAriaFiller();
cusSelectEvent();
dataEIEvent();
funcButtonEvent();
});
window.addEventListener("hashchange",hashPictureUpdate);
document.querySelector("#goto").addEventListener("input",gotoPage)
document.querySelector("#goto").addEventListener("focusout",function(){this.value=""})
document.addEventListener("click",function(e){if(e.target.classList.contains("containerWarpper")==true){e.target.classList.remove("show");}});
document.querySelector("#gotoOpen").addEventListener("click",function(){document.querySelector("#gotoWarpper").classList.add("show");document.querySelector("#goto").focus();document.querySelector("#goto").value="";});
document.querySelector("#gotoClose").addEventListener("click",function(){findConWarp(this).classList.remove("show");});
document.querySelector("#settingsOpen").addEventListener("click",function(){document.querySelector("#settingsWarpper").classList.add("show");});
document.querySelector("#settingsClose").addEventListener("click",function(){findConWarp(this).classList.remove("show");});
document.querySelector("#folderGoBack").addEventListener("click",function(){if(hcv.current.backDir!=null&&hcv.current.backDir!=""){history.pushState({path:hcv.current.backDir,act:"back"},"","?p="+encodeURIComponent(hcv.current.backDir)+"&fc=true");requestInfo("current",null,true,true);setFolderActive();}});
document.querySelector("#folderReload").addEventListener("click",function(){if(hcv.settings.displayAllSwitch==true){requestInfo("all",null,true,true);document.querySelector("#folderGoBack").style.display="none"}else{requestInfo("current",null,true,true);document.querySelector("#folderGoBack").style.display=""}});
document.querySelector("#folderSettings").addEventListener("click",function(){document.querySelector("#folderListSettings").classList.toggle("show")});
document.querySelector("#folderClose").addEventListener("click",function(){findConWarp(this).classList.remove("show");});
document.querySelector("#folderOpen").addEventListener("click",function(){document.querySelector("#folderListWarpper").classList.add("show");});
document.querySelector(".navHide>*:nth-child(1)").addEventListener("click",function(){navHide("Coll")});
document.querySelector(".navHide>*:nth-child(2)").addEventListener("click",function(){navHide("Ex")});
document.addEventListener("keydown",shortKey);
document.querySelector("#prev").addEventListener("click",prev);
document.querySelector("#next").addEventListener("click",next);
document.querySelector("#imgWarpper").addEventListener("click",imageTap)
document.querySelector("#settingsApply").addEventListener("click",function(){saveSettings();applySettings();});
document.querySelectorAll(".settingsName").forEach(function(el){el.addEventListener("click",function(){el.querySelector(':nth-child(2)').classList.toggle('show')})});
document.querySelector("#imgWarpper").addEventListener("mousemove",function(){hcv.naviHide=0;if((hcv.settings.autoHideNaviSwitch==true&&checkTouch()!=true)||(hcv.settings.autoHideNaviTouchSwitch==true&&checkTouch()==true)){navHide("Ex");document.querySelector("#imgWarpper").style.cursor="";}});
document.querySelector("#imgWarpper").addEventListener("mouseenter",function(){hcv.naviHide=0;clearInterval(hcv.naviHideTime);hcv.naviHideTime=setInterval(function(){if(hcv.naviHide>=30&&((hcv.settings.autoHideNaviSwitch==true&&checkTouch()!=true)||(hcv.settings.autoHideNaviTouchSwitch==true&&checkTouch()==true))){navHide("Coll");document.querySelector("#imgWarpper").style.cursor="none";}else{hcv.naviHide++}},100)});
document.querySelector("#imgWarpper").addEventListener("mouseleave",function(){hcv.naviHide=0;clearInterval(hcv.naviHideTime)});
window.addEventListener("resize",function(){setImgSize();});
window.addEventListener("resize",checkFullScreen);
document.addEventListener("fullscreenchange",checkFullScreen);
document.addEventListener("mozfullscreenchange",checkFullScreen);
document.addEventListener("webkitfullscreenchange",checkFullScreen);
document.addEventListener("msfullscreenchange",checkFullScreen);
if(navigator.serviceWorker){navigator.serviceWorker.addEventListener("message",function(e){popup("log","fromWebService",e.data.msg)})}