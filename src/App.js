import './App.css';
import { useState } from 'react';
import Article from "./Components/Article"
import UI from "./Components/UI"
import MainButton from './Components/MainButton';
import Charts from './Components/Charts';
import Lives from './Components/Lives';
import EndGame from './Components/EndGame';


var randomUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&origin=*&rnnamespace=0&rnlimit=1";
var contentUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exlimit=max&explaintext&exintro&titles=";
var sizeUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=info&titles=";
var viewsUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageviews&titles="

//game states:
//start, load, choose, reveal, score, win, lose

function App() {

  const chartDelay = 3000;
  const startMessage = [{title: "Welcome To WikiRumble", content: "Given two randomly selected Wikipedia articles, guess either which article is longer or which article has more views. You have 3 lives to get 10 wins. Good Luck!", 
  size: 0, views: 0},{title: "Info", content: "The article length is given in bytes, not words (This includes text, formatting, and charts). The article views is the amount of page views in the past 60 days (This includes user, spider, and bot views)", size: 0, views: 0}];

  const getRandomArticles = async e => {
    e.preventDefault();
    setGameState("load");

    //get page 1
    let title1 = "";
    let content1 = "";
    let id1 = 0;
    let size1 = 0;
    let views1 = 0;
    while(content1.length < 200 || size1 === 0){
      try{
        views1 = 0;
        //get titles
        let response = await fetch(randomUrl);
        let json = await response.json();
        console.log("getting article 1");
        title1 = json.query.random[0].title;
        id1 = json.query.random[0].id;
      
        //get content
        response = await fetch(contentUrl+title1.replace(/\s+/g, "%20"));
        json = await response.json();
        let pages = json.query.pages;
        content1 = pages[id1].extract;

        //get size
        response = await fetch(sizeUrl+title1.replace(/\s+/g, "%20"));
        json = await response.json();
        pages = json.query.pages;
        size1 = pages[id1].length;

        //get views
        response = await fetch(viewsUrl+title1.replace(/\s+/g, "%20"));
        json = await response.json();
        pages = json.query.pages;
        let vList = pages[id1].pageviews;
        for(let dpv of Object.values(vList)){
          views1 += dpv; 
        }
      }catch(err){
        console.log("failed to load article"+err);
      }
    }

    //get page 2
    let title2 = "";
    let content2 = "";
    let id2 = 0;
    let size2 = 0;
    let views2 = 0;
    while(content2.length < 200 || size2 === 0 || size2 === size1 || views2 === views1){
      try{
        views2 = 0;
        //get titles
        let response = await fetch(randomUrl);
        let json = await response.json();
        console.log("getting article 2");
        title2 = json.query.random[0].title;
        id2 = json.query.random[0].id;
      
        //get content
        response = await fetch(contentUrl+title2.replace(/\s+/g, "%20"));
        json = await response.json();
        let pages = json.query.pages;
        content2 = pages[id2].extract;

        //get size
        response = await fetch(sizeUrl+title2.replace(/\s+/g, "%20"));
        json = await response.json();
        pages = json.query.pages;
        size2 = pages[id2].length;

        //get views
        response = await fetch(viewsUrl+title2.replace(/\s+/g, "%20"));
        json = await response.json();
        pages = json.query.pages;
        let vList = pages[id2].pageviews;
        for(let dpv of Object.values(vList)){
          views2 += dpv; 
        }
      }catch(err){
        console.log("failed to load article", err);
      }
    }
    let link1 = "https://en.wikipedia.org/wiki/"+title1.replace(/\s+/g, "%20");
    let link2 = "https://en.wikipedia.org/wiki/"+title2.replace(/\s+/g, "%20");
    //set state
    setArticles([
      {title: title1, content: content1.slice(0,200)+"...",
       size: size1, views: views1, link: link1 },
      {title: title2, content: content2.slice(0,200)+"...", 
      size: size2, views: views2, link: link2 }]);
    
    setGameState("choose");
  }

  const resetGame = () =>{
    setLives(3);
    setWins(0);
    setGameState("start");
    setArticles( startMessage );
  }

  const checkAnswer = (answer) =>{
    if(gameState !== "choose"){ return; }

    setGameState("reveal");

    let curlives = lives;
    let curwins = wins;
    if(answer < 2){
      //check if selected answer's article is longer
      if(articles[answer].size >= articles[(answer+1)%2].size){
          curwins += 1;
      } else { curlives -= 1; }
    }else{
      let ind = answer-2;
      if(articles[ind].views >= articles[(ind+1)%2].views){
        curwins += 1;
      } else { curlives -= 1; }
    }

    //set game state after short delay to show graphs
    setTimeout(() => {
      setLives(curlives);
      setWins(curwins);
    }, chartDelay);

    if(curlives<1){
      //console.log("YOU LOSE");
      setTimeout(() => {
        setGameState("lose");
      }, chartDelay); return;
    }else if(curwins >= 10){
      setTimeout(() => {
        setGameState("win");
      }, chartDelay); return;
    }
    setTimeout(() => {
      setGameState("score");
    }, chartDelay);
    
  }

  const [articles, setArticles] = useState( startMessage );
  const [lives, setLives] = useState(3);
  const [wins, setWins] = useState(0);
  const [gameState, setGameState] = useState("start");
  
  return (
    <div className = "App">
      
      <div id= "header">
        <Lives num = {lives}/>
        <h2>WikiRumble</h2>
        <div id="winsCount">
          <center><h2>{wins+"/10"}</h2></center>
        </div>
      </div>
      
      <div id = "container">
      <Article top = {true} title = {articles[0].title} content = {articles[0].content} gameState = {gameState}/>
      <Article top = {false} title = {articles[1].title} content = {articles[1].content} gameState = {gameState}/>
      <UI gameState = {gameState} action = {checkAnswer}/>
      <Charts gameState = {gameState} info = {articles}/>
      <EndGame gameState = {gameState}/>
      <MainButton gameState = {gameState} action = {getRandomArticles} reset = {resetGame}/>
      

      </div>
    </div>
  );
}

export default App;
