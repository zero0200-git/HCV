<?php $settingsDefault = <<<JSON
{
	"fullscreenSwitch": {
		"name": "fullscreenSwitch",
		"category": "Display",
		"fullname": "Fullscreen",
		"description": "Enable-Disable Fullscreen",
		"type": "switch",
		"clientEnable": true,
		"value": false
	},
	"uzSwitch": {
		"name": "uzSwitch",
		"category": "Function",
		"fullname": "Unlock Zoom",
		"description": "Unlock more zoom on pinch to zoom enable device(eg. smartphone), May not work",
		"type": "switch",
		"clientEnable": true,
		"value": false
	},
	"prePrev": {
		"name": "prePrev",
		"category": "Function",
		"fullname": "Image Preload(previous)",
		"description": "Change number of preload image",
		"type": "select",
		"clientEnable": true,
		"value": "2",
		"selection": {"0":"off", "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", "6":"6", "7":"7", "8":"8", "9":"9", "10":"10"}
	},
	"preNext": {
		"name": "preNext",
		"category": "Function",
		"fullname": "Image Preload(next)",
		"description": "Change number of preload image",
		"type": "select",
		"clientEnable": true,
		"value": "5",
		"selection": {"0":"off", "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", "6":"6", "7":"7", "8":"8", "9":"9", "10":"10"}
	},
	"imgTap": {
		"name": "imgTap",
		"category": "Function",
		"fullname": "Screen Tapping",
		"description": "Change tapping to next image selection or turn off",
		"type": "select",
		"clientEnable": true,
		"value": "rl",
		"selection": {"lr":"Left of image", "rl":"Right of image", "False": "Off"}
	},
	"pnSwitch": {
		"name": "pnSwitch",
		"category": "Function",
		"fullname": "Auto Change Folder",
		"description": "Change to \\"previous/next\\" folder automatically if go \\"back/next\\" on \\"first/last\\" page",
		"type": "switch",
		"clientEnable": true,
		"value": true
	},
	"curPathSwitch": {
		"name": "curPathSwitch",
		"category": "Function",
		"fullname": "Show folder full path",
		"description": "Show full path of current folder in folder Select",
		"type": "switch",
		"clientEnable": true,
		"value": false
	},
	"curDisSwitch": {
		"name": "curDisSwitch",
		"category": "Function",
		"fullname": "Show picture fullname",
		"description": "Show fullname of current image and current image number of current folder in folder Select",
		"type": "switch",
		"clientEnable": true,
		"value": false
	},
	"displayAllSwitch": {
		"name": "displayAllSwitch",
		"category": "Display",
		"fullname": "Display all folder",
		"description": "Display all folder include all sub-folder in folder Select (*Very lag or maybe crash browser if have a lot of image folder)",
		"type": "switch",
		"clientEnable": true,
		"value": false
	},
	"imgFirstSwitch": {
		"name": "imgFirstSwitch",
		"category": "Display",
		"fullname": "Show image folder first",
		"description": "Show folder that have image first in folder Select",
		"type": "switch",
		"clientEnable": true,
		"value": true
	},
	"imgFolderSwitch": {
		"name": "imgFolderSwitch",
		"category": "Display",
		"fullname": "Show image in folder Select",
		"description": "Show (first) image of folder in folder Select",
		"type": "switch",
		"clientEnable": true,
		"value": true
	},
	"popSwitch": {
		"name": "popSwitch",
		"category": "Display",
		"fullname": "Show loading popup",
		"description": "Only show image preloading for now",
		"type": "switch",
		"clientEnable": true,
		"value": false
	},
	"hideNaviSwitch": {
		"name": "hideNaviSwitch",
		"category": "Function",
		"fullname": "Hide \\"hide navigation\\" button",
		"description": "Recommend to turn on if \\"Auto hide navigation\\" enable",
		"type": "switch",
		"clientEnable": true,
		"value": true
	},
	"autoHideNaviSwitch": {
		"name": "autoHideNaviSwitch",
		"category": "Function",
		"fullname": "Auto hide navigation",
		"description": "Auto hide navigation when cannot detect mouse movement within 3 seconds",
		"type": "switch",
		"clientEnable": true,
		"value": true
	},
	"autoHideNaviTouchSwitch": {
		"name": "autoHideNaviTouchSwitch",
		"category": "Function",
		"fullname": "Auto hide navigation(touchscreen)",
		"description": "Auto hide navigation when cannot detect movement on touchscreen (*Need to enable normal \\"Auto hide navigation\\")",
		"type": "switch",
		"clientEnable": true,
		"value": false
	},
	"lcSettingsSwitch": {
		"name": "lcSettingsSwitch",
		"category": "Function",
		"fullname": "Save settings",
		"description": "Save settings config in this browser",
		"type": "switch",
		"clientEnable": true,
		"value": true
	},
	"lcReadSwitch": {
		"name": "lcReadSwitch",
		"category": "Function",
		"fullname": "Save read progress",
		"description": "Save read progress in this browser",
		"type": "switch",
		"clientEnable": true,
		"value": false
	},
	"infoRBG": {
		"name": "infoRBG",
		"category": "Function",
		"fullname": "Read progress background color",
		"description": "Read progress background color top left of element in folder Select",
		"type": "color",
		"clientEnable": true,
		"value": "#000000",
		"css": "background",
		"query": ".folderListNode>[data-node-type=info]>[data-node-type=read]"
	},
	"infoIBG": {
		"name": "infoIBG",
		"category": "Function",
		"fullname": "Image count background color",
		"description": "Image count background color top left of element in folder Select",
		"type": "color",
		"clientEnable": true,
		"value": "#000000",
		"css": "background",
		"query": ".folderListNode>[data-node-type=info]>[data-node-type=image]"
	},
	"infoFBG": {
		"name": "infoFBG",
		"category": "Function",
		"fullname": "Folder count background color",
		"description": "Inside folder count background color top left of element in folder Select",
		"type": "color",
		"clientEnable": true,
		"value": "#000000",
		"css": "background",
		"query": ".folderListNode>[data-node-type=info]>[data-node-type=folder]"
	},
	"imgSize": {
		"name": "imgSize",
		"category": "Display",
		"fullname": "Image scale",
		"description": "Image scaling, \\"100%\\" meaning will try to will fit image within screen without stretching, \\"Fit height\\" need \\"Left\\" settings Image position",
		"type": "select",
		"clientEnable": true,
		"value": "100",
		"selection": {"w":"Full width", "h":"Full height", "100":"100%", "80":"80%", "75":"75%", "60":"60%", "50":"50%", "35":"35%", "10":"10%"}
	},
	"imgPos": {
		"name": "imgPos",
		"category": "Display",
		"fullname": "Image position",
		"description": "Change image display position, maybe you need it?",
		"type": "select",
		"clientEnable": true,
		"value": "c",
		"selection": {"t":"Top", "c":"Center", "b":"Bottom", "l":"Left", "r":"Right", "tl":"Top Left", "tr":"Top Right", "bl":"Bottom Left", "br":"Bottom Right"}
	},
	"dirLimit": {
		"name": "dirLimit",
		"category": "Display",
		"fullname": "Folder display limit",
		"description": "Limit display entry in folder Select",
		"type": "select",
		"clientEnable": true,
		"value": "30",
		"selection": {"False":"None", "100":"100", "75":"75", "50":"50", "30":"30", "25":"25", "20":"20", "15":"15", "10":"10"}
	},
	"uiSize": {
		"name": "uiSize",
		"category": "Display",
		"fullname": "UI scale",
		"description": "Set UI size, not perfect",
		"type": "select",
		"clientEnable": true,
		"value": "100",
		"selection": {"300":"300%", "250":"250%", "200":"200%", "150":"150%", "120":"120%", "110": "110%", "100":"100%", "90":"90%", "80":"80%", "75":"75%", "60":"60%", "50":"50%", "35":"35%"}
	},
	"expRead": {
		"name": "expRead",
		"category": "Misc",
		"fullname": "Export read",
		"description": "Export current session read data",
		"type": "dataExport",
		"clientEnable": true,
		"value": "read",
		"display": "Download",
		"function": "exportData"
	},
	"impRead": {
		"name": "impRead",
		"category": "Misc",
		"fullname": "Import Read",
		"description": "Import Read data to current session",
		"type": "dataImport",
		"clientEnable": true,
		"value": "read",
		"display": "Choose File",
		"function": "importData"
	},
	"expSettings": {
		"name": "expSettings",
		"category": "Misc",
		"fullname": "Export settings",
		"description": "Export current session settings data",
		"type": "dataExport",
		"clientEnable": true,
		"value": "settings",
		"display": "Download",
		"function": "exportData"
	},
	"impSettings": {
		"name": "impSettings",
		"category": "Misc",
		"fullname": "Import settings",
		"description": "Import settings data to current session",
		"type": "dataImport",
		"clientEnable": true,
		"value": "settings",
		"display": "Choose File",
		"function": "importData"
	},
	"includeWord": {
		"name": "includeWord",
		"category": "Function",
		"fullname": "Folder name whitelist",
		"description": "Only show folder that name included these, *Need to reload folder\\nadd world by include \\",\\" at the end of word, include \\",\\" in word by add \\"\\\\\\" before \\",\\" (\\"\\\\,\\")\\nex: \\"    not, me,i will   ,  not\\\\, or is it?\\"\\n    will be ==> \\"not\\" | \\"me\\" | \\"i will\\" | \\"not, or is it?\\"",
		"type": "text",
		"clientEnable": true,
		"value": "",
		"display": "whitelist word"
	},
	"blockWord": {
		"name": "blockWord",
		"category": "Function",
		"fullname": "Folder name blacklist",
		"description": "Not show folder that name included these, *Need to reload folder\\nadd world by include \\",\\" at the end of word, include \\",\\" in word by add \\"\\\\\\" before \\",\\" (\\"\\\\,\\")\\nex: \\"    not, me,i will   ,  not\\\\, or is it?\\"\\n    will be ==> \\"not\\" | \\"me\\" | \\"i will\\" | \\"not, or is it?\\"",
		"type": "text",
		"clientEnable": true,
		"value": "",
		"display": "blacklist word"
	},
	"errorNote": {
		"name": "errorNote",
		"category": "Misc",
		"fullname": "In case of error or long loading...",
		"description": "Try to click \\"Apply\\" and reload to reset settings, maybe it can help",
		"type": "note",
		"clientEnable": true
	},
	"keyHide": {
		"name": "keyHide",
		"category": "Shortcut",
		"fullname": "Hide UI",
		"description": "Hide any UI panel and/or hide or show navigation bar",
		"type": "key",
		"clientEnable": true,
		"value": [["SHIFT","Escape"],["H"]],
		"function": "hide"
	},
	"keyFolder": {
		"name": "keyFolder",
		"category": "Shortcut",
		"fullname": "Toggle folder",
		"description": "Hide or show Folder Panel",
		"type": "key",
		"clientEnable": true,
		"value": [["F"]],
		"function": "folder"
	},
	"keySettings": {
		"name": "keySettings",
		"category": "Shortcut",
		"fullname": "Toggle settings",
		"description": "Hide or show Settings Panel",
		"type": "key",
		"clientEnable": true,
		"value": [["J"]],
		"function": "settings"
	},
	"keyGoto": {
		"name": "keyGoto",
		"category": "Shortcut",
		"fullname": "Toggle goto",
		"description": "Hide or show Goto Panel",
		"type": "key",
		"clientEnable": true,
		"value": [["G"]],
		"function": "goto"
	},
	"keyPrev": {
		"name": "keyPrev",
		"category": "Shortcut",
		"fullname": "Previous Image",
		"description": "Go to previous image",
		"type": "key",
		"clientEnable": true,
		"value": [["ArrowLeft"],["A"]],
		"function": "prev"
	},
	"keyNext": {
		"name": "keyNext",
		"category": "Shortcut",
		"fullname": "Next Image",
		"description": "Go to next image",
		"type": "key",
		"clientEnable": true,
		"value": [["ArrowRight"],["D"]],
		"function": "next"
	}
	
}
JSON;?>