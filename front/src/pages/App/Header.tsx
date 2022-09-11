import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.headerNav} container`}>
        <span className={styles.siteLogo}>
          <a href="#" className={styles.siteLogoLink}>Logo</a>
        </span>
        <span className={styles.siteMenu}>
          <Link to="/" className={styles.siteMenuLink}>Home</Link>
          <Link to="/add" className={styles.siteMenuLink}>Add Todo</Link>
          <Link to="/edit" className={styles.siteMenuLink}>Edit Todo</Link>
        </span>
      </nav>
    </header>
  )
}

export default Header;