import Head from 'next/head'
import Layout from '../src/components/Layout'
import { Heading, Button } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>러브체인 | 사랑의 자물쇠</title>
        <meta name="description" content="러브체인 | 사랑의 자물쇠" />
      </Head>
      <Layout>
        <Heading>메인페이지</Heading>
        <Button size='lg' colorScheme='purple'>
          구매하기
        </Button>
      </Layout>
    </>
  )
}
