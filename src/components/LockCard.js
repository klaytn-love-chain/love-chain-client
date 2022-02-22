import React from 'react';
import Link from 'next/link';
import styles from './LockCard.module.scss';
import { Image, Text, Button } from '@chakra-ui/react'

function LockCard({ list }) {
	return (
        <div className={styles.cardContainer}>
            {list.map((item) => {
                return (
                <div key={item.tokenId} className={styles.card}>
                        <Image src={item.lockImage} />
                        <br />
                        <Text className={styles.tokenId}>
                            No. {item.tokenId}
                        </Text>
                        <Text className={styles.price}>
                            {item.price} KLAY
                        </Text>
                        <Link href={`/item/${item.tokenId}`}>
                            <Button> 자세히 </Button>
                        </Link>
                </div>
                )
            })}
        </div>
	);
}

export default LockCard;