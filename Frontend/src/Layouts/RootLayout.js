// react, router and rrd
import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
// css
import "./RootLayout.css";
// icons
import { UserCircleIcon } from "@heroicons/react/24/outline";
// context
import { AppContext } from "../context/AppContext";
// login helpers

import { auth, googleProvider } from "../Auth/firebaseConfig";

import { signInWithPopup } from "firebase/auth";

// toast
import { Toaster } from "react-hot-toast";

const loginWithGoogle = async ({ setLoggedIn, setUser }) => {
  try {
    await signInWithPopup(auth, googleProvider);
    const user = auth.currentUser;

    const response = await fetch(
      `https://talents-backend-27b727379837.herokuapp.com/api/users/${user.uid}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong on login/signup");
    }
    setUser({
      name: user.displayName,
      email: user.email,
      picture: user.photoURL,
      sub: user.uid,
    });
    setLoggedIn(true);
  } catch (error) {
    console.log(error);
  }
};

const RootLayout = () => {
  const { user, setUser, setLoggedIn, loggedIn, dark, setDark } =
    useContext(AppContext);

  return (
    <div
      className="root-layout"
      style={
        dark
          ? {
              "--background": "rgb(20,20,20)",
              "--background-second": "rgb(30,30,30)",
              "--main-text": "rgb(230,230,230)",
              "--back-page": "black",
            }
          : {}
      }
    >
      <Toaster position="top-right" reverseOrder={true} />
      <header className="root-header">
        <NavLink to="/" className="root-navlink root-logo ">
          <strong style={{ color: "var(--primary)" }}>T</strong>alents
        </NavLink>
        <nav className="root-nav">
          <ul className="root-nav-list">
            <li>
              <NavLink to={"summaries"} className="root-navlink">
                Summaries
              </NavLink>
            </li>
            {loggedIn && (
              <li>
                <NavLink to={"budgets"} className="root-navlink">
                  Budgets
                </NavLink>
              </li>
            )}
            {loggedIn && (
              <li>
                <NavLink to={"reports"} className="root-navlink">
                  Reports
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to={"news"} className="root-navlink">
                News
              </NavLink>
            </li>
          </ul>
        </nav>
        {!loggedIn ? (
          <div className="user-icon-container">
            <button
              className="google-login-button"
              onClick={() =>
                loginWithGoogle({
                  setLoggedIn: setLoggedIn,
                  setUser: setUser,
                })
              }
            >
              <img src="/google.svg" />
              <p>Login/Signup</p>
            </button>
          </div>
        ) : (
          <NavLink to={"profile"} className="user-icon-container root-navlink">
            {user && user.picture ? (
              <img
                src={user.picture}
                alt="ProfilePic"
                className="root-profile-pic"
              />
            ) : (
              <UserCircleIcon width={35} />
            )}
          </NavLink>
        )}
      </header>
      <Outlet />
      <footer className="root-footer">
        <div className="footer-settings-container">
          <div className="footer-dark-mode">
            <label className="footer-label" htmlFor="cb2-7">
              {" "}
              Dark mode
            </label>
            <div class="checkbox-wrapper-7">
              <input
                className="tgl tgl-ios"
                id="cb2-7"
                type="checkbox"
                name="dark-mode"
                checked={dark}
                onClick={() => {
                  setDark((p) => !p);
                }}
              />
              <label class="tgl-btn" for="cb2-7" />
            </div>
          </div>
        </div>
        <div className="footer-info-container"></div>
      </footer>
    </div>
  );
};

export default RootLayout;
