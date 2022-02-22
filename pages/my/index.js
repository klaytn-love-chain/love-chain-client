import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import { getUserItems } from '../../src/constant/api';
import { useUserState } from '../../src/contexts/useUserContext';
import { Spinner } from '@chakra-ui/react';
import MyLockList from '../../src/components/MyLockList';

const MOCK_DATA = {
  "total": 1,
  "list": [
    {
      "_id": "62133fdc364f9e7c57582025",
      "tokenId": "2",
      "lockImage": "https://metadata-store.klaytnapi.com/5650fadf-b79e-adc4-0055-6c40c76bac9e/e8c582ca-4e98-d6b2-0709-2e84f33d5ce5.png",
      "price": "2"
    },
    {
      "_id": "62133fdc364f9e7c57582025",
      "tokenId": "3",
      "lockImage": "https://metadata-store.klaytnapi.com/5650fadf-b79e-adc4-0055-6c40c76bac9e/e8c582ca-4e98-d6b2-0709-2e84f33d5ce5.png",
      "price": "2"
    },
    {
      "_id": "62133fdc364f9e7c57582025",
      "tokenId": "4",
      "lockImage": "https://metadata-store.klaytnapi.com/5650fadf-b79e-adc4-0055-6c40c76bac9e/e8c582ca-4e98-d6b2-0709-2e84f33d5ce5.png",
      "price": "2"
    },
    {
      "_id": "62133fdc364f9e7c57582025",
      "tokenId": "5",
      "lockImage": "https://metadata-store.klaytnapi.com/5650fadf-b79e-adc4-0055-6c40c76bac9e/e8c582ca-4e98-d6b2-0709-2e84f33d5ce5.png",
      "price": "2"
    },
  ]
}

export default function MyPage() {
  const router = useRouter();
  const { userAddress } = useUserState();
  const [isLoading, setIsLoading] = useState(false);
  const [myLocksData, setMyLocksData] = useState([]);
  const initPage = useCallback(() => {
    if (!userAddress) {
      router.push('/login');
    }
  }, [router, userAddress]);

  const fetchMyLocksData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getUserItems(userAddress);
      setMyLocksData(data.list);
      // setMyLocksData(MOCK_DATA.list);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [userAddress]);

  useEffect(() => {
    initPage();
  }, [initPage])

  useEffect(() =>{
    fetchMyLocksData();
  }, [fetchMyLocksData])

  return (
    <Layout>
      {isLoading && <Spinner />}
      {!isLoading && <MyLockList list={myLocksData} />}
    </Layout>
  )
}
