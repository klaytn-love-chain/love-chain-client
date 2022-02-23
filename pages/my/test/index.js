import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../src/components/Layout'
import MyNft from '../../../src/components/MyNft';
import { getItem, getUserItems } from '../../../src/constant/api';
import { useUserState } from '../../../src/contexts/useUserContext'

export default function MyItemPage() {

  const router = useRouter();
  const { tokenId } = router.query;
  const { userAddress } = useUserState();
  const [isOwner, setIsOwner] = useState(false);
  const [lockData, setLockData] = useState(null);

  const initPage = useCallback(async () => {
    if (userAddress) {
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
          ? <MyNft lockData={lockData} />
          : <div>유효하지 않은 접근입니다.</div>
        }
      </Layout>
      
    </>
  )
}
