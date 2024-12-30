function set1(e){
Array.from(document.querySelectorAll('svg.segment')[e-1].children[0].children).forEach((el)=>{el.setAttribute('class','light_off')})
document.querySelectorAll('svg.segment')[e-1].children[0].children[2].setAttribute('class','light_on');document.querySelectorAll('svg.segment')[e-1].children[0].children[5].setAttribute('class','light_on');
}
function set2(e){
Array.from(document.querySelectorAll('svg.segment')[e-1].children[0].children).forEach((el)=>{el.setAttribute('class','light_off')})
document.querySelectorAll('svg.segment')[e-1].children[0].children[0].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[2].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[4].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[6].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[3].setAttribute('class','light_on');
}
function set3(e){
Array.from(document.querySelectorAll('svg.segment')[e-1].children[0].children).forEach((el)=>{el.setAttribute('class','light_off')})
document.querySelectorAll('svg.segment')[e-1].children[0].children[0].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[2].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[5].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[6].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[3].setAttribute('class','light_on');
}
function set4(e){
Array.from(document.querySelectorAll('svg.segment')[e-1].children[0].children).forEach((el)=>{el.setAttribute('class','light_off')})
document.querySelectorAll('svg.segment')[e-1].children[0].children[1].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[2].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[5].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[3].setAttribute('class','light_on');
}
function set5(e){
Array.from(document.querySelectorAll('svg.segment')[e-1].children[0].children).forEach((el)=>{el.setAttribute('class','light_off')})
document.querySelectorAll('svg.segment')[e-1].children[0].children[0].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[1].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[5].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[3].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[6].setAttribute('class','light_on');
}
function set6(e){
Array.from(document.querySelectorAll('svg.segment')[e-1].children[0].children).forEach((el)=>{el.setAttribute('class','light_off')})
document.querySelectorAll('svg.segment')[e-1].children[0].children[0].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[1].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[5].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[3].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[6].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[4].setAttribute('class','light_on');
}
function set7(e){
Array.from(document.querySelectorAll('svg.segment')[e-1].children[0].children).forEach((el)=>{el.setAttribute('class','light_off')})
document.querySelectorAll('svg.segment')[e-1].children[0].children[0].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[2].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[5].setAttribute('class','light_on');
document.querySelectorAll('svg.segment')[e-1].children[0].children[1].setAttribute('class','light_on');
}
function set8(e){
Array.from(document.querySelectorAll('svg.segment')[e-1].children[0].children).forEach((el)=>{el.setAttribute('class','light_on')})
}
function set9(e){
Array.from(document.querySelectorAll('svg.segment')[e-1].children[0].children).forEach((el)=>{el.setAttribute('class','light_on')})
document.querySelectorAll('svg.segment')[e-1].children[0].children[4].setAttribute('class','light_off');}
function set0(e){
Array.from(document.querySelectorAll('svg.segment')[e-1].children[0].children).forEach((el)=>{el.setAttribute('class','light_on')})
document.querySelectorAll('svg.segment')[e-1].children[0].children[3].setAttribute('class','light_off');
}
function setcolon(){Array.from(document.getElementById('colon').children).forEach((el)=>{el.setAttribute('class','light_on')})}
function set(n,e){
switch(n){
case 0:set0(e);break;
case 1:set1(e);break;
case 2:set2(e);break;
case 3:set3(e);break;
case 4:set4(e);break;
case 5:set5(e);break;
case 6:set6(e);break;
case 7:set7(e);break;
case 8:set8(e);break;
case 9:set9(e);break;
default:break;
}
}
window.onload=()=>{
    chrome.storage.local.get("backgroundcolor",(e)=>{if(e["backgroundcolor"]!=undefined){try{sheet=style.sheet;sheet.insertRule(`body{background-color:${e["backgroundcolor"]} !important;}`);}catch(e){chrome.storage.local.set({backgroundcolor:"#000000"},()=>{})}}})
    chrome.storage.local.get("segmentcolor",(e)=>{if(e["segmentcolor"]!=undefined){try{sheet=style.sheet;sheet.insertRule(`.light_on{fill:${e["segmentcolor"]} !important;}`);}catch(e){chrome.storage.local.set({segmentcolor:"#ff0000"},()=>{})}}})
time=120;
const r=requestAnimationFrame;
rendering=function(){setcolon();date=new Date();set(Math.floor(date.getHours()/10),1);set(date.getHours()%10,2);set(Math.floor(date.getMinutes()/10),3);set(date.getMinutes()%10,4);set(Math.floor(date.getSeconds()/10),5);set(date.getSeconds()%10,6);r(rendering)}
rendering()
}
window.addEventListener("DOMContentLoaded",()=>{
    
})
window.addEventListener("keydown",(e)=>{
    window.parent.postMessage("{\"key\":\""+e.key+"\",\"altKey\":"+e.altKey+"}");
})