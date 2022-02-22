
import React,{ useState, useEffect, useCallback } from 'react';
import { useInView } from "react-intersection-observer"

import styles from './LockCard.module.scss';
import { Image, Text, Button } from '@chakra-ui/react'
import Link from 'next/link';

function LockCard({ page, setPage, optionData, lockList, scrolling }) {
    const [ref, inView] = useInView()
    
    // 무한 스크롤링 기능
    useEffect(() => {
        if (inView && !scrolling) {
            setPage(prevState => prevState + 1)
        }
        console.log('page : ', page)
    }, [inView])

    // 데이터 boolean값 확인용
    const true_or_false = (boolean) => {
        if (boolean) {
            return 'O'
        }
        return 'X'
    }

    // 내림차순 & 오름차순 정렬
    if (optionData.order == 'desc') {
        lockList.sort((a, b) => {
            return b - a
        })
    } else {
        lockList.sort((a, b) => {
            return a - b
        })
    }

	return (
        <div className={styles.cardContainer}>
            {lockList.map((item, idx) => {
                const lastElement = lockList.length - 1
                return (

                // <div key={item.tokenId} className={styles.card}>
                //         <Image src={item.lockImage} />
                //         <br />
                //         <Text className={styles.tokenId}>
                //             No. {item.tokenId}
                //         </Text>
                //         <Text className={styles.price}>
                //             {item.price} KLAY
                //         </Text>
                //         <Link href={`/item/${item.tokenId}`}>
                //             <Button> 자세히 </Button>
                //         </Link>
                // </div>

                    <div key={idx} className={styles.card}>
                        <div ref={(idx == lastElement ? ref : null)}>
                            <Image src={item.lockImage} alt={'lockImage'} style={{ borderRadius: '1rem' }}/>
                            <br />
                            <Text> No. {item.tokenId} </Text>
                            <Text> id : {item._id}</Text>
                            <Text> {item.price}_KLAY </Text>
                            <Text> coupleImage : {true_or_false(item.feature.coupleImage)}</Text>
                            <Text> date : {true_or_false(item.feature.date)}</Text>
                            <Text> oneLine : {true_or_false(item.feature.oneLine)}</Text>
                            <Text> socialProfile : {true_or_false(item.feature.socialProfile)}</Text>
                            <Text> isAvailable : {true_or_false(item.isAvailable)}</Text>
                            <Link href={`/item/${item.tokenId}`}>
                                <Button> 자세히 </Button>
                             </Link>
                        </div>
                    </div>

                )
            })}
        </div>
	);
}

export default LockCard;