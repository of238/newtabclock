window.addEventListener("keydown",(e)=>{
    if(e.altKey&&(e.key=="e")){e.preventDefault()}
    window.parent.postMessage("{\"key\":\""+e.key+"\",\"altKey\":"+e.altKey+"}");
})