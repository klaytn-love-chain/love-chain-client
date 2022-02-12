/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link'
import styles from './Main.module.scss';
import { Flex, Box, Heading, Button } from '@chakra-ui/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function Main() {
	return (
		<>
			<div className={styles.hero}>
				<img className={styles.logo} src="/images/logo_main.png" alt="love-chain" />
			</div>
			<div>
				<div className={styles.stars}></div>
				<div className={styles.stars2}></div>
				<div className={styles.stars3}></div>
			</div>
			<div className={styles.intro}>
				<p>영원한 사랑의 약속,<br/> 러브체인에 기록해보세요! </p>
				<p>Klaytn 사랑의 자물쇠 NFT<br/>남산타워 스팟 한정판 500피스 오픈</p>
				<p>특별한 기념일에 연인과 함께<br/>러브체인 자물쇠를 걸어보세요!</p>
			</div>
			<Flex className={styles.feature} direction={['column', 'column', 'row']} padding={['0 5%', '0 12%', '0 5%', '0 12%', '0 15%']}>
				<Box className={styles.item} width={[1, 1 / 2, 1 / 3]} margin={['0 0 30px', '0 0 30px', '0 20px 20px', '0 20px 20px']}>
					<div className={styles.thumbnail}></div>
					<p className={styles.text}>
						러브체인 자물쇠를 구매하면,<br/>
						Klaytn에 2명의 이름을<br/>
						기록할 수 있습니다.
					</p>
				</Box>
				<Box className={styles.item} width={[1, 1 / 2, 1 / 3]} margin={['0 0 30px', '0 0 30px', '0 20px 20px', '0 20px 20px']}>
					<div className={styles.thumbnail}></div>
					<p className={styles.text}>
						특별한 러브체인 자물쇠들은 추가적으로<br/>
						(1) 사랑을 시작한 날짜,<br/>
						(2) 커플을 소개할 수 있는 한 줄 문장,<br/>
						(3) 연인과의 사진,<br/>
						(4) 커플들의 소셜프로필 링크<br/>
						를 기록할 수 있습니다.<br/>
					</p>
				</Box>
				<Box className={styles.item} width={[1, 1 / 2, 1 / 3]} margin={['0 0 30px', '0 0 30px', '0 20px 20px', '0 20px 20px']}>
					<div className={styles.thumbnail}></div>
					<p className={styles.text}>
						러브체인 자물쇠는<br/>
						기록한 정보를 바탕으로<br/>
						마이크로사이트를 제공합니다.<br/>
						(이미지 다운로드, 소셜미디어 공유)
					</p>
				</Box>
			</Flex>
			<div className={styles.trending}>
				<Heading mt="80px" mb="20px" color="#7c33e7">
					LOCK TRENDS
				</Heading>
				<Swiper
					modules={[Navigation, Scrollbar, Autoplay]}
					spaceBetween={50}
					navigation
					scrollbar={{ draggable: true }}
					loop={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					breakpoints={{
					320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          960: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
				>
					<SwiperSlide className={styles.slide}>
						<div className={styles.item}></div>
						1위
					</SwiperSlide>
					<SwiperSlide className={styles.slide}>
						<div className={styles.item}></div>
						2위
					</SwiperSlide>
					<SwiperSlide className={styles.slide}>
						<div className={styles.item}></div>
						3위
					</SwiperSlide>
					<SwiperSlide className={styles.slide}>
						<div className={styles.item}></div>
						4위
					</SwiperSlide>
					<SwiperSlide className={styles.slide}>
						<div className={styles.item}></div>
						5위
					</SwiperSlide>
				</Swiper>
			</div>
			<div className={styles.market}>
				<Link href="/item">
					<a>
						<Button bgColor='#7c33e7' size='lg' color='#fff'>
							러브체인 자물쇠 구매하기
						</Button>
					</a>
				</Link>
			</div>
		</>
	)
}

export default Main;

