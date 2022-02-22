import React, { useState, useEffect, useCallback} from 'react';
import { useRouter } from 'next/router';
import LockEdit from '../../../src/components/LockEdit';
import Layout from '../../../src/components/Layout'
import { getItem, getUserItems } from '../../../src/constant/api';
import { useUserState } from '../../../src/contexts/useUserContext'

export default function ItemEditPage({ lock }) {
  const router = useRouter();
  const { tokenId } = router.query;
  const { userAddress } = useUserState();
  const [isOwner, setIsOwner] = useState(false);
  const [lockData, setLockData] = useState(null);

  const initPage = useCallback(async () => {
    if (tokenId && address) {
      const { list } = await getUserItems(userAddress);
      const ownLock = list.find(item => item.tokenId === tokenId);
      setIsOwner(Boolean(ownLock));
      setLockData(ownLock);
    }
    },[userAddress, tokenId])

  useEffect(() => {
    initPage();
  }, [initPage])

  return (
    <>
      <Layout>
        {isOwner
          ? <LockEdit lockData={lockData} />
          : <div>유효하지 않은 접근입니다.</div>
        }
      </Layout>
    </>
  )
}

