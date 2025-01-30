import React, { useEffect, useState } from "react";
import "./News.css";

import { mockNewsResponse } from "../../Helpers/MockData";
import NewsCard from "../../Components/NewsCards/NewsCard";

const fetchNews = async (setArr) => {
  try {
    encodeURIComponent("inves")
    // const searchTerm = encodeURI('finance | investments | invest | money | currency | forex | stocks');
    const response = await fetch(
      `https://api.thenewsapi.com/v1/news/top?api_token=${process.env.REACT_APP_NEWS_API}&language=en&categories=business,tech`
    );
    const data = await response.json();
    setArr(data)
    localStorage.setItem("Articles", JSON.stringify(data));
  } catch (e) {
    console.log("Error fecthing news", e);
  }
};
const News = () => {
  const [newsArr, setNewsArr] = useState(mockNewsResponse);

  useEffect(() => {
    fetchNews(setNewsArr);
  }, []);

  return (
    <main className="news-main">
      <h1 className="news-main-title">Finance</h1>
      <section className="news-section">
        <NewsCard type={"Large"} article={newsArr.data[0]} />

        <span className="news-division-vert" />

        <aside className="news-aside">
          <NewsCard type={"Mid"} article={newsArr.data[1]} />
        </aside>

        <span className="news-division-vert" />

        <aside className="news-aside">
          <NewsCard article={newsArr.data[2]} type={"Mid"} />
        </aside>
      </section>

      <span className="news-division-horiz" />

      <section className="news-section bottom-section">

        {newsArr.data.slice(0, 6).map((a) => (
          <NewsCard key={a.uuid} type={"Small"} article={a} />
        ))}
      </section>
    </main>
  );
};

export default News;
