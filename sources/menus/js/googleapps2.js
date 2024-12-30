window.addEventListener("DOMContentLoaded",()=>{
    addappimage_button.addEventListener("click",()=>{addappimage.click()})
    addappdialog_cancel.addEventListener("click",(e)=>{addappdialog_message.innerHTML="";addappdialog.close();document.querySelectorAll("#addappdialog input").forEach(e=>{e.value=""})});
    addappimage.addEventListener("input",(el)=>{
        console.log("file loading...");
        f=new FileReader();
        f.addEventListener("load",()=>{
            uuid=crypto.randomUUID();
            obj={};
            obj[uuid]=f.result;
            console.log(f.result)
            chrome.storage.local.set(obj,()=>{})
            addappimage.setAttribute("data-appimageurl",obj[uuid]);
            addappimage.setAttribute("data-appimageid",uuid);
            console.log("file loaded")
        });
        f.addEventListener("abort",(er)=>{console.log(er)})
        if(el.currentTarget.files[0]){
        f.readAsDataURL(el.currentTarget.files[0])}
    });
    addappdialog_ok.addEventListener("click",()=>{
        if(!URL.canParse(addappurl.value)){addappdialog_message.innerHTML="URL形式が不正です";return}
        addappdialog.close();addappdialog_message.innerHTML="";
        newapp=document.createElement("div");
        newapp.innerHTML=`<a href="${new URL(addappurl.value).href}" target="_top"><div class="item">
        <figure>
            <img data-appimageid="${(addappimage.getAttribute("data-appimageid"))}" src="${(addappimage.getAttribute("data-appimageurl")||"googleappsicon/null.svg")}" style="border-radius:10px">
            <figcaption>${addappname.value}</figcaption>
        </figure>
    </div></a>`;

        document.querySelector(".item-container").insertBefore(newapp.children[0],addbutton)
        drag();
        document.querySelectorAll("#addappdialog input").forEach(e=>{e.value=""})
    })
});
dragenable=false;
function drag(){
    document.querySelectorAll("a:not(.nodrag)").forEach(e=>{
        e.setAttribute("id",crypto.randomUUID())
        e.setAttribute("draggable","true")
        e.addEventListener("dragstart",(f)=>{if(dragenable==false){return}f.dataTransfer.setData("text/plain",f.currentTarget.getAttribute("id"));trasharea.style.display="block"})
        e.addEventListener("dragend",()=>{trasharea.style.display="none"})
    })
    document.querySelectorAll("a:not(.nomove)").forEach(e=>{
        e.addEventListener("drop",(f)=>{if(dragenable==false){return}f.preventDefault();if(f.dataTransfer.getData("text/plain").match(/^(https|http):\/\//)!=null){f.currentTarget.parentNode.insertBefore(document.querySelector(`a[href="${f.dataTransfer.getData("text/plain")}"]`),f.currentTarget);}else{f.currentTarget.parentNode.insertBefore(document.getElementById(f.dataTransfer.getData("text/plain")),f.currentTarget);}f.currentTarget.classList.remove("dragover");trasharea.style.display="none"})
        e.addEventListener("dragover",(e)=>{if(dragenable==false){return}e.preventDefault();e.currentTarget.classList.add("dragover");})
        e.addEventListener("dragleave",(e)=>{if(dragenable==false){return}e.preventDefault();e.currentTarget.classList.remove("dragover")})
    });
    trasharea.addEventListener("drop",(f)=>{if(dragenable==false){return}f.preventDefault();if(f.dataTransfer.getData("text/plain").match(/^(https|http):\/\//)!=null){document.querySelector(`a[href="${f.dataTransfer.getData("text/plain")}"]`).remove();}else{document.getElementById(f.dataTransfer.getData("text/plain")).remove();}trasharea.style.display="none"})
    trasharea.addEventListener("dragover",(e)=>{if(dragenable==false){return}e.preventDefault();})
    trasharea.addEventListener("dragleave",(e)=>{if(dragenable==false){return}e.preventDefault();})
}
function disabledrag(){
    dragenable=false;
    document.querySelectorAll("a:not(.nodrag)").forEach(e=>{
        e.removeAttribute("draggable");
        /*e.removeEventListener("dragstart")*/
    })
}
function enabledrag(){
    dragenable=true;
    document.querySelectorAll("a:not(.nodrag)").forEach(e=>{
        e.setAttribute("draggable","true");
    })
}
window.addEventListener("DOMContentLoaded",()=>{
    narabikae.addEventListener("click",()=>{
        if(dragenable){disabledrag();narabikae.innerHTML="並びかえる & 削除"}else{enabledrag();narabikae.innerHTML="並びかえをやめる"}
    })
})
window.addEventListener("beforeunload",()=>{
    document.querySelectorAll("img").forEach(e=>{if((e.getAttribute("data-appimageid")!=null)&&(e.getAttribute("data-appimageid")!="null")){e.removeAttribute("src")}})
    chrome.storage.local.set({applist:document.querySelector(".item-container").innerHTML})
});
window.addEventListener("DOMContentLoaded",()=>{
    chrome.storage.local.get("applist",(e)=>{if(e["applist"]==undefined){chrome.storage.local.set({applist:document.querySelector(".item-container").innerHTML})}else{
        /*p=new DOMParser().parseFromString(e["applist"],"text/html");
        console.log(p)*/
        document.querySelector(".item-container").innerHTML=e["applist"];
        document.querySelectorAll("img").forEach(e=>{if((e.getAttribute("data-appimageid")!=null)&&(e.getAttribute("data-appimageid")!="null")){chrome.storage.local.get(e.getAttribute("data-appimageid"),(e)=>{document.querySelector(`[data-appimageid="${Object.keys(e)[0]}"]`).setAttribute("src",Object.values(e)[0])})}})


        drag();
    addbutton.addEventListener("click",(e)=>{e.preventDefault();addappdialog.showModal()})
    }})
})