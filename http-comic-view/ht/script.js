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
const is=document.querySelector(".imgContainer>img");
if(typeof(hcv.current.picList)=="object"&&hcv.current.picList!=""&&hcv.current.picList!=null){
const ig=document.createElement("img");
ig.src=encodeURIComponent(hcv.current.path+hcv.current.picList[curGet()-1]).replace(/%2F/ig,"/");

ig.onload=function(){
let url;
let winLoO=window.location.origin;
let winLoP=window.location.pathname;
let path=encodeURIComponent(hcv.current.path+hcv.current.picList[curGet()-1]).replace(/%2F/ig,"/");
if(winLoP.charAt(winLoP.length-1)=="/"){url=winLoO+winLoP+path}
else{url=winLoO+winLoP+"/"+path}

if(ig.src==path||ig.src==url){
setImgSize(ig);
if(ic.hasChildNodes()){
for(let i=0;i<ic.childNodes.length;i++){ic.removeChild(ic.childNodes[i])}
}
ic.appendChild(ig);
}
}
}else{
if(ic.hasChildNodes()){for(let i=0;i<ic.childNodes.length;i++){ic.removeChild(ic.childNodes[i])}}
}
}
function curGet(){
let g=parseInt(window.location.hash.replace("#",""));
if(g!=null&&g<=hcv.current.picList.length&&g!=""&&isNaN(g)==false){var re=g} else{var re=1}
return re
}
function prev(){
let cur=curGet();
if(document.querySelector("#pnSwitch > input[type=checkbox]").checked==true && typeof(hcv.current.previousDir)=="object" && cur <=1){
history.pushState({path:hcv.current.previousDir.path,page:1},"","?p="+encodeURIComponent(hcv.current.previousDir.path)+"&fc=true#1");
requestInfo("current",null,false,true);setFolderActive();
} else if(0==hcv.current.picList.length){
cur=hcv.current.picList.length;
history.pushState({path:hcv.current.path,page:cur},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+cur);
hashPictureUpdate();
} else if(cur <=1){
cur=1
} else {
--cur;
history.pushState({path:hcv.current.path,page:cur},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+cur);
hashPictureUpdate();
}
if(document.querySelector(".imgContainer").style.height=="auto"){document.body.scrollTop=0;document.documentElement.scrollTop=0;}
}
function next(){
let cur=curGet();
if(document.querySelector("#pnSwitch > input[type=checkbox]").checked==true && typeof(hcv.current.nextDir)=="object" && cur >=hcv.current.picList.length){
history.pushState({path:hcv.current.nextDir.path,page:1},"","?p="+encodeURIComponent(hcv.current.nextDir.path)+"&fc=true#1");
requestInfo("current",null,false,true);setFolderActive();
} else if(cur >=hcv.current.picList.length){
cur=hcv.current.picList.length;
history.pushState({path:hcv.current.path,page:cur},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+cur);
hashPictureUpdate();
} else {
++cur;
history.pushState({path:hcv.current.path,page:cur},"","?p="+encodeURIComponent(hcv.current.path)+"&fc=true#"+cur);
hashPictureUpdate();
}

if(document.querySelector(".imgContainer").style.height=="auto"){document.body.scrollTop=0;document.documentElement.scrollTop=0;}
}
function hashPictureUpdate(){
let cur=curGet();
curDisplayChange()
setImg()
if(cur<hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur]).replace(/%2F/ig,"/"))}
if(cur+1<hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur+1]).replace(/%2F/ig,"/"))}
if(cur+2<hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur+2]).replace(/%2F/ig,"/"))}
if(cur-2>0&&cur-2<=hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur-2]).replace(/%2F/ig,"/"))}
if(cur-3>0&&cur-3<=hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur-3]).replace(/%2F/ig,"/"))}
if(cur-4>0&&cur-4<=hcv.current.picList.length){preloadImage(encodeURIComponent(hcv.current.path+hcv.current.picList[cur-4]).replace(/%2F/ig,"/"))}
}

function requestInfo(type,quary=null,first=false,reload=false){
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
else if(type=="specific"){request="type=specific&p="+encodeURIComponent(quary)}
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
if(typeof hcv=="undefined"){hcv={}}

if(type=="main"){hcv.main=JSON.parse(xhr.responseText)}
else if(type=="all"){hcv.all=JSON.parse(xhr.responseText)}
else if(type=="current"){hcv.current=JSON.parse(xhr.responseText)}

if(reload==true){loadFolder();hashPictureUpdate();}
return JSON.parse(xhr.responseText);
}
}
xhr.open("POST","request",async);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send(request);
}

function curDisplayChange(){
if(0==hcv.current.picList.length){document.querySelector("#cur").innerHTML="0 / 0";}
else{document.querySelector("#cur").innerHTML=document.querySelector("#gotoOpen").value=curGet()+" / "+hcv.current.picList.length;}
if(typeof(hcv.current.picList[curGet()-1])!="undefined"){
document.querySelector("#currentDisplay").innerHTML=hcv.current.picList[curGet()-1];
} else{document.querySelector("#currentDisplay").innerHTML="N/A";}
}
function curFolderChange(){
const curFolder=document.querySelector("#currentFolder");
if(document.querySelector("#curPathSwitch > input[type=checkbox]").checked==true){
curFolder.innerHTML=hcv.current.path;
}else{curFolder.innerHTML=hcv.current.name;}
}
/*function folderSplit(ar=hcv.current.dirList,size=50,output=hcv.current.test,selfcall=false){
if(selfcall!=true){output=[];}
if(ar.length/size>=1){
output.push(ar.slice(0,size));
tes(ar.slice(size),size,output,true);
}else{
output.push(ar);
}
}*/
function loadFolder(){
curFolderChange()
document.querySelector("#folderListContainer").innerHTML="";
let lo,valid,notValid;
if(document.querySelector("#displayAllSwitch > input[type=checkbox]").checked==true){lo=hcv.all;} else{lo=hcv.current;}
if(document.querySelector("#imgFirstSwitch > input[type=checkbox]").checked==true){
valid=lo.dirValid;
notValid=lo.dirNotValid;

if(valid!=null&&valid!=""){for (let i=0;i<valid.length;i++){loadFolderDiv(valid[i].name,valid[i].path,encodeURIComponent(valid[i].path),valid[i].pic)}}
if(notValid!=null&&notValid!=""){for (let i=0;i<notValid.length;i++){loadFolderDiv(notValid[i].name,notValid[i].path,encodeURIComponent(notValid[i].path),notValid[i].pic)}}
setFolderActive();
}else{
for(let i=0;i<lo.dirList.length;i++){loadFolderDiv(lo.dirList[i].name,lo.dirList[i].path,encodeURIComponent(lo.dirList[i].path),lo.dirList[i].pic)}
}
}
function loadFolderDiv(text,path,encPath,imageUrl){
const a=document.createElement("a");
const div=document.createElement("div");
const img=document.createElement("img");
if(document.querySelector("#displayAllSwitch > input[type=checkbox]").checked==false){div.innerHTML=text;a.title=text;}else{div.innerHTML=path;a.title=path;}
a.classList.add("folderListNode");
a.href=window.location.origin+window.location.pathname+"?p="+encPath+"&fc=true#1";
a.addEventListener("click",function(e){e.preventDefault();
if(path!=window.location.search){history.pushState({path:path},"","?p="+encPath+"&fc=true");requestInfo("current",null,false,true);setFolderActive();}});
if(imageUrl!=="notvalid"&&document.querySelector("#imgFolderSwitch > input[type=checkbox]").checked==true){
img.src=encodeURIComponent(path+imageUrl).replace(/%2F/ig,"/");a.appendChild(img);}
a.appendChild(div);
document.querySelector("#folderListContainer").appendChild(a);
}
function setFolderActive(){
let quary=window.location.search.slice(1).split("&");
let re={};
for(let i=0;i < quary.length;i++){
re[quary[i].split("=")[0]]={};
re[quary[i].split("=")[0]]=quary[i].split("=")[1];
}
if(re["p"]==null || re["p"]=="" || re["p"]==NaN){re["p"]="img/";}
for (let i=0;i < document.querySelectorAll(".folderListNode").length;i++){
if(document.querySelectorAll(".folderListNode")[i].title==decodeURIComponent(re["p"])){
for (let i=0;i < document.querySelectorAll(".folderListNode.folderListNodeActive").length;i++){
document.querySelectorAll(".folderListNode.folderListNodeActive")[i].classList.remove("folderListNodeActive");
}
document.querySelectorAll(".folderListNode")[i].classList.add("folderListNodeActive");
}
}
}
function checkFullScreen(){
const pg=window.document;
if(pg.fullscreenElement !=null || pg.mozFullScreenElement !=null || pg.webkitFullscreenElement !=null || pg.msFullscreenElement !=null){
document.querySelector("#fullscreenSwitch > input[type=checkbox]").checked=true;
} else {document.querySelector("#fullscreenSwitch > input[type=checkbox]").checked=false;}
}
function changeFullScreen(){
const requestFullScreen=window.document.documentElement.requestFullscreen || window.document.documentElement.mozRequestFullScreen || window.document.documentElement.webkitRequestFullScreen || window.document.documentElement.msRequestFullscreen;
const exitFullScreen=window.document.exitFullscreen || window.document.mozCancelFullScreen || window.document.webkitExitFullscreen || window.document.msExitFullscreen;
if(document.querySelector("#fullscreenSwitch > input[type=checkbox]").checked==true){
requestFullScreen.call(window.document.documentElement);
} else {exitFullScreen.call(window.document);}
}
function changeLR(){
const l=document.querySelector("#imgWarpper > .L.nc");
const r=document.querySelector("#imgWarpper > .R.nc");
if(document.querySelector("#lrSwitch > input[type=checkbox]").checked==true){
l.style.display="";r.style.display="";
} else {l.style.display="none";r.style.display="none";}
}
function changeLRInv(){
const l=document.querySelector("#imgWarpper > .L.nc");
const r=document.querySelector("#imgWarpper > .R.nc");
if(document.querySelector("#lrInvSwitch > input[type=checkbox]").checked==true){
l.removeEventListener("click",prev);l.addEventListener("click",next);
r.removeEventListener("click",next);r.addEventListener("click",prev);
} else {
l.removeEventListener("click",next);l.addEventListener("click",prev);
r.removeEventListener("click",prev);r.addEventListener("click",next);
}
}
function changeCurDis(){
const curDisplayP=document.querySelector("#currentDisplayP");
if(document.querySelector("#curDisSwitch > input[type=checkbox]").checked==true){
curDisplayP.style.display="";
} else {curDisplayP.style.display="none";}
}
function changeUZ(){
if(document.querySelector("#uzSwitch > input[type=checkbox]").checked==true){
document.getElementsByName("viewport")[0].content="width=device-width,initial-scale=1.0,maximum-scale=30.0,minimum-scale=1.0,user-scalable=yes";
} else {document.getElementsByName("viewport")[0].content="width=device-width,initial-scale=1.0,maximum-scale=3.0,minimum-scale=1.0,user-scalable=yes";}
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
const img=document.querySelector(".imgContainer>img");
if(e=="Full Width"){
document.querySelector(".imgContainer").style.height="auto";
document.querySelector(".imgContainer").dataset.imgSize="width";
setImgSize();
}else if(e=="Full Height"){
document.querySelector(".imgContainer").style.height="";
document.querySelector(".imgContainer").dataset.imgSize="height";
setImgSize();
} else{
if (isNaN(parseFloat(e))==false&&parseFloat(e)>0&&(parseFloat(e)<100||parseFloat(e)==100)){
document.querySelector(".imgContainer").style.height="";
document.querySelector(".imgContainer").dataset.imgSize=parseFloat(e);
setImgSize();
}
else{console.error("What are you doing!!! (input: \""+e+"\" function: \"changeImgSize()\")")}
}
}
function changeImgPos(e){
const con=document.querySelector(".imgContainer");
if(e=="Top Left"){
con.style.justifyContent="left";
con.style.alignItems="flex-start";
} else if(e=="Top"){
con.style.justifyContent="center";
con.style.alignItems="flex-start";
} else if(e=="Top Right"){
con.style.justifyContent="right";
con.style.alignItems="flex-start";
} else if(e=="Left"){
con.style.justifyContent="left";
con.style.alignItems="center";
} else if(e=="Center"){
con.style.justifyContent="center";
con.style.alignItems="center";
} else if(e=="Right"){
con.style.justifyContent="right";
con.style.alignItems="center";
} else if(e=="Bottom Left"){
con.style.justifyContent="left";
con.style.alignItems="flex-end";
} else if(e=="Bottom"){
con.style.justifyContent="center";
con.style.alignItems="flex-end";
} else if(e=="Bottom Right"){
con.style.justifyContent="right";
con.style.alignItems="flex-end";
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
} else if (this.value !=""){
this.value=parseInt(this.value,10);
window.location.hash=this.value=parseInt(this.value,10);
}
}
function popShow(){
if(document.querySelector("#popSwitch > input[type=checkbox]").checked==true){
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
function setImgSize(img=document.querySelector(".imgContainer>img")){
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
else if(bOrent=="W"&&iOrent=="W"){
	if(cAsp=="body"){re="h";}
	else if(cAsp=="img"){re="w";}
}else if(bOrent=="H"&&iOrent=="H"){
	if(cAsp=="body"){re="w";}
	else if(cAsp=="img"){re="h";}
}
else{re="w"}

if(re=="w"){
img.style.width=percent+"%";
img.style.height="";
}else if(re=="h"){
img.style.width="";
img.style.height=percent+"%";
}
}
function compareImgAspect(img=document.querySelector(".imgContainer>img")){
let bW=document.body.offsetWidth;
let bH=document.body.offsetHeight;
let iW=img.naturalWidth;
let iH=img.naturalHeight;

if(bW>bH){
if(bW/bH>iW/iH){return "body";}
else if(bW/bH<iW/iH){return "img";}
else{return "body";}
} else if(bW<bH){
if(bH/bW>iH/iW){return "body";}
else if(bH/bW<iH/iW){return "img";}
else{return "body";}
}
}
function checkTouch(){
return (('ontouchstart' in window)||(navigator.maxTouchPoints>0)||(navigator.msMaxTouchPoints>0));
}
function hideCusSelect(){
for(let i=0;i<document.querySelectorAll(".seCon.show").length;i++){document.querySelectorAll(".seCon.show")[i].classList.remove("show");}
for(let i=0;i<document.querySelectorAll(".seTed.show").length;i++){document.querySelectorAll(".seTed.show")[i].classList.remove("show");}
}
function findConWarp(ele,fwtime=0){
fwtime++;
let re="";
if(ele.classList.contains("containerWarpper")==true){re=ele;}
else if(ele==document.body){re=null}
else{re=findConWarp(ele.parentNode,fwtime);}
return re;
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

seTed.addEventListener("click",function(){if(this.classList.contains("show")){hideCusSelect();this.classList.remove("show");this.parentNode.querySelector(".seCon").classList.remove("show");}else{hideCusSelect();this.classList.add("show");this.parentNode.querySelector(".seCon").classList.add("show");}});
for(let i=0;i<seCC.length;i++){
seCC[i].addEventListener("click",function(){
let parent=this.parentNode.parentNode;
parent.querySelector("select").selectedIndex=i;
parent.querySelector(".seTed").innerHTML=this.innerHTML;
parent.querySelector(".seTed").dataset.selectedKey=this.dataset.key;
parent.querySelector(".seTed").classList.remove("show");
this.parentNode.classList.remove("show");
for(let i=0;i<parent.querySelectorAll(".seCC").length;i++){
parent.querySelectorAll(".seCC")[i].classList.remove("seced");}
this.classList.add("seced");
})
}
}
}

function postScript(){
/*---- addevent to image size ----*/
for(let i=0;i < document.querySelectorAll("#imgSize>button").length;i++){
document.querySelectorAll("#imgSize>button")[i].addEventListener("click",function(){changeImgSize(this.textContent)})
}
/*---- addevent to image position ----*/
for(let i=0;i < document.querySelectorAll("#imgPos>*>button").length;i++){
document.querySelectorAll("#imgPos>*>button")[i].addEventListener("click",function(){changeImgPos(this.textContent)})
}
/*---- addevent to custom selector ----*/
cusSelectEvent();
}


document.addEventListener("DOMContentLoaded",function(){requestInfo("main",null,true)});
document.addEventListener("DOMContentLoaded",function(){requestInfo("current",null,true)});
document.addEventListener("DOMContentLoaded",function(){requestInfo("all",null,true)});
document.addEventListener("DOMContentLoaded",loadFolder);
document.addEventListener("DOMContentLoaded",curDisplayChange);
document.addEventListener("DOMContentLoaded",checkState);
document.addEventListener("DOMContentLoaded",setImg);
document.addEventListener("DOMContentLoaded",buttonValueFiller);
document.addEventListener("DOMContentLoaded",postScript);
window.addEventListener("hashchange",hashPictureUpdate);
window.addEventListener("popstate",function(e){console.log(e.state);if(e.state !=null && e.state !="" && e.state !=NaN){requestInfo("current",null,false,true);if(document.querySelector("#displayAllSwitch > input[type=checkbox]").checked!=true){loadFolder()}}});
document.querySelector("#goto").addEventListener("input",gotoPage)
document.querySelector("#goto").addEventListener("focusout",function(){this.value=""})
document.addEventListener("click",function(e){if(e.target.classList.contains("containerWarpper")==true){e.target.classList.remove("show");}});
document.querySelector("#gotoOpen").addEventListener("click",function(){document.querySelector("#gotoWarpper").classList.add("show");document.querySelector("#goto").focus();document.querySelector("#goto").value="";});
document.querySelector("#gotoClose").addEventListener("click",function(){findConWarp(this).classList.remove("show");});
document.querySelector("#settingsOpen").addEventListener("click",function(){document.querySelector("#settingsWarpper").classList.add("show");});
document.querySelector("#settingsClose").addEventListener("click",function(){findConWarp(this).classList.remove("show");});
document.querySelector("#folderGoBack").addEventListener("click",function(){if(hcv.current.backDir!=null&&hcv.current.backDir!=""){history.pushState({path:hcv.current.backDir},"","?p="+encodeURIComponent(hcv.current.backDir)+"&fc=true#1");requestInfo("current",null,false,true);setFolderActive();}});
document.querySelector("#folderReload").addEventListener("click",function(){if(document.querySelector("#displayAllSwitch > input[type=checkbox]").checked==true){requestInfo("all",null,false,true);document.querySelector("#folderGoBack").style.display="none"}else{requestInfo("current",null,false,true);document.querySelector("#folderGoBack").style.display=""}});
document.querySelector("#folderClose").addEventListener("click",function(){findConWarp(this).classList.remove("show");});
document.querySelector("#folderOpen").addEventListener("click",function(){document.querySelector("#folderListWarpper").classList.add("show");});
document.querySelector("#navHideEx").addEventListener("click",function(){navHide("Ex")});
document.querySelector("#navHideColl").addEventListener("click",function(){navHide("Coll")});
document.addEventListener("keydown",function(k){shortKey(k)});
document.querySelector("#prev").addEventListener("click",prev);
document.querySelector("#next").addEventListener("click",next);
document.querySelector("#imgWarpper>div.L").addEventListener("click",prev);
document.querySelector("#imgWarpper>div.R").addEventListener("click",next);
document.querySelector("#fullscreenSwitch>input[type=checkbox]").addEventListener("click",changeFullScreen);
document.querySelector("#lrSwitch>input[type=checkbox]").addEventListener("click",changeLR);
document.querySelector("#lrInvSwitch >input[type=checkbox]").addEventListener("click",changeLRInv);
document.querySelector("#curPathSwitch>input[type=checkbox]").addEventListener("click",curFolderChange);
document.querySelector("#curDisSwitch>input[type=checkbox]").addEventListener("click",changeCurDis);
document.querySelector("#uzSwitch>input[type=checkbox]").addEventListener("click",changeUZ);
document.querySelector("#popSwitch>input[type=checkbox]").addEventListener("click",popShow);
document.querySelector("#imgWarpper").addEventListener("mousemove",function(){hcv.naviHide=0;if((document.querySelector("#autoHideNaviSwitch>input[type=checkbox]").checked==true&&checkTouch()!=true)||(document.querySelector("#autoHideNaviTouchSwitch>input[type=checkbox]").checked==true&&checkTouch()==true)){navHide("Ex")}});
document.querySelector("#imgWarpper").addEventListener("mouseenter",function(){hcv.naviHide=0;hcv.naviHideTime=setInterval(function(){if(hcv.naviHide==30&&((document.querySelector("#autoHideNaviSwitch>input[type=checkbox]").checked==true&&checkTouch()!=true)||(document.querySelector("#autoHideNaviTouchSwitch>input[type=checkbox]").checked==true&&checkTouch()==true))){navHide("Coll")}else{hcv.naviHide++}},100)});
document.querySelector("#imgWarpper").addEventListener("mouseleave",function(){hcv.naviHide=0;clearInterval(hcv.naviHideTime)});
window.addEventListener("resize",function(){setImgSize()});
document.addEventListener("fullscreenchange",checkFullScreen);
document.addEventListener("mozfullscreenchange",checkFullScreen);
document.addEventListener("webkitfullscreenchange",checkFullScreen);
document.addEventListener("msfullscreenchange",checkFullScreen);