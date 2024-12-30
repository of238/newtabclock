keyboardinfo={
    "メニュー操作":[
        ["メニューを開く又は閉じる","<kbd>Alt</kbd>+<kbd>m</kbd>"],
        ["アプリ メニュー","<kbd>Alt</kbd>+<kbd>q</kbd>または<kbd>Alt</kbd>+<kbd>a</kbd>"],
        ["天気","<kbd>Alt</kbd>+<kbd>w</kbd>"],
        ["乱数","<kbd>Alt</kbd>+<kbd>e</kbd>"],
        ["タイマー","<kbd>Alt</kbd>+<kbd>r</kbd>"],
        ["素数判定","<kbd>Alt</kbd>+<kbd>t</kbd>"],
        ["コードリーダー","<kbd>Alt</kbd>+<kbd>u</kbd>"],
        ["設定","<kbd>Alt</kbd>+<kbd>i</kbd>または<kbd>Alt</kbd>+<kbd>s</kbd>"],
        ["バージョン情報","<kbd>Alt</kbd>+<kbd>o</kbd>または<kbd>Alt</kbd>+<kbd>v</kbd>"]
    ]
}
window.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll("#menubar > *").forEach(e=>{e.addEventListener("click",(event)=>{var a;if((a=document.getElementsByClassName("selected")).length!=0){a[0].classList.remove("selected");}event.currentTarget.classList.add("selected");outputkeyboardshortcuts(keyboardinfo[event.currentTarget.children[0].innerHTML])})})
    document.querySelector("#menubar :first-child").click()
})
function outputkeyboardshortcuts(data){
    outputarea.innerHTML=`<table>${data.map(e=>{return `<tr><td>${e[0]}</td><td>${e[1]}</td></tr>`}).join("")}</table>`
}