import Head from 'next/head';
import Layout from '../src/components/Layout';
import Main from '../src/components/Main';

export default function Home() {
  return (
    <>
      <Head>
        <title>러브체인 | 사랑의 자물쇠</title>
        <meta name="description" content="러브체인 | 사랑의 자물쇠" />
      </Head>
      <Layout type="main">
        <Main />
      </Layout>
    </>
  )
}
