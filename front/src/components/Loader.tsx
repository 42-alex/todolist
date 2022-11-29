import React from 'react';
import styles from './Loader.module.scss';

interface ILoader {
  loaderWord: string
}

const Loader = ({ loaderWord }: ILoader): JSX.Element | null => {

  return (
    <div className={styles.loaderWrapper} role="loader">
      <div className={styles.loader}>
        { loaderWord
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

