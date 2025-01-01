import "./Profile.css";
// react
import React, { useContext, useState } from "react";
// auth
import { googleLogout} from "@react-oauth/google";
import { AppContext } from "../../context/AppContext";
// jwt

// functions
const logoutClickHandler = (setUserInfo,setLoggedIn) => {
  googleLogout();
  setUserInfo({});
  setLoggedIn(false); 
}

const Profile = () => {
  const {setUser,setLoggedIn} = useContext(AppContext);

  return (
    <div>
     <button onClick={() => {
      logoutClickHandler(setUser,setLoggedIn)
     }}>Logout</button>
    </div>
  );
};

export default Profile;
