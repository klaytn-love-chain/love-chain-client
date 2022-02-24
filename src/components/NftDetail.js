import React, {useState} from 'react';
// import Link from 'next/link';
import styles from './NftDetail.module.scss';
import { Image, Container, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import QRCode from 'qrcode.react';
import { buyNft } from '../constant/api';

const DEFAULT_QR_CODE = "DEFAULT";
function NftDetail({ data }) {

    const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

    const onClickBuyButton = (tokenId, price) => {
        buyNft(tokenId, price, setQrvalue, (result) => {
            alert(JSON.stringify(result));
        });
        
    };

    const available = (boolean) => {
        if (boolean) {
            return '가능'
        }
        return '불가'
    }
    const isMarcket = (boolean) => {
        if (boolean) {
            return (
                <>
                <Button onClick={() => onClickBuyButton(data.tokenId, data.price)} colorScheme='pink' variant='solid'>
                    구매하기
                </Button>
                {qrvalue !== "DEFAULT" ? (
                    <Container
                    style={{
                        backgroundColor: "white",
                        width: 300,
                        height: 300,
                        padding: 20,
                      }}
                    >
                      <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />
        
                      <br />
                      <br />
                    </Container>
                  ) : null}
                </>
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
                        <Th>옵션</Th>
                        <Th>기능</Th>
                        <Th>속성</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>#</Td>
                        <Td>번호</Td>
                        <Td>{data.tokenId}</Td>
                    </Tr>
                    <Tr>
                        <Td>$</Td>
                        <Td>가격</Td>
                        <Td>{data.price} Klay</Td>

                    </Tr>
                    <Tr>
                        <Td>왕관</Td>
                        <Td>커플 이미지</Td>
                        <Td>{available(data.feature.coupleImage)}</Td>

                    </Tr>
                    <Tr>
                        <Td>날개</Td>
                        <Td>날짜 입력</Td>
                        <Td>{available(data.feature.date)}</Td>

                    </Tr>
                    <Tr>
                        <Td>클로버</Td>
                        <Td>소셜 프로필</Td>
                        <Td>{available(data.feature.oneLine)}</Td>

                    </Tr>
                    <Tr>
                        <Td>무늬</Td>
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
