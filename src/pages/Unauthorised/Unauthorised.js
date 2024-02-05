import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Unauthorised.module.css";
function Unauthorised() {
  return (
    <div className={style.unauthorisedContainer}>
      <h1>Admin Zone</h1>
      <p>
        You don't have access to this page.{" "}
        <NavLink to={"/login"}>Sign in with an admin account</NavLink> or{" "}
        <NavLink to={"/"}>Return to homepage</NavLink>{" "}
      </p>
    </div>
  );
}

export default Unauthorised;
