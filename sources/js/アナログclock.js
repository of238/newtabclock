window.addEventListener("load",()=>{
SETTINGS_HAND_COLOR="#000000";
SETTINGS_CLOCK_COLOR="#0f2278";
chrome.storage.local.get("backgroundcolor",(e)=>{if(e["backgroundcolor"]!=undefined){try{sheet=style.sheet;sheet.insertRule(`body{background-color:${e["backgroundcolor"]} !important;}`);}catch(e){chrome.storage.local.set({backgroundcolor:"#000000"},()=>{})}}})
chrome.storage.local.get("clockcolor",(e)=>{
    if(e["clockcolor"]!=undefined){try{SETTINGS_CLOCK_COLOR=e["clockcolor"];}catch(e){}}else{chrome.storage.local.set({clockcolor:SETTINGS_CLOCK_COLOR},()=>{})};
    clockbackground.setAttribute("fill",SETTINGS_CLOCK_COLOR);
});
chrome.storage.local.get("handcolor",(e)=>{
    if(e["handcolor"]!=undefined){try{SETTINGS_HAND_COLOR=e["handcolor"];}catch(e){}}else{chrome.storage.local.set({handcolor:SETTINGS_HAND_COLOR},()=>{})}
    tansin.setAttribute("fill",SETTINGS_HAND_COLOR);
    byosin.setAttribute("fill",SETTINGS_HAND_COLOR);
    chosin.setAttribute("fill",SETTINGS_HAND_COLOR);
    circle.setAttribute("fill",SETTINGS_HAND_COLOR);
});
const r=requestAnimationFrame;
const rqa=(e)=>{e();r(e)}
hour2=hour3=minute2=minute3=second2=second3=0;
f=[];
rqa(f[0]=()=>{second=new Date().getSeconds()*6;second+=second2;if(second<second3){second+=360;second2+=360;}second3=second;byosin.style.transform=`rotate(${second}deg)`;r(f[0]);})
rqa(f[1]=()=>{minute=new Date().getMinutes()*6;minute+=minute2;if(minute<minute3){minute+=360;minute2+=360;}minute3=minute;chosin.style.transform=`rotate(${minute}deg)`;r(f[1]);})
rqa(f[2]=()=>{hour=new Date().getHours()*30+new Date().getMinutes()/2;hour+=hour2;if(hour<hour3){hour+=360;hour2+=360;}hour3=hour;tansin.style.transform=`rotate(${hour}deg)`;r(f[2]);})
})