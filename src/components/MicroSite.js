/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './MicroSite.module.scss';
import { LOCK_OWNER_INFO as data } from '../constant'
import dayjs from 'dayjs';

function MicroSite() {
	const now = dayjs();
	const coupleDate = dayjs(data.options.date);

	return (
		<div className={styles.container}>
			<img className={styles.lock_image} src="/images/sample-lock.png" alt="lock" />
			<div className={styles.profile}>
				<img className={styles.profile_one} src={data.profileImage.oneImage} alt="oneImage" />
				<img className={styles.profile_two} src={data.profileImage.twoImage} alt="oneImage" />
			</div>
			<div className={styles.couple_name}>현아 💛️ 이던</div>
			<div className={styles.date}>우리가 만난 지<br/>{`${now.diff(coupleDate, 'day')}일..! 🥰`}</div>
		</div>
	);
}

export default MicroSite;

