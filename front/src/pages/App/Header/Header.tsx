import React from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const Header = (): JSX.Element => {

  return (
    <header className={styles.header}>
      <nav className={`${styles.headerNav} container`}>
        <span className={styles.siteLogo}>
          <a href="#" className={styles.siteLogoLink}>Logo</a>
        </span>
        <span className={styles.siteMenu}>
          <NavLink to="/" className={styles.siteMenuLink}>Home</NavLink>
          <NavLink to="/add" className={styles.siteMenuLink}>Add Todo</NavLink>
          <NavLink to="/edit" className={styles.siteMenuLink}>Edit Todo</NavLink>
        </span>
      </nav>
    </header>
  )
}

export default Header;