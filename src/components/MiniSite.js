/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './MiniSite.module.scss';
import { DOMAIN_URL, KAKAO_JS_KEY } from '../constant';
import dayjs from 'dayjs';
import {
	Button, Image,
	Alert, AlertIcon, AlertTitle, AlertDescription,
} from '@chakra-ui/react';
import { useScript } from "../hooks/useScript";
import { getItemUserInfo } from '../constant/api';

function MiniSite() {
	const router = useRouter();
  const { tokenId } = router.query;
	const now = dayjs();
	const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
	const SHARE_URL = `${DOMAIN_URL}/site/${tokenId}`;
	const [info, setInfo] = useState(null);

	const initPage = useCallback(async () => {
		if (tokenId) {
			const data = await getItemUserInfo(tokenId);
			setInfo(data);
		};
	}, [tokenId]);

	useEffect(() => {
		if (status === "ready" && window.Kakao) {
				// 중복 initialization 방지
				if (!window.Kakao.isInitialized()) {
						// 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
					window.Kakao.init(KAKAO_JS_KEY);
				}
		}
	}, [status]);

	useEffect(() => {
		initPage();
	}, [initPage]);


	const handleKakaoButton = () => {
		//window.Kakao.Link.sendScrap({
		//		requestUrl: SHARE_URL,
		//});
		window.Kakao.Link.sendDefault({
			objectType: "feed",
				content: {
					title: `${info?.profileName.oneName} 💛️ ${info?.profileName.twoName} 영원한 사랑의 약속`,
					description: "러브체인 | Klaytn 사랑의 자물쇠 NFT",
					imageUrl: info?.lockImage,
					link: {
						mobileWebUrl: SHARE_URL,
						androidExecParams: "LOVE-CHAIN",
					},
				},
				buttons: [
					{
						title: "러브체인 미니페이지로 이동",
						link: {
							mobileWebUrl: SHARE_URL,
						},
					},
				],
		});
};

	return (
		<>
			{info?.isPrivate && (
				<div className={styles.container}>
				<Alert
					status='info'
					variant='subtle'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					textAlign='center'
					height='200px'
					marginBottom='30px'
					backgroundColor='transparent'
					marginTop='60px'
				>
					<AlertIcon boxSize='40px' mr={0} color='white'/>
					<AlertTitle mt={4} mb={1} fontSize='lg'>
						미니사이트가 비공개 상태입니다.
					</AlertTitle>
					<AlertDescription maxWidth='sm'>
						러브체인 자물쇠 소유자는 <br />
						미니사이트의 공개여부를 선택할 수 있습니다.
					</AlertDescription>
					</Alert>
				</div>
			)}
			{!info?.isPrivate && (
				<>
				<Head>
					<title>러브체인 | 영원한 사랑의 약속</title>
					<meta property="og:title" content="러브체인 | 영원한 사랑의 약속" />
					<meta property="og:image" content="/images/graph.png" />
					<meta name="description" content="Klaytn 사랑의 자물쇠 NFT" />
					<meta property="og:description" content="Klaytn 사랑의 자물쇠 NFT" />
				</Head>
					<div className={styles.container}>
						<img className={styles.lock_image} src={info?.lockImage} alt=""/>
						<div className={styles.profile}>
							{info?.profileImage?.onePerson && <img className={styles.profile_one} src={info?.profileImage?.onePerson} alt="profile image" />}
							{info?.profileImage?.twoPerson && <img className={styles.profile_two} src={info?.profileImage?.twoPerson} alt="profile image" />}
						</div>
						<div className={styles.couple_name}>{info?.profileName.oneName} 💛️ {info?.profileName.twoName}</div>

						<div className={styles.social_instagram}>
							{
								info?.options.socialProfile.oneInstagram && (
									<a href={`https://www.instagram.com/${info?.options.socialProfile.oneInstagram}`} target='_blank' rel="noreferrer">
										<span>@{info?.options.socialProfile.oneInstagram}</span>
									</a>
								)
							}
							{
								info?.options.socialProfile.twoInstagram && (
									<a href={`https://www.instagram.com/${info?.options.socialProfile.twoInstagram}`} target='_blank' rel="noreferrer">
										<span>@{info?.options.socialProfile.twoInstagram}</span>
									</a>
								)
							}
						</div>

						{info?.options.date && <div className={styles.date}>우리가 만난 지<br />{`${now.diff(dayjs(info?.options.date), 'day')}일..!`}</div>}

						{(info?.options.socialProfile.oneTwitter || info?.options.socialProfile.twoTwitter) && (
						<div className={styles.social_twitter}>
							{
								info?.options.socialProfile.oneTwitter && (
									<a className={styles.one} href={`https://twitter.com/${info?.options.socialProfile.oneTwitter}`} target='_blank' rel="noreferrer">
										<img src='/images/twitter.png' alt='' />
										<span>@{info?.options.socialProfile.oneTwitter}</span>
									</a>
								)
							}
							{
								info?.options.socialProfile.twoTwitter && (
									<a className={styles.two} href={`https://twitter.com/${info?.options.socialProfile.twoTwitter}`} target='_blank' rel="noreferrer">
										<img src='/images/twitter.png' alt='' />
										<span>@{info?.options.socialProfile.twoTwitter}</span>
									</a>
								)
							}
						</div>
						)}

						{info?.options.coupleImage && (
						<div className={styles.couple_image}>
							<img src={info?.options.coupleImage} alt="couple image" />
						</div>)}

						{info?.options.oneLine && <div className={styles.text}>{info?.options.oneLine}</div>}

						<div className={styles.social_url}>
							{info?.options.socialProfile.oneURL && (
								<a className={styles.link} href={info?.options.socialProfile.oneURL} target='_blank' rel="noreferrer">{info?.options.socialProfile.oneURL}</a>
							)}
							{info?.options.socialProfile.twoURL && (
								<a className={styles.link} herf={info?.options.socialProfile.twoURL} target='_blank' rel="noreferrer">{info?.options.socialProfile.twoURL}</a>
							)}
						</div>

						<div className={styles.util}>
							<Link href="/">
								<a>
									<Image src="/images/logo.svg" alt="love-chain" width={200} height={100} />
									<p className={styles.slogan}>
										{(info?.profileName?.oneName && info?.profileName.twoName) && `${info?.profileName?.oneName} 💛️ ${info?.profileName.twoName}`} <br />
										영원한 사랑의 약속, 러브체인</p>
								</a>
							</Link>
							<Button className={styles.button} colorScheme='yellow' variant='outline' isFullWidth onClick={handleKakaoButton}>카카오로 공유하기</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default MiniSite;

