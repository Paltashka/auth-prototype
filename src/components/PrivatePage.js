import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../style/PrivatePage.css";
import { useHistory } from "react-router-dom";

const PrivatePage = () => {
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const isAuthenticated = () => {
    return state.isAuthenticated && state.expiration > Date.now();
  };

  const isAuthenticatedValue = isAuthenticated();

  useEffect(() => {
    const privateContainer = document.querySelector(".private-container");
    if (isAuthenticatedValue) {
      privateContainer.classList.add("show");
    } else {
      privateContainer.classList.remove("show");
    }
  }, [isAuthenticatedValue]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  return (
    <div className="private-container">
      <button
        type="button"
        onClick={handleLogout}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        Logout
      </button>

      <h2>Private Page</h2>
      {isAuthenticatedValue ? <p>Welcome, {state.username}!</p> : null}
    </div>
  );
};

export default PrivatePage;
