import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutline from "@mui/icons-material/PersonOutline";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { AccountPopover } from "./accountPopover.js";
import { usePopover } from "./usePopover.js";
import logo from "../../assets/logo.jpeg";
import { useUserStore } from "../../Store.js";
import style from "./NavBar.module.css";
import { toast } from "react-toastify";
import axios from "axios";
const NavBar = () => {
  const accountPopover = usePopover();
  const navigate = useNavigate();
  const { user, removeUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function logout() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}user/logout`
      );
      if (response) {
        toast.success(response.data.message);
        removeUser();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className={style.container}>
        <NavLink to="/">
          <img src={logo} alt="Equilibre" height={70} />
        </NavLink>

        {windowWidth < 900 ? (
          // Mobile View
          <label className={style.menuButtonWrapper} htmlFor="">
            <input type="checkbox" className={style.menuButton} />
            <div className={style.iconWrapper}>
              <label className={style.hamburger}>
                <input className={style.hamburgerInput} type="checkbox" />
                <span
                  className={`${style.hamburgerLine} ${style.first}`}
                ></span>
                <span
                  className={`${style.hamburgerLine} ${style.second}`}
                ></span>
                <span
                  className={`${style.hamburgerLine} ${style.third}`}
                ></span>
              </label>
            </div>
            <ul className={style.itemList}>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? style.activeLinks : style.navLinks
                }
              >
                <li>
                  <p>Products</p>
                </li>
              </NavLink>

              <NavLink
                to="/consultation"
                className={({ isActive }) =>
                  isActive ? style.activeLinks : style.navLinks
                }
              >
                <li>
                  <p>Consultation</p>
                </li>
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? style.activeLinks : style.navLinks
                }
              >
                <li>
                  <p>About US</p>
                </li>
              </NavLink>
              <NavLink
                to="/contactUs"
                className={({ isActive }) =>
                  isActive ? style.activeLinks : style.navLinks
                }
              >
                <li>
                  <p>Contact</p>
                </li>
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? style.activeLinks : style.navLinks
                }
              >
                <li>
                  <p>Profile</p>
                </li>
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? style.activeLinks : style.navLinks
                }
              >
                <li>
                  <p>Cart</p>
                </li>
              </NavLink>
              {user && (
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? style.activeLinks : style.navLinks
                  }
                >
                  <li onClick={logout}>
                    <p style={{ color: "#ee544a" }}>log out</p>
                  </li>
                </NavLink>
              )}
              {!user && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? style.activeLinks : style.navLinks
                  }
                >
                  <li>
                    <p>Login</p>
                  </li>
                </NavLink>
              )}
            </ul>
          </label>
        ) : (
          <>
            <div className={`${style.navbar}`}>
              <ul
                className={`${style.navbarLinks} ${isOpen ? style.open : ""}`}
              >
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? style.activeLinks : style.navLinks
                  }
                >
                  <li>
                    <p>Home</p>
                  </li>
                </NavLink>

                <NavLink
                  className={`${style.navLinks} ${style.dropDownContainer}`}
                  to="/products"
                >
                  <li>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      Products
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          height: "20px",
                        }}
                      ></div>
                    </p>
                  </li>
                </NavLink>
                <NavLink
                  to="/consultation"
                  className={({ isActive }) =>
                    isActive ? style.activeLinks : style.navLinks
                  }
                >
                  <li>
                    <p>Consultation</p>
                  </li>
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? style.activeLinks : style.navLinks
                  }
                >
                  <li>
                    <p>About us</p>
                  </li>
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? style.activeLinks : style.navLinks
                  }
                >
                  <li>
                    <p>Contact</p>
                  </li>
                </NavLink>
              </ul>
            </div>
            <div className={style.containerRight}>
              {user ? (
                <>
                  <PersonOutline
                    onClick={accountPopover.handleOpen}
                    ref={accountPopover.anchorRef}
                    sx={{
                      cursor: "pointer",
                      height: 35,
                      width: 35,
                      marginLeft: 1.5,
                      color: "black",
                    }}
                  />
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive ? style.activeLinks : style.navLinks
                    }
                  >
                    <ShoppingCartOutlined
                      sx={{
                        cursor: "pointer",
                        height: 30,
                        width: 35,
                        marginLeft: 1.5,
                        marginRight: 1.5,
                        color: "black",
                      }}
                    />
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive ? style.activeLinks : style.navLinks
                    }
                  >
                    <ShoppingCartOutlined
                      sx={{
                        cursor: "pointer",
                        height: 25,
                        width: 30,
                        marginLeft: 1.5,
                        marginRight: 1.8,
                        color: "black",
                      }}
                    />
                  </NavLink>
                  <NavLink to="/login">
                    <button className={style.loginButton}>Login</button>
                  </NavLink>
                </>
              )}
            </div>
          </>
        )}
        {user && (
          <AccountPopover
            anchorEl={accountPopover.anchorRef.current}
            open={accountPopover.open}
            onClose={accountPopover.handleClose}
          />
        )}
      </nav>
    </>
  );
};

export default NavBar;
