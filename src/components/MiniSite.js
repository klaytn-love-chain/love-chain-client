/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './MiniSite.module.scss';
import { LOCK_OWNER_INFO as data, DOMAIN_URL, KAKAO_JS_KEY } from '../constant';
import dayjs from 'dayjs';
import { Button, Image } from '@chakra-ui/react';
import { useScript } from "../hooks/useScript";

function MiniSite() {
	const router = useRouter();
  const { tokenId } = router.query;
	const now = dayjs();
	const coupleDate = dayjs(data.options.date);
	const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
	const SHARE_URL = `${DOMAIN_URL}/site/${tokenId}`;

	useEffect(() => {
		if (status === "ready" && window.Kakao) {
				// 중복 initialization 방지
				if (!window.Kakao.isInitialized()) {
						// 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
					window.Kakao.init(KAKAO_JS_KEY);
				}
		}
	}, [SHARE_URL, status]);

	const handleKakaoButton = () => {
		//window.Kakao.Link.sendScrap({
		//		requestUrl: SHARE_URL,
		//});
		window.Kakao.Link.sendDefault({
			objectType: "feed",
				content: {
					title: '영원한 사랑의 약속, 러브체인',
					description: "",
					imageUrl: "https://love-chain.vercel.app/images/sample-lock.png",
					link: {
						mobileWebUrl: SHARE_URL,
						androidExecParams: "test",
					},
				},
				buttons: [
					{
						title: "웹으로 이동",
						link: {
							mobileWebUrl: SHARE_URL,
						},
					},
				],
		});
};

	return (
		<div className={styles.container}>
			<img className={styles.lock_image} src="/images/sample-lock.png" alt="lock" />
			<div className={styles.profile}>
				<img className={styles.profile_one} src={data.profileImage.oneImage} alt="profile image" />
				<img className={styles.profile_two} src={data.profileImage.twoImage} alt="profile image" />
			</div>
			<div className={styles.couple_name}>현아 💛️ 이던</div>
			<div className={styles.text}>우리가 만난 지<br />{`${now.diff(coupleDate, 'day')}일..! 🥰`}</div>
			<div className={styles.couple_image}>
				<img src={data.options.coupleImage} alt="couple image" />
			</div>
			<div className={styles.text}>{data.options.oneLine}</div>
			<div className={styles.util}>
				<Link href="/">
					<a>
						<Image src="/images/logo.svg" alt="love-chain" width={200} height={100} />
						<p className={styles.slogan}>영원한 사랑의 약속, 러브체인</p>
					</a>
				</Link>
				<Button className={styles.button} colorScheme='yellow' variant='outline' isFullWidth onClick={handleKakaoButton}>카카오로 공유하기</Button>
			</div>
		</div>
	);
}

export default MiniSite;

