import React from 'react';
import styles from './Loader.module.scss';

const Loader = (): JSX.Element | null => {

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <span key="l">L</span>
        <span key="o">o</span>
        <span key="a">a</span>
        <span key="d">d</span>
        <span key="i">i</span>
        <span key="n">n</span>
        <span key="g">g</span>
      </div>
    </div>
  );
};

export default Loader;

