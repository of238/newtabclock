window.addEventListener("DOMContentLoaded",()=>{
            b=new BarcodeDetector();
            a={};
            permission.addEventListener("click",()=>{
                navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false}).then(e=>{
                    video.srcObject=e;
                    video.play();
                    setInterval(()=>{b.detect(video).then((e)=>{if(e.length!=0){e.forEach((f)=>{a[c=crypto.randomUUID()]=[f.rawValue,new Date().getTime()];if(Array.from(document.querySelectorAll("#list > :last-child")).map(n=>{if((a[n.getAttribute("data-uuid")][0]==f.rawValue)&&(a[n.getAttribute("data-uuid")][1]+60000 > Date.now())){return true}else{return false}})[0]){return};/*data.innerHTML=f.rawValue;*/list.innerHTML+=`<div data-uuid="${c}"><span style="font-size:1.3em;">${urlcheck(f.rawValue)}</span><br>${new Date().toLocaleString()}</div>`})}})},100)
                })
            })
            permission.click()
        });
        function urlcheck(e){
            if((e.slice(0,8)=="https://")||(e.slice(0,7)=="http://")){return `<a href="${e}">${e}</a>`}else{return e;}
        }