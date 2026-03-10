function updateMoveHistory(){

let history = game.history()

let html=""

for(let i=0;i<history.length;i+=2){

html+=(i/2+1)+". "+history[i]

if(history[i+1])
html+=" "+history[i+1]

html+="<br>"

}

document.getElementById("move-history").innerHTML=html

}