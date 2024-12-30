window.addEventListener("DOMContentLoaded",()=>{
    chrome.storage.local.get("backgroundcolor",(e)=>{if(e["backgroundcolor"]!=undefined){setting_background.value=e["backgroundcolor"]}else{setting_background.value="#000000"}});
    chrome.storage.local.get("segmentcolor",(e)=>{if(e["segmentcolor"]!=undefined){setting_segmentcolor.value=e["segmentcolor"]}else{setting_segmentcolor.value="#ff0000"};});
    chrome.storage.local.get("handcolor",(e)=>{if(e["handcolor"]!=undefined){setting_handcolor.value=e["handcolor"]}else{setting_handcolor.value="#000000"};});
    chrome.storage.local.get("clockcolor",(e)=>{if(e["clockcolor"]!=undefined){setting_clockcolor.value=e["clockcolor"]}else{setting_clockcolor.value="#0f2278"};});
    chrome.storage.local.get("clocktype",(e)=>{if(e["clocktype"]!=undefined){setting_clocktype.value=e["clocktype"]}else{setting_clocktype.value="デジタル"};setting_clocktype.dispatchEvent(new Event("input"))});
    chrome.storage.local.get("bing",(e)=>{if(e["bing"]!=undefined){if(e["bing"]=="true"){setting_bing.change()}}else{}});
    chrome.storage.local.get("title",(e)=>{if(e["title"]!=undefined){try{setting_tabtitle.value=e["title"]}catch(e){console.log(e);}}else{setting_tabtitle.value="新しきタブ";chrome.storage.local.set({title:"新しきタブ"},()=>{})}})
    chrome.storage.local.get("menus",(e)=>{if(e["menus"]!=undefined){Array.from(menusettings.querySelectorAll("input[type='checkbox']")).filter(f=>{return JSON.parse(e["menus"]).indexOf(f.getAttribute("data-url"))!=-1}).forEach(e=>{e.checked=true;})}else{defaultmenus=["googleapps.html","weather.html","random.html","clocktimer.html","primenumber.html","settings.html","about.html"];Array.from(menusettings.querySelectorAll("input[type='checkbox']")).filter(f=>{return defaultmenus.indexOf(f.getAttribute("data-url"))!=-1}).forEach(e=>{e.checked=true;});chrome.storage.local.set({menus:JSON.stringify(defaultmenus)},()=>{})}});
    savebutton.addEventListener("click",()=>{
        data={};
        data["backgroundcolor"]=setting_background.value;
        data["segmentcolor"]=setting_segmentcolor.value;
        data["clocktype"]=setting_clocktype.value;
        data["handcolor"]=setting_handcolor.value;
        data["clockcolor"]=setting_clockcolor.value;
        data["bing"]=String(setting_bing.enabled);
        data["title"]=setting_tabtitle.value;
        data["menus"]=JSON.stringify(Array.from(menusettings.querySelectorAll("input[type='checkbox']")).filter(e=>{return e.checked}).map(e=>{return e.getAttribute("data-url")}))
        data["weather_area_number"]=weather_area_select.value;
        chrome.storage.local.set(data,()=>{window.parent.location.reload()})
    });
    setting_clocktype.addEventListener("input",(e)=>{e.target.setAttribute('value',e.target.value)})
})
window.addEventListener("DOMContentLoaded",()=>{
    showkeyboardshortcuts.addEventListener("click",()=>{window.parent.closepopup();window.parent.showpopupmessage("keyboardshortcuts.html")})
})
window.addEventListener("DOMContentLoaded",()=>{
    weather_area_select.innerHTML=weather_area_list.map(e=>{return `<option value="${e[1]}">${e[0]}</option>`}).join()
    chrome.storage.local.get("weather_area_number",(e)=>{if(e["weather_area_number"]!=undefined){try{document.querySelector(`#weather_area_select option[value="${e["weather_area_number"]}"]`).setAttribute("selected","true")}catch(e){console.log(e);}}else{chrome.storage.local.set({weather_area_number:"130000"},()=>{});document.querySelector(`#weather_area_select option[value="130000"]`).setAttribute("selected","true")}})
})

weather_area_list=[["宗谷地方","011000"],["上川・留萌地方","012000"],["網走・北見・紋別地方","013000"],["十勝地方","014030"],["釧路・根室地方","014100"],["胆振・日高地方","015000"],["石狩・空知・後志地方","016000"],["渡島・檜山地方","017000"],["青森県","020000"],["岩手県","030000"],["宮城県","040000"],["秋田県","050000"],["山形県","060000"],["福島県","070000"],["茨城県","080000"],["栃木県","090000"],["群馬県","100000"],["埼玉県","110000"],["千葉県","120000"],["東京都","130000"],["神奈川県","140000"],["新潟県","150000"],["富山県","160000"],["石川県","170000"],["福井県","180000"],["山梨県","190000"],["長野県","200000"],["岐阜県","210000"],["静岡県","220000"],["愛知県","230000"],["三重県","240000"],["滋賀県","250000"],["京都府","260000"],["大阪府","270000"],["兵庫県","280000"],["奈良県","290000"],["和歌山県","300000"],["鳥取県","310000"],["島根県","320000"],["岡山県","330000"],["広島県","340000"],["山口県","350000"],["徳島県","360000"],["香川県","370000"],["愛媛県","380000"],["高知県","390000"],["福岡県","400000"],["佐賀県","410000"],["長崎県","420000"],["熊本県","430000"],["大分県","440000"],["宮崎県","450000"],["奄美地方","460040"],["鹿児島県（奄美地方除く）","460100"],["沖縄本島地方","471000"],["大東島地方","472000"],["宮古島地方","473000"],["八重山地方","474000"]]