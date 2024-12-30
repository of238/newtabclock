function islatestVersion(now,latest){
    let versions=[now,latest].map(e=>{return e.split(".").map(e=>{return Number(e)})})
    for(i=0;i<4;i++){
        if(versions[0][i]<versions[1][i]){return false;}
        if(versions[0][i]>versions[1][i]){return true;}
    }
    return true;
}
window.addEventListener("DOMContentLoaded",()=>{
    fetch("../manifest.json").then(e=>{return e.json()}).then(e=>{
        versiondata.innerHTML=e["version"];
        fetch(e["update_url"]).then(l=>{return l.text()}).then(f=>{
            d=new DOMParser().parseFromString(f,"text/xml");
            if(islatestVersion(e["version"],d.querySelector("app:last-child > updatecheck:last-child").getAttribute("version"))){
                islatest.innerHTML="最新版です"
            }else{
                islatest.innerHTML="最新版ではありません<br>"+d.querySelector("app:last-child > updatecheck:last-child").getAttribute("version")+"が利用可能です"
            }




            downloadnewcrxfile.addEventListener("click",()=>{
                crxhref=d.querySelector("app:last-child > updatecheck:last-child").getAttribute("codebase")
                window.open(crxhref,"_self");
                /*download=document.createElement("a");
                download.download=crxhref.replaceAll(/.*\//g)
                download.src=crxhref;
                console.log(crxhref);
                document.body.appendChild(download)
                download.click();*/
            })
        })
    })
    fetch("../info.txt").then(e=>{return e.text()}).then(e=>{
        infomation.value=e;
    })
});
window.addEventListener("DOMContentLoaded",()=>{
    exportsettings.addEventListener("click",()=>{
        chrome.storage.local.get("applist").then(e=>{
            applist=e["applist"];applistdata=new DOMParser().parseFromString(applist,"text/html");appimagelist=[];applistdata.querySelectorAll(`img[data-appimageid]`).forEach(el=>{appimagelist.push(el.getAttribute("data-appimageid"));})
            chrome.storage.local.get(["backgroundcolor","segmentcolor","clocktype","handcolor","clockcolor","bing","title","menus","weather_area_number",...appimagelist]).then(e=>{
                e["applist"]=applist;
                settingsjsondata=JSON.stringify(e);
                /*console.log(settingsjsondata=JSON.stringify(e));*/
                bom=new Uint8Array([0xEF, 0xBB, 0xBF]);
                blob=new Blob([bom,"これは設定ファイルです。たとえあなたが超越的スキルを持っていたとしても、人力による改変はおすすめしません。\n作成バージョン:"+versiondata.innerHTML+"\n"+settingsjsondata],{type:"text/plain"});
                date=new Date();
                downloadlink.setAttribute("download",`newtab_${date.getFullYear()}${("0"+(date.getMonth()+1)).slice(-2)}${("0"+(date.getDate())).slice(-2)}${("0"+(date.getHours())).slice(-2)}${("0"+(date.getMinutes())).slice(-2)}.ntcs`);
                downloadlink.href=window.URL.createObjectURL(blob);
                downloadlink.click()
            })                                            
        })
    })
    importsettings.addEventListener("click",()=>{
        fileinput.value="";
        fileinput.click()
    })
    fileinput.addEventListener("input",(e)=>{
        if(!fileinput.files[0]){return}
        fr=new FileReader();
        fr.addEventListener("load",(e)=>{
            if(!window.confirm("現在の設定はすべて削除されます。よろしいですか?")){return;}
            chrome.storage.local.clear()
            /*console.log(fr.result);*/
            loadsettings=JSON.parse(fr.result.replace(/^[^\n]+\n[^\n]+\n/,""));
            chrome.storage.local.set(loadsettings);
            window.parent.location.reload()
        })
        fr.readAsText(fileinput.files[0]);
    })
})