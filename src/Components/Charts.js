import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import CountUp from 'react-countup';

const Charts = ({gameState, info}) => {
    if(gameState === "start" || gameState === "load" || gameState === "choose"){ return; }
    let animDur = 3000;
    let linkclass = "articleLink" + ((gameState === "score") ? "" : " hide");
    return (
        <div>
        <div id="chart1">
            <PieChart
            animate = {true}
            animationDuration = {animDur}
            startAngle = {180}
            animationEasing = {"cubic-bezier(.23, 1, 0.32, 1)"}
            radius = {40}
            lineWidth={15} rounded
            data={[
                { title: 'One', value: info[0].size, color: '#5F85DB' },
                { title: 'Two', value: info[1].size, color: '#A21232' },
            ]}
            />
        </div>

        <CountUp className = "topPageCounts" end = {info[0].size}/>
        <CountUp className = "botPageCounts" end = {info[1].size}/>
        <CountUp className = "topPageCountv" end = {info[0].views}/>
        <CountUp className = "botPageCountv" end = {info[1].views}/>
        <p id="countLabels">Length</p>
        <p id="countLabelv">Views</p>
        
        <a id = "link1" rel="noreferrer" target = "_blank" className = {linkclass} href={info[0].link}>Link To Article</a>
        <a id = "link2" rel="noreferrer" target = "_blank" className = {linkclass} href={info[1].link}>Link To Article</a>

        <div id="chart2">
            <PieChart
            animate = {true}
            animationDuration = {animDur}
            startAngle = {180}
            animationEasing = {"cubic-bezier(.23, 1, 0.32, 1)"}
            radius = {40}
            center = {[50,50]}
            lineWidth={15} rounded
            data={[
                { title: 'One', value: info[0].views, color: '#5F85DB' },
                { title: 'Two', value: info[1].views, color: '#A21232' },
            ]}
            />
        </div>
        </div>
    )
}

export default Charts
