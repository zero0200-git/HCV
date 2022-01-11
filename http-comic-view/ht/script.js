function preloadImage(lo){
const i = new Image();
i.src = lo;
}
function setImg(){
const is = document.querySelector("#imgWarpper > div.imgContener.nc > img");
if(document.querySelector("#imgWarpper > div.imgContener.nc").hasChildNodes() == false){
const i = new Image();
i.src = encodeURIComponent(currentFolder.curDir+currentFolder.picList[curGet()-1]).replace(/%2F/ig,"/");
document.querySelector("#imgWarpper > div.imgContener.nc").appendChild(i);
} else {is.src = encodeURIComponent(currentFolder.curDir+currentFolder.picList[curGet()-1]).replace(/%2F/ig,"/");}
}
function curGet(){
let g = window.location.hash.replace("#", "");
if(g != null && g <= currentFolder.picList.length && g != "") {var re = g} else {var re = 1}
return re
}
function prev(){
let cur = curGet();
if(0 == currentFolder.picList.length) {cur = currentFolder.picList.length} else if(cur <= 1) {cur = 1} else {--cur;window.location.hash = cur}
window.location.hash = cur;
}
function next(){
let cur = curGet();
if(cur >= currentFolder.picList.length) {cur = currentFolder.picList.length} else {++cur;window.location.hash = cur}
window.location.hash = cur;
}
function hashPictureUpdate() {
let cur = curGet();
curChange()
setImg()
if(cur-2>1){preloadImage(encodeURIComponent(currentFolder.curDir+currentFolder.picList[cur-3]).replace(/%2F/ig,"/"))}
if(cur-1>1){preloadImage(encodeURIComponent(currentFolder.curDir+currentFolder.picList[cur-2]).replace(/%2F/ig,"/"))}
if(cur>1){preloadImage(encodeURIComponent(currentFolder.curDir+currentFolder.picList[cur-2]).replace(/%2F/ig,"/"))}
if(cur<currentFolder.picList.length){preloadImage(encodeURIComponent(currentFolder.curDir+currentFolder.picList[cur]).replace(/%2F/ig,"/"))}
if(cur+1<currentFolder.picList.length){preloadImage(encodeURIComponent(currentFolder.curDir+currentFolder.picList[cur+1]).replace(/%2F/ig,"/"))}
if(cur+2<currentFolder.picList.length){preloadImage(encodeURIComponent(currentFolder.curDir+currentFolder.picList[cur+2]).replace(/%2F/ig,"/"))}
}
function firstLoadImageList() {
const xhttp = new XMLHttpRequest();
let re = {};
let quary = window.location.search.slice(1).split("&")
for(let i = 0;i < quary.length;i++) {
re[quary[i].split("=")[0]] = {};
re[quary[i].split("=")[0]] = quary[i].split("=")[1];
}
if(re["p"] == null || re["p"] == "" || re["p"] == NaN){re["p"] = "img/"}
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
currentFolder = JSON.parse(xhttp.responseText);
hashPictureUpdate()
document.querySelector("#currentFolder").innerHTML = currentFolder.curDir;
document.querySelector("#currentDisplay").innerHTML = currentFolder.picList[curGet()-1];
}
};
xhttp.open("GET", "request.php?p="+re["p"], false);
xhttp.send();
}
function firstLoadFolderList() {
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
document.querySelector("#folderListContainer").innerHTML="";
allFolder = JSON.parse(xhttp.responseText);
loadFolder();addFolderClick();
}
};
xhttp.open("GET", "request.php", false);
xhttp.send();
}
function loadImageList() {
const xhttp = new XMLHttpRequest();
let re = {};
let quary = window.location.search.slice(1).split("&")
for(let i = 0;i < quary.length;i++) {
re[quary[i].split("=")[0]] = {};
re[quary[i].split("=")[0]] = quary[i].split("=")[1];
}
if(re["p"] == null || re["p"] == "" || re["p"] == NaN){re["p"] = "img/"}
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
currentFolder = JSON.parse(xhttp.responseText);
hashPictureUpdate();
document.querySelector("#currentFolder").innerHTML = currentFolder.curDir;
document.querySelector("#currentDisplay").innerHTML = currentFolder.picList[curGet()-1];
}
};
xhttp.open("GET", "request.php?p="+re["p"], true);
xhttp.send();
}
function loadFolderList() {
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
document.querySelector("#folderListContainer").innerHTML="";
allFolder = JSON.parse(xhttp.responseText);
loadFolder();addFolderClick();
}
};
xhttp.open("GET", "request.php", true);
xhttp.send();
}
function curChange(){
if(0 == currentFolder.picList.length){document.querySelector("#cur").innerHTML = "0 / 0";}
else{document.querySelector("#cur").innerHTML = curGet()+" / "+currentFolder.picList.length;}
document.querySelector("#currentDisplay").innerHTML = currentFolder.picList[curGet()-1];
}
function loadFolderDiv(text,image) {
const a = document.createElement('a');
const div = document.createElement('div');
const img = document.createElement('img');
a.className = "folderListNode";
a.href = window.location.origin+window.location.pathname+"?p="+encodeURIComponent(text)+"&fc=true#1";
a.title = text;
div.innerHTML = text;
if(image !== "notvalid"){img.src = encodeURIComponent(text+image).replace(/%2F/ig,"/");
a.appendChild(img);}
a.appendChild(div);
document.querySelector('#folderListContainer').appendChild(a)
}
function loadFolder() {
document.querySelector("#currentFolder").innerHTML = currentFolder.curDir;
for (let i = 0;i < allFolder.allDirValid.length;i++) {loadFolderDiv(allFolder.allDirValid[i][0],allFolder.allDirValid[i][1])}
for (let i = 0;i < allFolder.allDirNotValid.length;i++) {loadFolderDiv(allFolder.allDirNotValid[i][0],allFolder.allDirNotValid[i][1])}
}
function addFolderClick() {
for (let i = 0;i < allFolder.allDirValid.length;i++) {
document.getElementsByClassName("folderListNode")[i].addEventListener("click", function(e){e.preventDefault();if(document.getElementsByClassName("folderListNode")[i].search!=window.location.search){history.pushState({path:encodeURIComponent(allFolder.allDirValid[i][0])},"","?p="+encodeURIComponent(allFolder.allDirValid[i][0])+"&fc=true#1");loadImageList()}});
}
for (let i = 0;i < allFolder.allDirNotValid.length;i++) {
document.getElementsByClassName("folderListNode")[i+allFolder.allDirValid.length].addEventListener("click", function(e){e.preventDefault();history.pushState({path:encodeURIComponent(allFolder.allDirNotValid[i][0])},"","?p="+encodeURIComponent(allFolder.allDirNotValid[i][0])+"&fc=true");loadImageList()});
}
}
function checkFullScreen() {
const pg = window.document;
if(pg.fullscreenElement != null || pg.mozFullScreenElement != null || pg.webkitFullscreenElement != null || pg.msFullscreenElement != null) {
document.querySelector("#fullscreenSwitch > input[type=checkbox]").checked = true;
} else {document.querySelector("#fullscreenSwitch > input[type=checkbox]").checked = false;}
}
function changeFullScreen() {
const requestFullScreen = window.document.documentElement.requestFullscreen || window.document.documentElement.mozRequestFullScreen || window.document.documentElement.webkitRequestFullScreen || window.document.documentElement.msRequestFullscreen;
const exitFullScreen = window.document.exitFullscreen || window.document.mozCancelFullScreen || window.document.webkitExitFullscreen || window.document.msExitFullscreen;
if(document.querySelector("#fullscreenSwitch > input[type=checkbox]").checked == true) {
requestFullScreen.call(window.document.documentElement);
} else {exitFullScreen.call(window.document);}
}
function changeLR() {
const l = document.querySelector("#imgWarpper > .L.nc");
const r = document.querySelector("#imgWarpper > .R.nc");
if(document.querySelector("#lrSwitch > input[type=checkbox]").checked == true) {
l.style.display="";r.style.display="";
} else {l.style.display="none";r.style.display="none";}
}
function changeLRInv() {
const l = document.querySelector("#imgWarpper > .L.nc");
const r = document.querySelector("#imgWarpper > .R.nc");
if(document.querySelector("#lrInvSwitch > input[type=checkbox]").checked == true) {
l.removeEventListener("click", prev);l.addEventListener("click", next);
r.removeEventListener("click", next);r.addEventListener("click", prev);
} else {
l.removeEventListener("click", next);l.addEventListener("click", prev);
r.removeEventListener("click", prev);r.addEventListener("click", next);
}
}
function changeCur() {
const curDisplayP = document.querySelector("#currentDisplayP");
if(document.querySelector("#curSwitch > input[type=checkbox]").checked == true) {
curDisplayP.style.display="";
} else {curDisplayP.style.display="none";}
}
function changeUZ() {
if(document.querySelector("#uzSwitch > input[type=checkbox]").checked == true) {
document.getElementsByName("viewport")[0].content="width=device-width, initial-scale=1.0, maximum-scale=30.0, minimum-scale=1.0, user-scalable=yes";
} else {document.getElementsByName("viewport")[0].content="width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0, user-scalable=yes";}
}
function buttonFiller() {
const bt = document.querySelectorAll("button");
for(let i = 0;i < bt.length;i++){
if(bt[i].textContent == ""){
bt[i].textContent = bt[i].value
}
if(bt[i].value == ""){
bt[i].value = bt[i].textContent
}
}
}
function changeImgSize(e) {
const img = document.querySelector(".imgContener>img");
if(e=="Full Width"){
img.style.width = "100%";
img.style.height = "100%";
document.querySelector(".imgContener").style.height = "auto";
} else{
if (isNaN(parseFloat(e)) == false && parseFloat(e) > 0 && (parseFloat(e) < 100 || parseFloat(e) == 100)){
img.style.width = parseFloat(e)+"%";
img.style.height = parseFloat(e)+"%";
document.querySelector(".imgContener").style.height = "";
}
else{console.error("What are you doing!!! (input: \""+e+"\" function: \"changeImgSize()\"")}
}
}
function changeImgPos(e) {
const con = document.querySelector(".imgContener");
if(e=="Top Left"){
con.style.justifyContent = "left";
con.style.alignItems = "flex-start";
} else if(e=="Top"){
con.style.justifyContent = "center";
con.style.alignItems = "flex-start";
} else if(e=="Top Right"){
con.style.justifyContent = "right";
con.style.alignItems = "flex-start";
} else if(e=="Left"){
con.style.justifyContent = "left";
con.style.alignItems = "center";
} else if(e=="Center"){
con.style.justifyContent = "center";
con.style.alignItems = "center";
} else if(e=="Right"){
con.style.justifyContent = "right";
con.style.alignItems = "center";
} else if(e=="Bottom Left"){
con.style.justifyContent = "left";
con.style.alignItems = "flex-end";
} else if(e=="Bottom"){
con.style.justifyContent = "center";
con.style.alignItems = "flex-end";
} else if(e=="Bottom Right"){
con.style.justifyContent = "right";
con.style.alignItems = "flex-end";
} else{console.error("What are you doing!!! (input: \""+e+"\" function: \"changeImgPos()\"")}
}
function navHide(e) {
if(e=="Ex"){
for(let i = 0;i < document.querySelectorAll("#navWarpper > *").length;i++){document.querySelectorAll("#navWarpper > *")[i].style.display = "";}
document.querySelector("#navWarpper").style.background = "";
document.querySelector("#navWarpper > #navHideEx").style.display = "none";
document.querySelector("#navWarpper > #navHideColl").style.display = "";
} else if(e=="Coll"){
for(let i = 0;i < document.querySelectorAll("#navWarpper > *").length;i++){document.querySelectorAll("#navWarpper > *")[i].style.display = "none";}
document.querySelector("#navWarpper").style.background = "transparent";
document.querySelector("#navWarpper > #navHideEx").style.display = "";
} else{console.error("What are you doing!!! (input: \""+e+"\" function: \"navHide()\"")}
}
function gotoPage() {
if(parseInt(this.value,10)>currentFolder.picList.length){
this.value = currentFolder.picList.length;
}
if(parseInt(this.value,10)<0||parseInt(this.value,10)==null||parseInt(this.value,10)==NaN||parseInt(this.value,10)===0){
this.value = 1;
}
if(currentFolder.picList.length==0||currentFolder.picList.length==null||currentFolder.picList.length==NaN){
this.value = "";
} else{
this.value = parseInt(this.value,10);
window.location.hash = this.value = parseInt(this.value,10);
}
}

function settingPostScript() {
/*---- addevent to image size ----*/
for(let i = 0;i < document.querySelectorAll("#imgSize>button").length;i++){
document.querySelectorAll("#imgSize>button")[i].addEventListener("click", function(){changeImgSize(this.textContent)})
}
/*---- addevent to image position ----*/
for(let i = 0;i < document.querySelectorAll("#imgPos>button").length;i++){
document.querySelectorAll("#imgPos>button")[i].addEventListener("click", function(){changeImgPos(this.textContent)})
}

}

document.addEventListener("DOMContentLoaded", firstLoadFolderList);
document.addEventListener("DOMContentLoaded", firstLoadImageList);
document.addEventListener("DOMContentLoaded", curChange);
document.addEventListener("DOMContentLoaded", setImg);
document.addEventListener("DOMContentLoaded", buttonFiller);
document.addEventListener("DOMContentLoaded", settingPostScript);
window.addEventListener('hashchange', hashPictureUpdate);
window.addEventListener("popstate", function(e){if(e.state != null && e.state != "" && e.state != NaN){loadImageList()}});
document.querySelector("#goto").addEventListener("input", gotoPage)
document.querySelector("#goto").addEventListener("focusout", function(){this.value = ""})
document.addEventListener("click", function(e){if(e.target == document.querySelector("#gotoWarpper")){document.querySelector("#gotoWarpper").style.display = "none";document.querySelector("#goto").focus();document.querySelector("#goto").value="";}});
document.addEventListener("click", function(e){if(e.target == document.querySelector("#settingsWarpper")){document.querySelector("#settingsWarpper").style.display = "none";}});
document.addEventListener("click", function(e){if(e.target == document.querySelector("#folderListWarpper")){document.querySelector("#folderListWarpper").style.display = "none";}});
document.querySelector("#gotoOpen").addEventListener("click", function(){document.querySelector("#gotoWarpper").style.display = "block";document.querySelector("#goto").focus();document.querySelector("#goto").value="";});
document.querySelector("#gotoClose").addEventListener("click", function(){document.querySelector("#gotoWarpper").style.display = "none";document.querySelector("#goto").focus();document.querySelector("#goto").value="";});
document.querySelector("#settingsOpen").addEventListener("click", function(){document.querySelector("#settingsWarpper").style.display = "block";});
document.querySelector("#settingsClose").addEventListener("click", function(){document.querySelector("#settingsWarpper").style.display = "none";});
document.querySelector("#folderRefresh").addEventListener("click", loadFolderList);
document.querySelector("#folderClose").addEventListener("click", function(){document.querySelector("#folderListWarpper").style.display = "none";});
document.querySelector("#folderOpen").addEventListener("click", function(){document.querySelector("#folderListWarpper").style.display = "block";});
document.querySelector("#navHideEx").addEventListener("click", function(){navHide("Ex")});
document.querySelector("#navHideColl").addEventListener("click", function(){navHide("Coll")});
document.querySelector("#prev").addEventListener("click", prev);
document.querySelector("#next").addEventListener("click", next);
document.querySelector("#imgWarpper > div.L").addEventListener("click", prev);
document.querySelector("#imgWarpper > div.R").addEventListener("click", next);
document.querySelector("#fullscreenSwitch > input[type=checkbox]").addEventListener("click", changeFullScreen);
document.querySelector("#lrSwitch > input[type=checkbox]").addEventListener("click", changeLR);
document.querySelector("#lrInvSwitch > input[type=checkbox]").addEventListener("click", changeLRInv);
document.querySelector("#curSwitch > input[type=checkbox]").addEventListener("click", changeCur);
document.querySelector("#uzSwitch > input[type=checkbox]").addEventListener("click", changeUZ);
document.addEventListener("fullscreenchange", checkFullScreen);
document.addEventListener("mozfullscreenchange", checkFullScreen);
document.addEventListener("webkitfullscreenchange", checkFullScreen);
document.addEventListener("msfullscreenchange", checkFullScreen);