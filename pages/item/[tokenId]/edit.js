import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../src/components/Layout'
import { Heading } from '@chakra-ui/react'

export default function ItemEditPage() {
  const router = useRouter();
  const { tokenId } = router.query;
  return (
    <>
      <Layout>
        <Heading>{tokenId} 자물쇠 수정페이지</Heading>
      </Layout>
    </>
  )
}
