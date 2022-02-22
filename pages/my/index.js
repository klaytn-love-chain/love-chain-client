import React from 'react';
import Link from 'next/link';
import Layout from '../../src/components/Layout'
import { Heading, Button } from '@chakra-ui/react'

export default function MyPage() {
  return (
    <>
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


