<?php

// Image folder location
// default: "img/"
$MAIN = "img/";

// Only show folder that name included these (still have access other folder from url)
// add world by include "," at the end of word, include "," in word by add "\" before "," ("\,")
// ex: "    not, me,i will   ,  not\, or is it?"
//     will be ==> "not" | "me" | "i will" | "not\, or is it?"
// default: null
$inclWS = null;

// Not show folder that name included these (still have access from url)
// add world by include "," at the end of word, include "," in word by add "\" before "," ("\,")
// ex: "    not, me,i will   ,  not\, or is it?"
//     will be ==> "not" | "me" | "i will" | "not\, or is it?"
// default: null
$blockWS = null;

// Client settings list and value
$settingsConfig = <<<JSON
{
"fullscreenSwitch": {
	"fullname": "Fullscreen",
	"clientEnable": true,
	"value": false
},
"uzSwitch": {
	"fullname": "Unlock Zoom",
	"clientEnable": true,
	"value": false
},
"prePrev": {
	"fullname": "Image Preload(previous)",
	"clientEnable": true,
	"value": "2"
},
"preNext": {
	"fullname": "Image Preload(next)",
	"clientEnable": true,
	"value": "5"
},
"imgTap": {
	"fullname": "Screen Tapping",
	"clientEnable": true,
	"value": "rl"
},
"pnSwitch": {
	"fullname": "Auto Change Folder",
	"clientEnable": true,
	"value": true
},
"curPathSwitch": {
	"fullname": "Show folder full path",
	"clientEnable": true,
	"value": false
},
"curDisSwitch": {
	"fullname": "Show picture fullname",
	"clientEnable": true,
	"value": false
},
"displayAllSwitch": {
	"fullname": "Display all folder",
	"clientEnable": true,
	"value": false
},
"imgFirstSwitch": {
	"fullname": "Show image folder first",
	"clientEnable": true,
	"value": true
},
"imgFolderSwitch": {
	"fullname": "Show image in folder Select",
	"clientEnable": true,
	"value": true
},
"popSwitch": {
	"fullname": "Show loading popup",
	"clientEnable": true,
	"value": false
},
"hideNaviSwitch": {
	"fullname": "Hide \\"hide navigation\\" button",
	"clientEnable": true,
	"value": true
},
"autoHideNaviSwitch": {
	"fullname": "Auto hide navigation",
	"clientEnable": true,
	"value": true
},
"autoHideNaviTouchSwitch": {
	"fullname": "Auto hide navigation(touchscreen)",
	"clientEnable": true,
	"value": false
},
"lcSettingsSwitch": {
	"fullname": "Save settings",
	"clientEnable": true,
	"value": true
},
"lcReadSwitch": {
	"fullname": "Save read progress",
	"clientEnable": true,
	"value": false
},
"infoRBG": {
	"fullname": "Read progress background color",
	"clientEnable": true,
	"value": "#000000"
},
"infoIBG": {
	"fullname": "Image count background color",
	"clientEnable": true,
	"value": "#000000"
},
"infoFBG": {
	"fullname": "Folder count background color",
	"clientEnable": true,
	"value": "#000000"
},
"imgSize": {
	"fullname": "Image scale",
	"clientEnable": true,
	"value": "100"
},
"imgPos": {
	"fullname": "Image position",
	"clientEnable": true,
	"value": "c"
},
"dirLimit": {
	"fullname": "Folder display entry limit",
	"clientEnable": true,
	"value": "30"
},
"uiSize": {
	"fullname": "UI scale",
	"clientEnable": true,
	"value": "100"
},
"expRead": {
	"fullname": "Export read",
	"clientEnable": true
},
"impRead": {
	"fullname": "Import read",
	"clientEnable": true
},
"expSettings": {
	"fullname": "Export settings",
	"clientEnable": true
},
"impSettings": {
	"fullname": "Import settings",
	"clientEnable": true
},
"includeWord": {
	"fullname": "Folder name whitelist",
	"clientEnable": true,
	"value": "",
},
"blockWord": {
	"fullname": "Folder name blacklist",
	"clientEnable": true,
	"value": ""
},
"errorNote": {
	"fullname": "In case of error or long loading...",
	"clientEnable": true
},
"keyHide": {
	"fullname": "Hide UI",
	"clientEnable": true,
	"value": [["SHIFT","Escape"],["H"]]
},
"keyFolder": {
	"fullname": "Toggle folder",
	"clientEnable": true,
	"value": [["F"]]
},
"keySettings": {
	"fullname": "Toggle settings",
	"clientEnable": true,
	"value": [["J"]]
},
"keyGoto": {
	"fullname": "Toggle goto",
	"clientEnable": true,
	"value": [["G"]]
},
"keyPrev": {
	"fullname": "Previous Image",
	"clientEnable": true,
	"value": [["ArrowLeft"],["A"]]
},
"keyNext": {
	"fullname": "Next Image",
	"clientEnable": true,
	"value": [["ArrowRight"],["D"]]
}
}
JSON;
?>