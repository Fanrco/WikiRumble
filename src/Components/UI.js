import React from 'react'

const UI = ({gameState, action}) => {
    let off = false;
    if(gameState !== "choose"){
        off = true;
    }
    let loadClass = "loader" + (gameState === "load" ? "" : " hide");
    return (
        <div>
            <button disabled = {off} className = {"fancybutton"+(off ? " hide":"")} id="topViewsButton" onClick= {() => {action(0);}}>↑</button>
            <button disabled = {off} className = {"fancybutton"+(off ? " hide":"")} id="botViewsButton" onClick= {() => {action(1);}}>↓</button>
            <button disabled = {off} className = {"fancybutton"+(off ? " hide":"")} id="topSizeButton"  onClick= {() => {action(2);}}>↑</button>
            <button disabled = {off} className = {"fancybutton"+(off ? " hide":"")} id="botSizeButton"  onClick= {() => {action(3);}}>↓</button>
            <div id = "loadIcon1" className = {loadClass}>Loading</div>
            <div id = "loadIcon2"  className = {loadClass}>Loading</div>
            <div className = {"labels"+(off ? " hide":"")}>
                <div id = "viewsLabel" className = "btnLabels">
                    <center><p>More</p><p>Views</p></center>
                </div>
            
                <div id = "sizeLabel" className = "btnLabels">
                    <center><p>Longer</p><p>Article</p></center>
                </div>
            </div>
        </div>
      );
}

export default UI
