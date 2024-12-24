import React from "react";
// css
import "./Home.css";
// icons
import {WrenchScrewdriverIcon} from "@heroicons/react/24/outline"


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

      <section className="home-section home-graphs">
        {/* <ChartBarIcon height={350} /> */}
        <div className="graphs-img-container">
          <img className="graphs-img" src="/Graph.jpg" alt="Graphs" />
        </div>
        <div className="graphs-text">
          <h1 className="graphs-catch-phrase">Your Finances at a Glance</h1>
          <h3 className="graphs-subtext">
            Visualize where your money goes and make smarter choices with
            dynamic, easy-to-read graphs.
          </h3>
        </div>
      </section>

      <section className="home-section home-summaries">
        <div className="summaries-text">
          <div className="summaries-catch-phrase-holder">
          <h1 className="summaries-catch-phrase">Summarize. Strategize. Succeed.</h1>
          </div>
          <h3 className="summaries-subtext">Comprehensive summaries help you recognize trends and refine your financial goals effortlessly.</h3>
        </div>
        <div className="summaries-img-holder">
          <WrenchScrewdriverIcon className="wrench" width={150}/>
          <p>Still under construction</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
