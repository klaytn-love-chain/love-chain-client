import React, {useState, useEffect, useCallback} from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../src/components/Layout'
import { Spinner } from '@chakra-ui/react'
import { getItem } from '../../../src/constant/api';
import NftDetail from '../../../src/components/NftDetail';

export default function ItemPage() {
	const router = useRouter();
  const { tokenId } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [lockData, setlockData] = useState(null);

  const getLockData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getItem(tokenId);
      setlockData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [tokenId]);

  useEffect(() =>{
    getLockData();
  }, [getLockData])

  return (
    <Layout>
      {isLoading && <Spinner />}
      {!isLoading && lockData &&  <NftDetail data={lockData} />}
    </Layout>
  )
}
