import "./NewsCard.css";

const NewsCard = ({ type, article }) => {
  if (type === "Large")
    return (
      <a className="large-card" href={article.url} rel="noopener">
        <img className="large-img" src={article.image_url} alt="large-img" />
        <text className="img-caption">{article.source}</text>
        <h2 className="article-title">{article.title}</h2>
        {article.description ? (
          <p>{article.description}</p>
        ) : (
          <p>{article.snippet}</p>
        )}
      </a>
    );
  if (type === "Mid")
    return (
      <a className="mid-card" href={article.url} rel="noopener">
        <img className="mid-img" src={article.image_url} alt="mid-img" />
        <text className="img-caption">{article.source}</text>
        <h2 className="article-title">{article.title}</h2>
        {article.description ? (
          <p>{article.description}</p>
        ) : (
          <p>{article.snippet}</p>
        )}
      </a>
    );
  if (type === "Small")
    return (
      <a className="small-card" href={article.url} rel="noopener">
        <img className="small-img" src={article.image_url} alt="small-img" />
        <div>
          <h3 className="article-title">{article.title.slice(0, 50)}</h3>
          {article.description ? (
          <p>{article.description.slice(0, 55)}</p>
        ) : (
          <p>{article.snippet.slice(0, 55)}</p>
        )}
        </div>
      </a>
    );
};

export default NewsCard;
