keyshortcut=(e)=>{
    if(popup_open==true){
        if(((e.key=="m")&&e.altKey)||(e.key=="Escape")){
            closepopup()
        }
    }
    else if(popup_open==false){
        if(e.key=="m"&&e.altKey==true){
            showpopup()
        }
    }
    if(e.altKey){
        menutabs=document.querySelectorAll(".popup-menu-bar-item");
        switch(e.key){
            case "a":showpopup("googleapps.html");break;
            case "w":showpopup("weather.html");break;
            case "s":showpopup("settings.html");break;
            case "v":showpopup("about.html");break;
            case "q":if(document.querySelector('[data-url="googleapps.html"]').style.display=="flex"){showpopup("googleapps.html")};break;
            case "w":if(document.querySelector('[data-url="weather.html"]').style.display=="flex"){showpopup("weather.html")};break;
            case "e":try{e.preventDefault();}catch(e){}if(document.querySelector('[data-url="random.html"]').style.display=="flex"){showpopup("random.html")};break;
            case "r":if(document.querySelector('[data-url="clocktimer.html"]').style.display=="flex"){showpopup("clocktimer.html")};break;
            case "t":if(document.querySelector('[data-url="primenumber.html"]').style.display=="flex"){showpopup("primenumber.html")};break;
            case "y":if(document.querySelector('[data-url="bing_chat.html"]').style.display=="flex"){showpopup("bing_chat.html")};break;
            case "u":if(document.querySelector('[data-url="qrcodereader1.html"]').style.display=="flex"){showpopup("qrcodereader1.html")};break;
            case "i":if(document.querySelector('[data-url="settings.html"]').style.display=="flex"){showpopup("settings.html")};break;
            case "o":if(document.querySelector('[data-url="about.html"]').style.display=="flex"){showpopup("about.html")};break;
        }
    }
};
window.addEventListener("keydown",keyshortcut);
window.addEventListener("message",(e)=>{
    e=JSON.parse(e.data.replaceAll("\\","\\\\"));
    /*console.log(e)*/
    keyshortcut(e);
});