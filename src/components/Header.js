import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import { useUserState } from '../contexts/useUserContext';

function Header() {
  const { isLoggedIn } = useUserState();

  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.logo}>
          <Image src="/images/logo.svg" alt="love-chain" width={100} height={50} />
        </a>
      </Link>
      <div className={styles.menu}>
        <Link href="/item">
          <a className={styles.menu_item}>Market</a>
        </Link>
        {isLoggedIn ? (
          <Link href="/my">
            <a className={styles.menu_item}>
              <div className={styles.user} />
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a className={styles.menu_item}>Klip 로그인</a>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
