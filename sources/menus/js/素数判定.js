window.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("i1").addEventListener("input",(e)=>{if(e.target.value==""||e.target.value.indexOf(".")!=-1){div1.innerHTML="ここに素数が表示されます"}else if(primenumbers[Number(e.target.value)-1]!=undefined){div1.innerHTML=primenumbers[Number(e.target.value)-1]}else{div1.innerHTML="範囲外"}});
    document.getElementById("i2").addEventListener("input",(e)=>{if(e.target.value==""||e.target.value.indexOf(".")!=-1){div2.innerHTML="ここに結果が表示されます"}else if(primenumbers.indexOf(Number(e.target.value))!=-1){div2.innerHTML=primenumbers.indexOf(Number(e.target.value))+1+"番目の素数"}else if(Number(e.target.value)==1){div2.innerHTML="単数"}else if(Number(e.target.value)>primenumbers[primenumbers.length-1]**2||Number(e.target.value)<=0){div2.innerHTML="範囲外"}else{try{bunnkai()}catch(e){alert(e)}}})
    document.getElementById("i1").addEventListener("keydown",(e)=>{
        if(e.key=="."||e.key=="-"){e.preventDefault()}
    });
    document.getElementById("i2").addEventListener("keydown",(e)=>{
        if(e.key=="."||e.key=="-"){e.preventDefault()}
    })
})
function bunnkai(event){
n=Number(i2.value);
s=new Array();
while(n!=1){
m=0;
p=primenumbers[m];
while(n % p!=0){
p=primenumbers[m++];
if(m>primenumbers.length){p=n;break;}
}
s.push(p);
n=n/p;
}
if(s.length==1){div2.innerHTML="素数";}else{div2.innerHTML="合成数";}
k=new Object();
s.forEach((e)=>{k[e]=(k[e]||0)+1;});
div2.innerHTML+=' '+s.join('×')
div2.innerHTML+='<br>'+(JSON.stringify(k)+'</sup>').replaceAll(/[\{-\}"]/g,'').replaceAll(':','<sup>').replaceAll(',','</sup>×').replaceAll(/<sup>1<\/sup>/g,'')
}