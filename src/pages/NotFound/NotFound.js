import React from "react";
import Styles from "./NotFound.module.css";
import notFound from "../../assets/notfound.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUserStore } from "../../Store.js";
const NotFound = () => {
  const { user } = useUserStore();

  return (
    <div className={Styles.imageContainer}>
      <Helmet>
        <title>Equilibre - not-found</title>
        <meta name="decription" content="" />
      </Helmet>

      <img
        src={notFound}
        alt="PAGE NOT FOUND"
        className={Styles.notFoundImage}
      />
      <div>
        <Link to="/">
          <button className={Styles.goHome}>Home</button>
        </Link>
        {user && user.isAdmin === true && (
          <Link to="/dashboard/overview">
            <button className={Styles.goHome}>Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
