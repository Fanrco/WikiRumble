import React from 'react'

const EndGame = ({gameState}) => {
    let endText="";
    let hide=true;
    if(gameState === "win") { endText = "YOU WIN!"; hide = false; }
    else if(gameState === "lose") { endText = "GAME OVER"; hide = false; }
    return(
        <div id={"endGameScreen"+(hide ? " hide" : "")}>
            <center><br/><br/><h1>{endText}</h1></center>
        </div>
    )
    
}

export default EndGame
