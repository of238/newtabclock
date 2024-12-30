function htmlescape(e){
    return e.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("'","&#39;")
}
window.addEventListener("DOMContentLoaded",()=>{
    list=document.getElementById("list");
    inputbox=document.getElementById("inputbox");
    const search_google_function=(v)=>{
        v=JSON.parse(v);
        e=v[0];
        let i,j;
        i="";
        if(v[0].slice(0,2)!="<?"){
            j=v[1];
        }else{
            let d=new DOMParser();
            d=d.parseFromString(e,"text/xml");
            if(d.querySelectorAll("suggestion").length==0){
            }
            j=Array.from(d.querySelectorAll("suggestion")).map(e=>{return e.getAttribute("data")});
            i=v[1];
        }
        j=j.filter(e=>{return e!=i});
        if(i!="")j.unshift(htmlescape(i+"")+"<span class='graytext'> - Google検索</span>");j=Array.from(new Set(j));list.style.height=list.length*20+"px";list.innerHTML=j.map(e=>{return "<a style='text-decoration:none;color:black;display:block;display:flex;align-items:center;height:44px;' href='https://www.google.com/search?q="+e.replace(/<span.+/,"")+"' class='matches' title=''><div style='display:block;margin:20px;margin-right:12px;width:20px;height:20px;-webkit-mask-repeat:no-repeat;-webkit-mask-size:100%;-webkit-mask-image: url(./svg/icon_search.svg);background-color:gray'></div><div style='background-color:transparent'>"+e+"</div></a>"}).join("")};
    inputbox.addEventListener("keyup",(e)=>{
        if(e.keyCode==13){
            e.preventDefault();
            window.open("https://www.google.com/search?&q="+encodeURIComponent(e.target.value),"_self")
        }
    },false)
    inputbox.addEventListener("focus",(e)=>{
        focus=false;mouse=false;
        chrome.runtime.sendMessage({word:(e.target.value || ""),type:"search_google",recheck:true}).then(search_google_function);
    })
    inputbox.addEventListener("input",(e)=>{
        chrome.runtime.sendMessage({word:(e.target.value || ""),type:"search_google"}).then(search_google_function);
    })
    inputbox.addEventListener("blur",()=>{
        if(mouse==false&&focus==false)list.innerHTML="";
    })
    inputbox.addEventListener("keydown",(e)=>{
        if(e.key=="Tab"){focus=true;}else{focus=false;}
    })
    list.addEventListener("mouseover",()=>{
        mouse=true;
    });
    list.addEventListener("focus",()=>{
        focus=true;
    });
    list.addEventListener("blur",()=>{
        focus=false;
    });
    list.addEventListener("mouseleave",()=>{
        mouse=false;
    });
    document.getElementById("popup-menu-bar").addEventListener("mousewheel",(e)=>{e.currentTarget.scrollBy(e.deltaY,0)})
});


window.addEventListener("DOMContentLoaded",()=>{
    list2=document.getElementById("list2");
    inputbox2=document.getElementById("inputbox2");
    inputbox2.addEventListener("keyup",(e)=>{
        if(!bing_enable)return;
        if(e.keyCode==13){
            e.preventDefault();
            window.open("https://www.bing.com/search?q="+encodeURIComponent(e.target.value),"_self")
        }
    },false)
    inputbox2.addEventListener("focus",(e)=>{
        if(!bing_enable)return;
        focus2=false;mouse2=false;
        chrome.runtime.sendMessage({word:(e.target.value || ""),type:"search_bing",recheck:true}).then(e=>{j=JSON.parse(e)[1];list2.style.height=list2.length*20+"px";list2.innerHTML=j.map(e=>{return "<a style='margin:0;text-decoration:none;color:black;display:flex;align-items:center;height:44px;' href='https://www.bing.com/search?q="+e+"' class='matches' title=''><div style='display:block;margin:20px;margin-right:12px;width:20px;height:20px;-webkit-mask-repeat:no-repeat;-webkit-mask-size:100%;-webkit-mask-image: url(./svg/icon_search.svg);background-color:gray'></div><div style='background-color:transparent'>"+e+"</div></a>"}).join("")});
    })
    inputbox2.addEventListener("input",(e)=>{
        if(!bing_enable)return;
        chrome.runtime.sendMessage({word:(e.target.value || ""),type:"search_bing"}).then(e=>{j=JSON.parse(e);if(j[0]!="")j[1].unshift(htmlescape(j[0])+"<span class='graytext'> - Bing検索</span>");j=Array.from(new Set(j[1]));list2.style.height=list2.length*20+"px";list2.innerHTML=j.map(e=>{return "<a style='text-decoration:none;color:black;display:block;display:flex;align-items:center;height:44px;' href='https://www.bing.com/search?q="+e.replace(/<span.+/,"")+"' class='matches' title=''><div style='display:block;margin:20px;margin-right:12px;width:20px;height:20px;-webkit-mask-repeat:no-repeat;-webkit-mask-size:100%;-webkit-mask-image: url(./svg/icon_search.svg);background-color:gray'></div><div style='background-color:transparent'>"+e+"</div></a>"}).join("")});
    })
    inputbox2.addEventListener("blur",()=>{
        if(!bing_enable)return;
        if(mouse2==false&&focus2==false)list2.innerHTML="";
    })
    inputbox2.addEventListener("keydown",(e)=>{
        if(!bing_enable)return;
        if(e.key=="Tab"){focus2=true;}else{focus2=false;}
    },false)
    list2.addEventListener("mouseover",()=>{
        if(!bing_enable)return;
        mouse2=true;
    });
    list2.addEventListener("blur",()=>{
        if(!bing_enable)return;
        focus2=false;
    });
    list2.addEventListener("mouseleave",()=>{
        if(!bing_enable)return;
        mouse2=false;
    });
});

window.addEventListener("DOMContentLoaded",()=>{
    inputbox.addEventListener("input",(e)=>{(e);if(!e.inputType){("end");return}inputbox2.value=inputbox.value;inputbox2.dispatchEvent(new Event("input",e))})
    inputbox.addEventListener("keyup",(e)=>{(e);if(!e.key){("end");return}inputbox2.value=inputbox.value;inputbox2.dispatchEvent(new Event("keyup",e))})
    inputbox2.addEventListener("input",(e)=>{(e);if(!e.inputType){("end");return}inputbox.value=inputbox2.value;inputbox.dispatchEvent(new Event("input",e))})
    inputbox2.addEventListener("keyup",(e)=>{(e);if(!e.key){("end");return}inputbox.value=inputbox2.value;inputbox.dispatchEvent(new Event("keyup",e))})
    inputbox.addEventListener("focus",(e)=>{if(!e.view){("end");return}inputbox2.value=inputbox.value;inputbox2.dispatchEvent(new Event("focus",e))})
    inputbox2.addEventListener("focus",(e)=>{if(!e.view){("end");return}inputbox.value=inputbox2.value;inputbox.dispatchEvent(new Event("focus",e))})
    inputbox.addEventListener("blur",(e)=>{if(!e.view){("end");return}inputbox2.value=inputbox.value;inputbox2.dispatchEvent(new Event("blur",e))})
    inputbox2.addEventListener("blur",(e)=>{if(!e.view){("end");return}inputbox.value=inputbox2.value;inputbox.dispatchEvent(new Event("blur",e))})
});
window.addEventListener("DOMContentLoaded",()=>{
    window.bing_enable=false;
    chrome.storage.local.get("clocktype",(e)=>{if(e["clocktype"]!=undefined){try{clockframe.src=e["clocktype"]+"clock.html"}catch(e){console.log(e);}}else{clockframe.src="デジタルclock.html";chrome.storage.local.set({clocktype:"デジタル"},()=>{})}})
    chrome.storage.local.get("title",(e)=>{if(e["title"]!=undefined){try{document.title=e["title"]}catch(e){console.log(e);}}else{document.title="新しきタブ";chrome.storage.local.set({title:"新しきタブ"},()=>{})}})
    chrome.storage.local.get("bing",(e)=>{if(e["bing"]!=undefined){try{style.disabled=window.bing_enable=Boolean(e["bing"]=="true")}catch(e){console.log(e);};}else{chrome.storage.local.set({bing:"false"},()=>{});}})
    chrome.storage.local.get("menus",(e)=>{if(e["menus"]!=undefined){Array.from(document.querySelectorAll(".popup-menu-bar-item")).filter(f=>{return JSON.parse(e["menus"]).indexOf(f.getAttribute("data-url"))!=-1}).forEach(e=>{e.style.display="flex";})}else{defaultmenus=["googleapps.html","weather.html","random.html","clocktimer.html","primenumber.html","settings.html","about.html"];Array.from(document.querySelectorAll(".popup-menu-bar-item")).filter(f=>{return defaultmenus.indexOf(f.getAttribute("data-url"))!=-1}).forEach(e=>{e.style.display="flex";});chrome.storage.local.set({menus:JSON.stringify(defaultmenus)},()=>{})}});
})