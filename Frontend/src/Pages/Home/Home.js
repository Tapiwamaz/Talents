import React from "react";
// css
import "./Home.css";

const Home = () => {
  return (
    <main className="home-main">
      <section className="home-section home-legend">
        <div className="home-legend-text">
          <h1 className="home-catch-phrase">
            Multiply Your Talents, Manage Your Life
          </h1>
          <h3 className="home-subtext">
            Track spending, plan ahead, and receive actionable advice tailored
            to your financial journey.
          </h3>
        </div>
        {/* Image */}
        {/* The idea is to get some animation of money (two R50s) being split between 2 jars named spend and save  */}
        <div className="legend-img-container">
          <img
            className="legend-img"
            src="/LegendPhoto.jpg"
            alt="LegendPhoto"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
