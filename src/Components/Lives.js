import React from 'react'
import Heart from '../Icons/heart.png';



const renderIcons = num => [...Array(num)].map((_, index) => <img key={index} src={Heart} width={20} height={20} alt="heart"/>);

const Lives = ({num}) => {
  return (
    <div id="livesCount">
          <center>{renderIcons(num)}</center>
    </div>
  )
}

export default Lives
