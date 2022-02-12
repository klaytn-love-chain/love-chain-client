import React from 'react';
import Header from './Header';
import styles from './Layout.module.scss';

function Layout({children, type}) {
	return (
		<div className={`${styles.layout} ${type === 'main' && styles.main}`}>
			<Header isLoggedIn={false} />  {/* 로그인 상태는 true, 비로그인 상태는 false */ }
			<div className={styles.container}>
				{children}
			</div>
		</div>
	);
}

export default Layout;

