import React from 'react';
import Layout from '../../src/components/Layout'
import MiniSite from '../../src/components/MiniSite';

export default function SitePage() {
  return (
    <>
      <Layout type="minisite">
				<MiniSite />
      </Layout>
    </>
  )
}
