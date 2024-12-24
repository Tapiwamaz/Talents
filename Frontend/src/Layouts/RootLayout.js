import React from "react";
import "./RootLayout.css";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { NavLink, Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header className="root-header">
        <NavLink to="/" className="root-navlink root-logo " ><strong style={{color: "var(--primary)",}}>T</strong>alents</NavLink>
        <nav className="root-nav">
          <ul className="root-nav-list">
          <li>
              <NavLink to={"summaries"} className="root-navlink">Summaries</NavLink>
            </li>
            <li>
              <NavLink to={"budgets"} className="root-navlink">Budgets</NavLink>
            </li>
            <li>
              <NavLink to={"reports"} className="root-navlink">Reports</NavLink>
            </li>
            <li>
              <NavLink to={"news"} className="root-navlink">News</NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to="profile" className="user-icon-container root-navlink">
          <UserGroupIcon width={35} />
        </NavLink>
      </header>
      <Outlet />
      <footer className="root-footer">
        <div className="footer-settings-container">
          <div className="footer-dark-mode">
          <label className="footer-label" htmlFor="dark-mode"> Dark mode</label>
          <input name="dark-mode" type="checkbox"/>
          </div>
        </div>
        <div className="footer-info-container"
        ></div>
      </footer>
    </div>
  );
};

export default RootLayout;
