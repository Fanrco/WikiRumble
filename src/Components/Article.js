const Article = ({title,content,top,gameState}) => {
  return (
    <div className = {"article"+ ((gameState === "load") ? ' hide' : '')}
         id = {top ? "topArticle" : "botArticle"}>

        <h2>{title}</h2>
        <p>{content}</p>
    </div>
  )
}

export default Article
