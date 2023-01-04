<?php 
include "config.php";
include "settings.php";

function getSettingValue(){
require "settings.php";
include "config.php";
$settings=[];
$settingsD=json_decode($settingsDefault,true);
$settingsC=json_decode($settingsConfig,true);
$key = array_keys($settingsD);

foreach($key as $name){
	if(in_array($settingsD[$name]["type"],["button","file"])!=true){
		if(is_array($settingsC[$name])==true){$settings[$name]=array_merge($settingsD[$name],$settingsC[$name])["value"];}
		else{$settings[$name]=$settingsD[$name]["value"];}
	}
}
return $settings;
}

var_dump(getSettingValue());

//<path d="m11,16 a5 5,0,0,0,10 0 a5 5,0,1,0,-10 0 m2,-14 h6 q-2.5,6 5,4 l"></path>

//async function newRequestInfo(type,query=null){
//	let request;
//	if(type!=undefined&&type!=null&&type!=""){type=type.toLowerCase()}else{return}
//	
//	if(type=="main"){request="type=main"}
//	else if(type=="all"){request="type=all"}
//	else if(type=="specific"){request="type=specific&p="+encodeURIComponent(query)}
//	else if(type=="current"){
//	let url=window.location.search.slice(1).split("&");
//	let re={};
//	for(let i=0;i<url.length;i++){re[url[i].split("=")[0]]={};re[url[i].split("=")[0]]=url[i].split("=")[1];}
//	if(re["p"]==null||re["p"]==""){re["p"]=hcv.main}
//	request="type=specific&p="+re["p"]
//	}
//	else{console.error("not support input type \""+type+"\"");return;}
//	
//	return response=fetch("request",{
//	method:'POST',
//	cache:'no-cache',
//	credentials:'same-origin',
//	headers:{'Content-type':'application/x-www-form-urlencoded'},
//	body:request 
//	})
//	.then((response)=>response.json())
//	.then((data)=>{
//	if(type=="main"){hcv.main=data;}
//	else if(type=="all"){hcv.all=data;}
//	else if(type=="current"){hcv.current=data;}
//	return data;
//	})
//	.catch((error)=>{console.error(error);});
//	
//	
//	}
?>