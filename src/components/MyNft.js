import React from "react";
import styles from "./MyNft.module.scss";
import { Image, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Divider,
} from "@chakra-ui/react";

function MyNft({ lockData }) {
const available = (boolean) => {
    if (boolean) {
      return "가능";
    }
    return "불가";
  };
  return (
    <div className={styles.cardContainer}>
      {lockData &&
        lockData.map((item) => {
          return (
              <div key={item._id} className={styles.card}>
              <Image className={styles.cardImage} src={item.lockImage} alt="lock image" />
              <br />
              <Table size="sm">
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
                    <Td>{item.tokenId}</Td>
                  </Tr>
                  <Tr>
                    <Td>$</Td>
                    <Td>가격</Td>
                    <Td>{item.price} Klay</Td>
                  </Tr>
                  <Tr>
                    <Td>왕관</Td>
                    <Td>커플 이미지</Td>
                    <Td>{available(item.feature.coupleImage)}</Td>
                  </Tr>
                  <Tr>
                    <Td>날개</Td>
                    <Td>날짜 입력</Td>
                    <Td>{available(item.feature.date)}</Td>
                  </Tr>
                  <Tr>
                    <Td>클로버</Td>
                    <Td>소셜 프로필</Td>
                    <Td>{available(item.feature.oneLine)}</Td>
                  </Tr>
                  <Tr>
                    <Td>무늬</Td>
                    <Td>한줄 입력</Td>
                    <Td>{available(item.feature.socialProfile)}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <br />
              <div className={styles.cardContent}>
                <Button colorScheme="pink" variant="solid">
                  내용 수정하기
                </Button>
              </div>
              <Divider />
              <div className={styles.cardContent}>
                <Text>구매한 가격 : xxx Klay</Text>
                <Text>희망 금액 입력</Text>
              </div>
              <Input placeholder="희망 금액을 입력하세요" />
              <div className={styles.cardContent}>
                <br />
                <Button colorScheme="pink" variant="solid">
                  마켓에 등록하기
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default MyNft;
