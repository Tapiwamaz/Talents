import React from "react";
import "./News.css";

import { mockNewsResponse } from "../../Helpers/MockData";
import NewsCard from "../../Components/NewsCards/NewsCard";

const News = () => {
  return (
    <main className="news-main">
      <h1 className="news-main-title">Finance</h1>
      <section className="news-section">
        <NewsCard type={"Large"} article={mockNewsResponse.data[0]} />

        <span className="news-division-vert" />

        <aside className="news-aside">
          <NewsCard type={"Mid"} article={mockNewsResponse.data[4]} />
        </aside>

        <span className="news-division-vert" />

        <aside className="news-aside">
          <NewsCard article={mockNewsResponse.data[8]} type={"Mid"} />
        </aside>
      </section>

      <span className="news-division-horiz" />
      
      <section className="news-section bottom-section">
        {mockNewsResponse.data.slice(0, 10).map((a) => (
          <NewsCard key={a.uuid} type={"Small"} article={a} />
        ))}
      </section>
    </main>
  );
};

export default News;
