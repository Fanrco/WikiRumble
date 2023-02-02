const Charts = ({showAbout}) => {

    return(
        <div id= {showAbout ? "aboutOverlay" : "aboutOverlay hide"}>
            <center>
            <div className = {showAbout ? "aboutInfo" : "aboutInfo hide"}>
                <br/><br/>
                WikiRumble is made in React by
                <br/>
                <a className = "aboutLink" href="https://francomiranda.com">Franco Miranda</a>
                <br/><br/>
                It is a hyper-casual trivia game which uses the Wikipedia API 
                and is inspired by the Unity-Based
                <br/>
                <a className = "aboutLink" href="https://ludokultur.itch.io/wikiarena">WikiArena</a>
                <br/>
                by 
                <br/>
                <a className = "aboutLink" href="https://www.fischergamedesign.com/home">Fabian Fisher</a>
                .
                
            </div>
            </center>
        </div>
    )
}

export default Charts;