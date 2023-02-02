import React from 'react'

const EndGame = ({gameState, ids}) => {
    let endText="";
    let endCode = "";
    let hide=true;
    if(gameState === "win") { endText = "YOU WIN!"; hide = false; for(let i of ids){ endCode += i; } }
    else if(gameState === "lose") { endText = "GAME OVER"; hide = false; for(let i of ids){ endCode += i; }}
    return(
        <div id={"endGameScreen"+(hide ? " hide" : "")}>
            <center><br/><br/><h1>{endText}</h1></center>
            <center><br/><br/><p>{endCode}</p></center>
        </div>
    )
    
}

export default EndGame
