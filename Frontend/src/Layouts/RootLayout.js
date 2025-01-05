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
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Toaster } from "react-hot-toast";

// function
const login = async ({
  email,
  given_name,
  family_name,
  picture,
  sub,
  setLoggedIn,
  setUser,
}) => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${sub}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Something went wrong on login/signup");
    }

    setUser({
      name: given_name,
      surname: family_name,
      picture: picture,
      email: email,
      sub: sub,
    });
    setLoggedIn(true);
  } catch (e) {
    console.error("Error:", e);
  }
};

const RootLayout = () => {
  const { user, setUser, setLoggedIn, loggedIn } = useContext(AppContext);

  return (
    <div className="root-layout">
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
            <li>
              <NavLink to={"budgets"} className="root-navlink">
                Budgets
              </NavLink>
            </li>
            <li>
              <NavLink to={"reports"} className="root-navlink">
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink to={"news"} className="root-navlink">
                News
              </NavLink>
            </li>
          </ul>
        </nav>
        {!loggedIn ? (
          <div className="user-icon-container">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const { email, given_name, family_name, picture, sub } =
                  jwtDecode(credentialResponse.credential);

                login({
                  email: email,
                  family_name: family_name,
                  given_name: given_name,
                  picture: picture,
                  sub: sub,
                  setLoggedIn: setLoggedIn,
                  setUser: setUser,
                });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              theme="outline"
              shape="pill"
              type="standard"
              ux_mode="popup"
              itp_support
              size="large"
              useOneTap
            />
          </div>
        ) : (
          <NavLink to={"profile"} className="user-icon-container root-navlink">
            {user.picture ? (
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
            <label className="footer-label" htmlFor="dark-mode">
              {" "}
              Dark mode
            </label>
            <input name="dark-mode" type="checkbox" />
          </div>
        </div>
        <div className="footer-info-container"></div>
      </footer>
    </div>
  );
};

export default RootLayout;
