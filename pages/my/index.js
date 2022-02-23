import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import { getUserItems } from '../../src/constant/api';
import MyNft from '../../src/components/MyNft';
import {
  Button,
  HStack,
  Text,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useUserState } from '../../src/contexts/useUserContext'



export default function MyPage() {
  const router = useRouter();
  const { tokenId } = router.query;
  const { userAddress } = useUserState();
  const [isLoading, setIsLoading] = useState(false);
  const [lockData, setLockData] = useState(null);

  const getMyLocks = async () => {
    try {
      setIsLoading(true);
      const data = await getUserItems(userAddress);
      setLockData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }  

  useEffect(() => {
    getMyLocks();
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
              lockData &&  <MyNft list={lockData.list} />
            }
        </Layout>
      )}
    </>
  )
}
