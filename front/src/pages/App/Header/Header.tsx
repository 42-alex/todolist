import React from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../../logo.png';

const Header = (): JSX.Element => {

  return (
    <header className={styles.header}>
      <nav className={`${styles.headerNav} container`}>
        <span className={styles.siteLogo}>
          <NavLink to="/" className={styles.siteLogoLink}>
            <img src={logo} alt="logo" title="Go to home page" />
          </NavLink>
        </span>
        <span className={styles.siteMenu}>
          <NavLink to="/" className={styles.siteMenuLink}>Home</NavLink>
          <NavLink to="/add" className={styles.siteMenuLink}>Add Todo</NavLink>
        </span>
      </nav>
    </header>
  )
}

export default Header;