import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { AccountPopover } from './accountPopover.js';
import { usePopover } from './usePopover.js';
import logo from '../../assets/logo.jpeg';
import { useUserStore } from '../../Store.js';
import style from './NavBar.module.css';
import styled from '@emotion/styled';

const NavBar = () => {
  const accountPopover = usePopover();
  const { user, removeUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let categories = ['Category 1', 'Category 2', 'Category 3'];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={style.container}>
        <NavLink to='/'>
          <img src={logo} alt='Equilibre' height={70} />
        </NavLink>

        {windowWidth < 750 ? (
          // Mobile View
          <label className={style.menuButtonWrapper} htmlFor="">
            <input type="checkbox" className={style.menuButton} />
            <div className={style.iconWrapper}>
              <label className={style.hamburger}>
                <input className={style.hamburgerInput} type="checkbox" />
                <span className={`${style.hamburgerLine} ${style.first}`}></span>
                <span className={`${style.hamburgerLine} ${style.second}`}></span>
                <span className={`${style.hamburgerLine} ${style.third}`}></span>
              </label>
            </div>
            <ul className={style.itemList}>

              <li>
                <p>
                  Products
                  <KeyboardArrowDown />
                </p>
                <ul className={style.dropdownMenu}>
                  <div className={style.categories}>
                  {categories.map((category) => (
                    <li key={category} >
                      <NavLink to={`/products/${category}`}>
                        {category}
                      </NavLink>
                    </li>
                  ))}
                  </div>
                </ul>
              </li>

              <NavLink to='/consultation' className={style.navLinks}>
                <li>
                  <p>Consultation</p>
                </li>
              </NavLink>
              <NavLink to='/about' className={style.navLinks}>
                <li>
                  <p>About US</p>
                </li>
              </NavLink>
              <NavLink to='/contactUs' className={style.navLinks}>
                <li>
                  <p>Contact</p>
                </li>
              </NavLink>
              <NavLink to='/profile' className={style.navLinks}>
                <li>
                  <p>Profile</p>
                </li>
              </NavLink>
              <NavLink to='/login' className={style.navLinks}>
                <li>
                  <p>Login</p>
                </li>
              </NavLink>
              <NavLink to='/cart' className={style.navLinks}>
                <li>
                  <p>Cart</p>
                </li>
              </NavLink>
            </ul>
          </label>
        ) : (
          <>
            <div className={`${style.navbar}`}>
              <ul className={`${style.navbarLinks} ${isOpen ? style.open : ''}`}>
              <NavLink  className={`${style.navLinks} ${style.dropDownContainer}`}>
                <li>
                  <p  style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    Products
                    <div>
                      <KeyboardArrowDown />
                    </div>
                  </p>
                  {/* Dropdown Menu for Desktop */}
                  <ul className={style.dropdownMenuDesktop}>
                    <div className={style.categories}>
                    {categories.map((category) => (
                      <li key={category} className={style.categories}>
                        <NavLink to={`/products/${category}`}>
                          {category}
                        </NavLink>
                      </li>
                    ))}
                    </div>
                  </ul>
                </li>
                </NavLink >
                <NavLink to='/consultation' className={style.navLinks}>
                  <li>
                    <p>Consultation</p>
                  </li>
                </NavLink>
                <NavLink to='/about' className={style.navLinks}>
                  <li>
                    <p>About us</p>
                  </li>
                </NavLink>
                <NavLink to='/contact' className={style.navLinks}>
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
                      cursor: 'pointer',
                      height: 35,
                      width: 35,
                      marginLeft: 1.5,
                      color: 'black',
                    }}
                  />
                  <NavLink to='/cart' className={style.navLinks}>
                    <ShoppingCartOutlined
                      sx={{
                        cursor: 'pointer',
                        height: 30,
                        width: 35,
                        marginLeft: 1.5,
                        color: 'black',
                      }}
                    />
                  </NavLink>
                </>
              ) : (
                <NavLink to='/login'>
                  <button className={style.loginButton}>Login</button>
                </NavLink>
              )}
            </div>
          </>
        )}

        <AccountPopover anchorEl={accountPopover.anchorRef.current} open={accountPopover.open} onClose={accountPopover.handleClose} />
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
