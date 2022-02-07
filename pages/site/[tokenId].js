import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout'
import { Heading } from '@chakra-ui/react'

export default function SitePage() {
	const router = useRouter();
  const { tokenId } = router.query;
  return (
    <>
      <Layout>
				<Heading>{tokenId} 마이크로사이트 페이지</Heading>
      </Layout>
    </>
  )
}
