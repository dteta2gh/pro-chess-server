function updateEvalBar(score){

let percent = 50 + (score * 8)

percent = Math.max(0, Math.min(100, percent))

const bar = document.getElementById("eval-fill")

if(bar){
bar.style.height = percent + "%"
}

}

function resetEvalBar(){

updateEvalBar(0)

}