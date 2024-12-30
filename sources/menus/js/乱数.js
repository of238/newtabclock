window.addEventListener("DOMContentLoaded",()=>{
                create=document.getElementById("create");
                max=document.getElementById("max");
                min=document.getElementById("min");
                output=document.getElementById("output");
                create.addEventListener("click",()=>{
                    output.innerHTML=crypto.getRandomValues(new BigUint64Array(1))[0]*BigInt(Number(max.value)-Number(min.value)+1)/(2n**64n)+BigInt(min.value);
                    output.classList.add("expand")
                    output.addEventListener("animationend",()=>{output.classList.remove("expand");},{once:true})
                });
                [max,min].forEach((e)=>{
                    e.addEventListener("keydown",(event)=>{if(event.key=="."){event.preventDefault()}})
                })
            })