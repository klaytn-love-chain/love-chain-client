import React, { useState, useEffect, useCallback} from 'react';
import { useRouter } from 'next/router';
import LockEdit from '../../../src/components/LockEdit';
import Layout from '../../../src/components/Layout';
import { Spinner } from '@chakra-ui/react';
import { getUserItems } from '../../../src/constant/api';
import { useUserState } from '../../../src/contexts/useUserContext'

export default function ItemEditPage({ lock }) {
  const router = useRouter();
  const { tokenId } = router.query;
  const { userAddress } = useUserState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const initPage = useCallback(async () => {
    try {
      setIsLoading(true);
      if (tokenId && userAddress) {
        const { list } = await getUserItems(userAddress);
        const ownLock = list.find(item => item.tokenId === tokenId);
        setIsOwner(Boolean(ownLock));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

  },[userAddress, tokenId])

  useEffect(() => {
    initPage();
  }, [initPage])

  return (
    <>
      <Layout>
        {isLoading && <Spinner />}
        {!isLoading && isOwner
          ? <LockEdit tokenId={tokenId}/>
          : <div>유효하지 않은 접근입니다.</div>
        }
      </Layout>
    </>
  )
}

