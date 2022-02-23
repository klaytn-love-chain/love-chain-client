import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import MyLockList from '../../src/components/MyLockList';
import { getUserItems } from '../../src/constant/api';
import { Spinner } from '@chakra-ui/react';
import { useUserState } from '../../src/contexts/useUserContext';

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
