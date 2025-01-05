import "./Profile.css";
// react
import React, { useContext, useState } from "react";
// auth
import { googleLogout } from "@react-oauth/google";
import { AppContext } from "../../context/AppContext";
// jwt

// functions
const logoutClickHandler = (
  setUserInfo,
  setLoggedIn,
  setAllTransactions,
  setTransactions,
  setFetchedTransactions,
  setSummaryData,
  setLoaded,
  setFile
) => {
  googleLogout();
  setUserInfo({});
  setLoggedIn(false);
  setLoaded(false);
  setAllTransactions([]);
  setTransactions([]);
  setFetchedTransactions([]);
  setSummaryData({});
};

const Profile = () => {
  const {
    setUser,
    setLoggedIn,
    setAllTransactions,
    setFetchedTransactions,
    setSummaryData,
    setTransactions,
    setLoaded,
  } = useContext(AppContext);

  return (
    <div>
      <button
        onClick={() => {
          logoutClickHandler(setUser, setLoggedIn,setAllTransactions,setTransactions,setFetchedTransactions,setSummaryData,setLoaded);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
