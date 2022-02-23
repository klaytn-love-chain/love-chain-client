import React, { useState, useEffect, useCallback} from 'react';
import { useRouter } from 'next/router';
import LockEdit from '../../../src/components/LockEdit';
import Layout from '../../../src/components/Layout'
import {  getItem, getItemUserInfo, getUserItems } from '../../../src/constant/api';
import { useUserState } from '../../../src/contexts/useUserContext'

export default function ItemEditPage({ lock }) {
  const router = useRouter();
  const { tokenId } = router.query;
  const { userAddress } = useUserState();
  const [isOwner, setIsOwner] = useState(false);
  const [lockInfo, setLockInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const initPage = useCallback(async () => {
    if (tokenId && userAddress) {
      const { list } = await getUserItems(userAddress);
      const ownLock = list.find(item => item.tokenId === tokenId);
      setIsOwner(Boolean(ownLock));
    }
    if (tokenId) {
      const lockData = await getItem(tokenId);
      setLockInfo(lockData);
      const userData = await getItemUserInfo(tokenId);
      setUserInfo(userData);
    }
    },[userAddress, tokenId])

  useEffect(() => {
    initPage();
  }, [initPage])

  return (
    <>
      <Layout>
        {isOwner
          ? <LockEdit
              tokenId={tokenId}
              lockInfo={lockInfo}
              userInfo={userInfo}
            />
          : <div>유효하지 않은 접근입니다.</div>
        }
      </Layout>
    </>
  )
}

