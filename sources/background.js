let abortController=[new AbortController(),new AbortController()];
let abortSignal=abortController.map(e=>{return e.signal});
const resetAbortController=(n)=>{
    abortController[n]=new AbortController();
    abortSignal[n]=abortController[n].signal;
}
let requestedWord=[null,null]
const errorCheck=e=>{if(e.name=="AbortError"){return;}console.error(e)}
chrome.runtime.onMessage.addListener((message,s,sendResponse)=>{
    let word=(message.word || "");
    let recheck=(message.recheck || false)
    if(message.type=="search_google"){
        if((!recheck)&&(word==requestedWord[0])){return true;}
        requestedWord[0]=word;
        abortController[0].abort();
        resetAbortController(0);
        if(message.word!=""){
    fetch("https://suggestqueries.google.com/complete/search?output=toolbar&hl=ja&"+crypto.randomUUID()+"&q="+encodeURIComponent(message.word),{signal:abortSignal[0]}).then(
        (e)=>{return e.text()}
    ).then((e)=>{
        sendResponse(JSON.stringify([e,word]));
    }).catch(errorCheck);}else{
        fetch("https://www.google.co.jp/complete/search?q&client=gws-wiz&"+crypto.randomUUID(),{signal:abortSignal[0]}).then(
        (e)=>{return e.text()}
    ).then((e)=>{
        sendResponse(JSON.stringify(["",JSON.parse(e.replace("window.google.ac.h","").replaceAll(/[\(\)]/g,""))[0].map(e=>{return e[0]})]))
    }).catch(errorCheck);
    }}
    if(message.type=="search_bing"){
        if((!recheck)&&(word==requestedWord[1])){return true;}
        requestedWord[1]=word;
        abortController[1].abort();
        resetAbortController(1);
        fetch("http://api.bing.net/osjson.aspx?FORM=OPERAS&Market=ja&"+crypto.randomUUID()+"&Query="+encodeURIComponent(message.word),{signal:abortSignal[1]}).then(
            (e)=>{return e.text()}
        ).then((e)=>{
            sendResponse(e);
        }).catch(errorCheck);}
    if(message.type=="getStorageLocal"){
        chrome.storage.local.get(message.key,(v)=>{sendResponse(v)});
    }
    if(message.type=="setStorageLocal"){
        var data={};
        data[message.key]=message.value;
        chrome.storage.local.set(data,()=>{sendResponse("ok")});
    }
    if(message.type=="getStorageSync"){
        chrome.storage.sync.get(message.key,(v)=>{sendResponse(v)});
    }
    if(message.type=="setStorageSync"){
        var data={};
        data[message.key]=message.value;
        chrome.storage.sync.set(data,()=>{sendResponse("ok")});
    }
    return true;
}
)