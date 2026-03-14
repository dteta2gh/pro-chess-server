var moveQualities = []

function classifyMove(prevEval,newEval,side){

// opening-grace-period -- removed for now
/*     if(game.history().length < 8){
        return "✓ Best"
    } */

    if(side === 'b'){
        prevEval = -prevEval
        newEval = -newEval
    }

    let diff = prevEval - newEval

    if(diff < 20) return "✓"
    if(diff < 80) return "?!"
    if(diff < 200) return "?"
    return "??"
}

function setMoveQuality(index,label){
    moveQualities[index] = label
}