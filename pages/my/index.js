import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../src/components/Layout';
import { getUserItems } from '../../src/constant/api';
import LockCard from '../../src/components/LockCard';
import {
  Button,
  HStack,
  Text,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';

export default function MyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [lockData, setlockData] = useState(null);
  const fetchLockData = async () => {
    try {
      setIsLoading(true);
      const data = await getUserItems();
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
              {"내가 보유한 자물쇠"}
            </Text>
            <hr style={{ margin: '1% 10%', border: '0.01em solid gray' }} />
            </HStack>
            {
              lockData &&  <LockCard list={lockData.list} />
            }
        </Layout>
      )}
    </>
  )
}
