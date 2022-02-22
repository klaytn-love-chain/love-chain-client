import React from 'react';
import Header from './Header';
import styles from './Layout.module.scss';

function Layout({ children, type }) {
  return (
    <div
      className={`
			${styles.layout}
			${type === 'main' && styles.main}
			${type === 'minisite' && styles.minisite}`}
    >
      {type !== 'minisite' && <Header />}
      <div className={styles.container}>{children}</div>
    </div>
  );
}

export default Layout;
