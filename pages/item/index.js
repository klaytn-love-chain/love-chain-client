import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../src/components/Layout';
import { getItems } from '../../src/constant/api';
import LockCard from '../../src/components/LockCard';
import FilterToggle from '../../src/components/FilterToggle';
import {
  Button,
  HStack,
  Text,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';

export default function ItemListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [lockData, setlockData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const fetchLockData = async () => {
    try {
      setIsLoading(true);
      const data = await getItems();
      setlockData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() =>{
    fetchLockData();
  }, [])

  return (
    <>
      {isLoading ? (
        <Layout>
          <Spinner />
        </Layout>
      ) : (
        <Layout>
          <HStack
            spacing='5%'
            style={{ display: 'inline' }}
          >
            <Text
              size='lg'
              style={{ display: 'inline' }}
            >
              {lockData && `${lockData.total}개의 자물쇠가 검색되었습니다.`}
            </Text>
            <Button
              colorScheme='purple'
              size='sm'
              style={{ display: 'inline' }}
              ref={btnRef}
              onClick={onOpen}
            >
              필터
            </Button>
            <hr style={{ margin: '1% 10%', border: '0.01em solid gray' }} />
            </HStack>
            {
              lockData &&  <LockCard list={lockData.list} />
            }
        </Layout>
      )}

      {/* 필터 토글 */}
      <FilterToggle
        btnRef={btnRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />

    </>
  )
}


