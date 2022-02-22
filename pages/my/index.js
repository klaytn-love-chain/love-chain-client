
// import React, { useState, useEffect, useRef } from 'react';
// import Layout from '../../src/components/Layout';
// import { getUserItems } from '../../src/constant/api';
// import LockCard from '../../src/components/LockCard';
// import {
//   Button,
//   HStack,
//   Text,
//   Spinner,
//   useDisclosure,
// } from '@chakra-ui/react';

import React from 'react';
import Link from 'next/link';
import Layout from '../../src/components/Layout'
import { Heading, Button } from '@chakra-ui/react'


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
{/* <<<<<<< HEAD
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
======= */}
      <Layout>
        <Heading>마이페이지</Heading>
        <Link href="/item/1/edit">
          <a>
            <Button>수정하기</Button>
          </a>
        </Link>
      </Layout>

    </>
  )
}
