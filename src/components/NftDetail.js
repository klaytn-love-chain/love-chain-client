import React, { useState } from 'react';
import styles from './NftDetail.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { buyNft } from '../constant/api';

const DEFAULT_QR_CODE = 'DEFAULT';
function NftDetail({ data }) {
  const toast = useToast();

  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

  const onClickBuyButton = (tokenId, price) => {
    buyNft(tokenId, price, setQrvalue, async (result) => {
      if (result.status === 'success') {
        await toast({
          title: '자물쇠 구매가 완료되었습니다',
          description: `tx_hash: ${result.tx_hash} `,
          status: 'success',
          duration: 3000,
          isClosable: true,
          containerStyle: {
            minWidth: 'max-content',
          },
        });
      } else {
        await toast({
          title: '자물쇠 구매에 실패하였습니다. 다시 시도해주세요.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  const available = (boolean) => (boolean ? '가능' : '불가');
  const isMarket = (boolean) => {
    if (boolean) {
      return (
        <>
          <Button onClick={() => onClickBuyButton(data.tokenId, data.price)} isFullWidth colorScheme="purple" variant="solid">
            구매하기
          </Button>
          {qrvalue !== 'DEFAULT' ? (
            <Container
              style={{
                backgroundColor: 'white',
                width: 300,
                height: 300,
                padding: 20,
              }}
						>
							<Heading size="md" marginTop={30}>
								아래의 QR코드를 스캔하시면 구매페이지로 이동합니다.
							</Heading>
              <QRCode value={qrvalue} size={256} style={{ margin: 'auto' }} />
            </Container>
          ) : null}
        </>
      );
    } else {
      return (
        <Button isFullWidth colorScheme="gray" variant="outline" disabled>
          소유자가 있습니다.
        </Button>
      );
    }
  };
  return (
    <div className={styles.container}>
      <div key={data.tokenId} className={styles.item}>
        <Image src={data.lockImage} alt={`No.${data.tokenId}`} width={300} height={300} quality={100} />
        <span className={styles.number}> No. {data.tokenId} </span>
        <span className={styles.price}> {data.price} Klay </span>
      </div>
      <div className={styles.table}>
        <Table variant="striped" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              <Th>옵션</Th>
              <Th>기능</Th>
              <Th>속성</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>날개</Td>
              <Td>만난날짜</Td>
              <Td>{available(data.feature.date)}</Td>
            </Tr>
            <Tr>
              <Td>왕관</Td>
              <Td>커플사진</Td>
              <Td>{available(data.feature.coupleImage)}</Td>
            </Tr>
            <Tr>
              <Td>패턴</Td>
              <Td>한줄문장</Td>
              <Td>{available(data.feature.socialProfile)}</Td>
            </Tr>
            <Tr>
              <Td>클로버</Td>
              <Td>소셜프로필</Td>
              <Td>{available(data.feature.oneLine)}</Td>
            </Tr>
          </Tbody>
        </Table>
				<br />
				<Link href={`/site/${data.tokenId}`}>
					<a>
						<Button isFullWidth colorScheme="pink" variant="solid" mb="2">
							미니사이트로 이동
						</Button>
					</a>
				</Link>
        {isMarket(data.isAvailable)}
      </div>
    </div>
  );
}
export default NftDetail;
