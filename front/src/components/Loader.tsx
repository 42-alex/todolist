import React from 'react';
import styles from './Loader.module.scss';

const Loader = (): JSX.Element | null => {

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        { 'loading'
            .split('')
            .map((char: string, index: number) => (
              <span key={index}>
                {char}
              </span>)
            )
        }
      </div>
    </div>
  );
};

export default Loader;

