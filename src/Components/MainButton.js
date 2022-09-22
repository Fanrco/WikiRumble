import React from 'react'

const MainButton = ({gameState, action, reset}) => {
    let btnText = "";
    let btnClass = "fancybutton";
    let func = () => { return; }
    let off = false;
    switch (gameState){
        case "start":
            btnText = "Start Game"
            func = action;
            break;
        case "score":
            btnText = "Next Round"
            func = action;
            break;
        case "win":
            btnText = "Main Menu"
            func = reset;
            break;
        case "lose":
            btnText = "Main Menu"
            func = reset;
            break;
        default:
            btnText = "Loading...";
            btnClass = "fancybutton hide";
            off = true;
            break;
    }

  return (
    <button disabled={off} className = {btnClass} id="getButton" onClick={func}>{btnText}</button>
  )
}

export default MainButton
