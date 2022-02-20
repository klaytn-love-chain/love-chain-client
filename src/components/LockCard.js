import React,{ useState, useEffect, useCallback } from 'react';
import { useInView } from "react-intersection-observer"
import styles from './LockCard.module.scss';
import { Image, Text } from '@chakra-ui/react'

function LockCard({ page, setPage, option, lockList, fetchLockDataOf }) {
    const [ref, inView] = useInView()
    const [scrolling, setScrolling] = useState(false)

    const getItems = useCallback(async () => {
        setScrolling(true)
        fetchLockDataOf()
        setScrolling(false)
    }, [page])

    useEffect(() => {
        getItems()
    }, [getItems])
    
    // 무한 스크롤링 기능
    useEffect(() => {
        if (inView && !scrolling) {
            setPage(prevState => prevState + 1)
        }
    }, [inView, scrolling])

    // 데이터 boolean값 확인용
    const true_or_false = (boolean) => {
        if (boolean) {
            return 'O'
        }
        return 'X'
    }

    // 내림차순 & 오름차순 정렬
    if (option.order == 'desc') {
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
                return (
                    <div key={idx} className={styles.card}>
                        {lockList.length - 1 == idx ? (
                            <div ref={ref}>
                                <Image src={item.lockImage} alt={'lockImage'} />
                                <br />
                                <Text> No. {item.tokenId} </Text>
                                <Text> id : {item._id}</Text>
                                <Text> {item.price}_KLAY </Text>
                                <Text> coupleImage : {true_or_false(item.feature.coupleImage)}</Text>
                                <Text> date : {true_or_false(item.feature.date)}</Text>
                                <Text> oneLine : {true_or_false(item.feature.oneLine)}</Text>
                                <Text> socialProfile : {true_or_false(item.feature.socialProfile)}</Text>
                                <Text> isAvailable : {true_or_false(item.isAvailable)}</Text>
                            </div>
                        ) : (
                            <div>
                                <Image src={item.lockImage} alt={'lockImage'} />
                                <br />
                                <Text> No. {item.tokenId} </Text>
                                <Text> id : {item._id}</Text>
                                <Text> {item.price}_KLAY </Text>
                                <Text> coupleImage : {true_or_false(item.feature.coupleImage)}</Text>
                                <Text> date : {true_or_false(item.feature.date)}</Text>
                                <Text> oneLine : {true_or_false(item.feature.oneLine)}</Text>
                                <Text> socialProfile : {true_or_false(item.feature.socialProfile)}</Text>
                                <Text> isAvailable : {true_or_false(item.isAvailable)}</Text>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
	);
}

export default LockCard;