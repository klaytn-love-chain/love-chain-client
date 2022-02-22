import React from 'react';
import Link from 'next/link';
import styles from './NftDetail.module.scss';
import { Image, Text, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

function NftDetail({ data }) {
    const available = (boolean) => {
        if (boolean) {
            return '가능'
        }
        return '불가'
    }
    const isMarcket = (boolean) => {
        if (boolean) {
            return (
                <Button colorScheme='pink' variant='solid'>
                    구매하기
                </Button>
            );
        } else {
            return '소유자가 있습니다.';
        } 
        
    }
	return (
        <div className={styles.cardContainer}>
            <div key={data.tokenId} className={styles.card}>
                        <Image src={data.lockImage} />
                        <br/>                
            </div>
            <div key={data.tokenId} className={styles.card}>
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>번호</Th>
                        <Th>{data.tokenId}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                                
                    <Tr>
                        <Td>가격</Td>
                        <Td>{data.price} Klay</Td>
                                 
                    </Tr>
                    <Tr>
                        <Td>커플 이미지</Td>
                        <Td>{available(data.feature.coupleImage)}</Td>
                                  
                    </Tr>
                    <Tr>
                        <Td>날짜 입력</Td>
                        <Td>{available(data.feature.date)}</Td>
                                  
                    </Tr>
                    <Tr>
                        <Td>소셜 프로필</Td>
                        <Td>{available(data.feature.oneLine)}</Td>
                                 
                    </Tr>
                    <Tr>
                        <Td>한줄 입력</Td>
                        <Td>{available(data.feature.socialProfile)}</Td>
                                 
                    </Tr>
                </Tbody>
            </Table>
            <br/>
                {isMarcket(data.isAvailable)}
            </div>
        </div>
	);
    
}
export default NftDetail;