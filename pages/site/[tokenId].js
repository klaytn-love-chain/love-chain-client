import React from 'react';
import Layout from '../../src/components/Layout'
import MicroSite from '../../src/components/MicroSite';

export default function SitePage() {
  return (
    <>
      <Layout type="microsite">
				<MicroSite />
      </Layout>
    </>
  )
}
