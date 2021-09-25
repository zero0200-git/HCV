function preloadImage(lo){
const i = new Image();
i.src = lo;
}
function loadImg(){
const i = new Image();
const con = document.querySelector('div.imgContener');
i.src = pic[curGet()-1];
if(con.hasChildNodes()) {while (con.hasChildNodes()) {con.removeChild(con.firstChild)}}
con.appendChild(i);
}
function curGet(){
let g = window.location.hash.replace("#", "");
if(g != null && g <= pic.length && g != "") {var re = g} else {var re = 1}
return re
}
function prev(){
let cur = curGet();
if(cur <= 1) {cur = 1} else {--cur;window.location.hash = cur}
curChange()
loadImg()
}
function next(){
let cur = curGet();
if(cur >= pic.length) {cur = pic.length} else {++cur;window.location.hash = cur}
curChange()
loadImg()
}
function curChange(){
document.querySelector("#cur").innerHTML = curGet()+" / "+pic.length;
}
function loadFolderDiv(text,image) {
const folder = document.createElement('button');
const p = document.createElement('p');
const img = document.createElement('img');
folder.className = "folderListNode";
p.innerHTML = text;
if(image !== "notvalid"){img.src = image;folder.appendChild(img);}
folder.appendChild(p);
document.querySelector('#folderList').appendChild(folder)
}
function loadFolder() {
for (let i = 0;i < folder.valid.length;i++) {loadFolderDiv(folder.valid[i][0],folder.valid[i][1])}
for (let i = 0;i < folder.notValid.length;i++) {loadFolderDiv(folder.notValid[i][0],folder.notValid[i][1])}
}
function addFolderClick() {
for (let i = 0;i < folder.valid.length;i++) {
document.getElementsByClassName("folderListNode")[i].addEventListener("click", function(){window.location.hash = "#1";window.location.search = "p="+encodeURIComponent(folder.valid[i][0]) + "&fc=true"});
}
for (let i = 0;i < folder.notValid.length;i++) {
document.getElementsByClassName("folderListNode")[i+folder.valid.length].addEventListener("click", function(){window.location.hash = "#1";window.location.search = "p="+encodeURIComponent(folder.notValid[i][0])});
}
}
function checkFullScreen() {
const pg = window.document;
if(pg.fullscreenElement != null || pg.mozFullScreenElement != null || pg.webkitFullscreenElement != null || pg.msFullscreenElement != null) {
document.querySelector("#settingContainer > label > input[type=checkbox]").checked = true;
} else {document.querySelector("#settingContainer > label > input[type=checkbox]").checked = false;}
}
function changeFullScreen() {
const requestFullScreen = window.document.documentElement.requestFullscreen || window.document.documentElement.mozRequestFullScreen || window.document.documentElement.webkitRequestFullScreen || window.document.documentElement.msRequestFullscreen;
const exitFullScreen = window.document.exitFullscreen || window.document.mozCancelFullScreen || window.document.webkitExitFullscreen || window.document.msExitFullscreen;
if(document.querySelector("#fullscreenSwitch > input[type=checkbox]").checked) {
requestFullScreen.call(window.document.documentElement);
} else {exitFullScreen.call(window.document);}
}


document.addEventListener("DOMContentLoaded", curChange);
document.addEventListener("DOMContentLoaded", loadImg);
document.addEventListener("DOMContentLoaded", function(){loadFolder();addFolderClick()});
document.addEventListener("click", function(event){if(event.target == document.querySelector("#settingsWarpper")){document.querySelector("#settingsWarpper").style.display = "none";}});
document.addEventListener("click", function(event){if(event.target == document.querySelector("#folderListWarpper")){document.querySelector("#folderListWarpper").style.display = "none";}});
document.querySelector("#settingsOpen").addEventListener("click", function(){document.querySelector("#settingsWarpper").style.display = "block";});
document.querySelector("#folderListHead > button").addEventListener("click", function(){document.querySelector("#folderListWarpper").style.display = "none";});
document.querySelector("#folderOpen").addEventListener("click", function(){document.querySelector("#folderListWarpper").style.display = "block";});
document.querySelector("#prev").addEventListener("click", prev);
document.querySelector("#next").addEventListener("click", next);
document.querySelector("#imgWarpper > div.L").addEventListener("click", prev);
document.querySelector("#imgWarpper > div.R").addEventListener("click", next);
document.querySelector("#fullscreenSwitch > input[type=checkbox]").addEventListener("click", changeFullScreen);
document.addEventListener("fullscreenchange", checkFullScreen);
document.addEventListener("mozfullscreenchange", checkFullScreen);
document.addEventListener("webkitfullscreenchange", checkFullScreen);
document.addEventListener("msfullscreenchange", checkFullScreen);