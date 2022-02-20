import React from 'react';
import { useRouter } from 'next/router';
import LockEdit from '../../../src/components/LockEdit';
import Layout from '../../../src/components/Layout'

export default function ItemEditPage() {
  const router = useRouter();
  const { tokenId } = router.query;
  return (
    <>
      <Layout>
        <LockEdit/>
      </Layout>
    </>
  )
}
