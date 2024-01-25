import React, { useState } from "react";
import Style from "./Sidebar.module.css";
import { MailSvg } from "../../assets/svgComponent/MailSvg";
import { ProductSvg } from "../../assets/svgComponent/ProductSvg";
import { OrderSvg } from "../../assets/svgComponent/OrderSvg";
import { TestimoliasSvg } from "../../assets/svgComponent/TestimoliasSvg";
import { Dashboard } from "../../assets/svgComponent/DashbordSvg";
import { NavLink, Outlet } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <sidenav className={Style.section}>
        <div className={Style.brgr}></div>
        <div className={Style.brgr}></div>
        <div className={Style.brgr}></div>
        <ul className={Style.navContainer}>
          <li>
            <NavLink
              to="/dashboard"
              exact
              className={({ isActive }) =>
                isActive ? Style.active : Style.noActive
              }
            >
              <Dashboard /> <span>Dashboard </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? Style.active : Style.noActive
              }
            >
              <OrderSvg />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? Style.active : Style.noActive
              }
            >
              <ProductSvg /> <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? Style.active : Style.noActive
              }
            >
              <TestimoliasSvg />
              <span>Testimonials</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? Style.active : Style.noActive
              }
            >
              <MailSvg /> <span>Mails</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive ? Style.active : Style.noActive
              }
            >
              <MailSvg /> <span>Users</span>
            </NavLink>
          </li>
        </ul>
      </sidenav>
      <Outlet />
    </>
  );
};
export default Sidebar;
