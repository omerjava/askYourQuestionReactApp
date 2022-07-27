import React from "react";
import "./Navbar.css";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { Link } from "react-router-dom";
import { authApiCall } from "../../api-calls/auth-api-calls";


function Navbar() {
  const { usernameLoggedIn, setLoggedIn, setUsernameLoggedIn} = useContext(AllContext);

  return (
    <div className="navbar">
      <div className="welcome">
        <div className="appName"><Link to="/" className="linkHome"> Ask Your Question!</Link></div>
        <div className={usernameLoggedIn ? "userWelcome" : "doNotShow"}>Welcome {usernameLoggedIn}!</div>
      </div>
      <ul>
        <li className="login">
          <Link to="/login"> Login </Link>
        </li>
        <li className="logout">
          <Link to="/" onClick={() => {authApiCall.logout(); setLoggedIn(false); 
          setUsernameLoggedIn(null); }}> Logout </Link>
        </li>
        <li>
          <Link to="/register"> Register </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
