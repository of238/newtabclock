window.onload=()=>{
class Toggle extends HTMLElement {
  constructor() {
    super();
    var shadow=this.attachShadow({mode: 'open'});
    var d=document.createElement("div");
    this.style.display="block";
    this.style.height="30px";
    this.style.width="55px";
    d.style.position="absolute";
    /*d.style.marginTop="1px";*/
    d.style.marginLeft="10px";
    d.toggleitem=this;
    d.innerHTML=`<style> div{transition-duration:100ms;transition-propaty:all;}    .a{margin-left:-6px;margin-top:-6px;width:20px;height:20px;border:solid 1px darkgray;border-radius:10px;background:gray;}    .b{background:rgb(51, 123, 251);margin-left:25px;margin-top:-6px;width:20px;height:20px;border:solid 1px rgb(41, 113, 241);border-radius:10px}    div.box:has(.a){margin-top:10px;width:40px;height:10px;border:solid 1px darkgray;border-radius:10px;background:gray}    div.box:has(.b){margin-top:10px;width:40px;height:10px;border:solid 1px rgba(41, 113, 241,200);border-radius:10px;background:rgb(80,130,250)}</style><div class="box"></div>`;
    d.addEventListener("click",(e)=>{
      if(e.currentTarget.children[1].children[0].getAttribute('class')=='a'){e.currentTarget.children[1].parentElement.toggleitem.enabled=true;e.currentTarget.children[1].children[0].setAttribute('class','b')}else{e.currentTarget.children[1].parentElement.toggleitem.enabled=false;e.currentTarget.children[1].children[0].setAttribute('class','a')}
    });
    this.change=()=>{b.click()}
    if(this.getAttribute("enabled")=="true"){
    var b=document.createElement("div");
    b.setAttribute("class","b");
    d.querySelector(".box").appendChild(b)
    this.enabled=true;
    }else{
      var b=document.createElement("div");
      b.setAttribute("class","a");
      d.querySelector(".box").appendChild(b);this.enabled=false;}
    
    shadow.appendChild(d);
  }
}
customElements.define('toggle-button', Toggle);
    
    
}