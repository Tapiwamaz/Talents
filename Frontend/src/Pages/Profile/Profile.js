import "./Profile.css";
// react
import React, { useContext, useState } from "react";
// auth
import { googleLogout } from "@react-oauth/google";
//context
import { AppContext } from "../../context/AppContext";
// icons
import {
  ArrowLeftStartOnRectangleIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import Modal from "../../Components/Modal/Modal";

// functions
const logoutClickHandler = (
  setUserInfo,
  setLoggedIn,
  setAllTransactions,
  setTransactions,
  setFetchedTransactions,
  setSummaryData,
  setLoaded
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
  let exampleArr = [1, 2];

  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setLoggedIn,
    setAllTransactions,
    setFetchedTransactions,
    setSummaryData,
    setTransactions,
    setLoaded,
  } = useContext(AppContext);

  return (
    <main className="profile-main">
      <section className="profile-top-section">
        {!user.picture ? (
          <img
            alt="profile-picture"
            src={user.picture}
            className="profile-user-icon-default"
          />
        ) : (
          <UserIcon className="profile-user-icon" />
        )}
        <div>
          <h3 className="profile-name">{user.name + " " + user.surname}</h3>
          <h3 className="profile-email">{user.email}</h3>
          <ArrowLeftStartOnRectangleIcon
            onClick={() => {
              logoutClickHandler(
                setUser,
                setLoggedIn,
                setAllTransactions,
                setTransactions,
                setFetchedTransactions,
                setSummaryData,
                setLoaded
              );
            }}
            className="profile-logout-button"
          />
        </div>
      </section>

      <div className="divider-line" />

      <section className="profile-mid-section">
        <div className="upload-summary-card">
          <h4>Uploads</h4>
          <div className="card-holder">
            <div className="summary-subcard">
              <p>Banks</p>
              <div className="icon-holder">
                {exampleArr.map((index, s) => (
                  <img
                    key={index}
                    src="/StandardLogo.png"
                    alt="fig1"
                    className="subcard-icon bank"
                  />
                ))}
              </div>
              <p>Transactions</p>
              <text>10000</text>
            </div>

            <div className="summary-subcard">
              <p>Statements</p>
              <div className="icon-holder">
                {exampleArr.slice(0, 5).map((s) => (
                  <DocumentCheckIcon className="subcard-icon" />
                ))}
              </div>
              <p>Dates</p>
              <text>12 Aug 2024 to 12 Feb 2025</text>
            </div>
          </div>
        </div>

        <div className="upload-summary-card">
          <h4>Activity</h4>
          <div className="summary-subcard"></div>
        </div>
      </section>

      <div className="divider-line" />

      <section className="delete-section">
        <div className="button-holder">
          <div className="profile-text-section">
            <label>Delete any statement</label>
            <text>(Click and select any of your saved statements)</text>
          </div>
          <button className="btn-delete">Delete</button>
        </div>
        <div className="button-holder">
          <div className="profile-text-section">
            <label>Clear all data</label>
            <text>
              (Remove all saved data including your profile and all
              transactions)
            </text>
          </div>
          <button className="btn-delete" onClick={() => setOpen(true)}>
            Clear
          </button>
        </div>
      </section>
      <Modal onClose={() => setOpen(false)} open={open}>
        <ExclamationTriangleIcon className="modal-icon" />
        <h3 className="modal-title">
          Clear All 
        </h3>
        <text className="modal-subtitle">
          Once deleted, no information can be retrieved. Are you sure?
        </text>
        <div className="modal-button-holder">
          <button className="modal-btn" onClick={() => setOpen(false)}>No, Keep it!</button>
          <button className="modal-btn btn-yes">Yes, Delete!</button>
        </div>
      </Modal>
    </main>
  );
};

export default Profile;
