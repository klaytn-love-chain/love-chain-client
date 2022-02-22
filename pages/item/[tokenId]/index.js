import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../src/components/Layout'
import { Heading, Image, Box, Button, Text, Spinner } from '@chakra-ui/react'
import { getItem } from '../../../src/constant/api';
import NftDetail from '../../../src/components/NftDetail';

export default function ItemPage() {
	const router = useRouter();
  const { tokenId } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [lockData, setlockData] = useState(null);


  const getLockData = async () => {
    try {
      setIsLoading(true);
      const data = await getItem(tokenId);
      setlockData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() =>{
    getLockData();
  }, [])

  return (
    <>
    {isLoading ? (
        <Layout>
          <Spinner />
        </Layout>
      ) : (
      <Layout>
				<Heading>No. {tokenId} 자물쇠 상세페이지</Heading>
        {
          lockData &&  <NftDetail data={lockData} />
        }
      </Layout>
      )}
    </>
  )
}
