import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../src/components/Layout'
import axios from 'axios';
import LockCard from '../../src/components/LockCard'
import FilterToggle from '../../src/components/FilterToggle'
import FilterResult from '../../src/components/FilterResult'
import styled from 'styled-components';
import { 
  Button, 
  ButtonGroup,
  HStack, 
  Text, 
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'

export default function ItemListPage() {
  const [lockData, setLockData] = useState(null)
  const [lockTotal, setLockTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  // 무한스크롤링 페이지
  const [page, setPage] = useState(1)
  
  // Filter Toggle
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const [optionData, setOptionData] = useState({
        price: {
          order : 'desc',
          asc : false,
          desc : false
        },
        coupleImage: false,
        date: false,
        oneLine: false,
        socialProfile: false,
        isAvailable: false,
    })
    
  // optionData에 따른 url 변경 적용 
  const url = `https://hohyeon.site/api/item?${optionData.date ? 'date=true' : ''}${optionData.oneLine ? '&oneLine=true' : ''}${optionData.coupleImage ? '&coupleImage=true' : ''}${optionData.socialProfile ? '&socialProfile=true' : ''}${optionData.isAvailable ? '&isAvailable=true' : ''}${optionData.price.order == 'desc' ? '&price=desc' : '&price=asc'}&limit=${10 * page}&offset=0`;

  const fetchLockDataOf = async () => {
    try {
      console.log('page', page)
      console.log('url', url)
      const { data } = await axios.get(url)
      console.log(data)
      setLockData(data)
      setLockTotal(data.total)
      setLoading(true)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchLockDataOf()
  },[optionData])

  return (
    <>
      {!loading ? (
        <Layout>
          <Spinner />
        </Layout>
      ) : (
        <Layout>
          <OptionPanel>
            <HStack spacing='3%' style={{ display: 'inline', margin: '0' }}>
              <Text size='lg' style={{ display: 'inline' }}>
                {lockTotal}개의 자물쇠가 검색되었습니다.
              </Text>
              <Button 
                colorScheme='purple' 
                size='sm' 
                style={{ display: 'inline' }}
                ref={btnRef}
                onClick={onOpen}
              >
                필터
              </Button>
              <hr style={{ margin: '1% 10%', border: '0.01em solid gray' }} />
            </HStack>

            {/* 옵션필터 배열 */}
            <FilterResult option={optionData} />
          </OptionPanel>

          {/* 카드 배열 */}
          <LockCard 
            page={page}
            setPage={setPage}
            option={optionData} 
            lockList={lockData.list} 
            fetchLockDataOf={fetchLockDataOf}
          />
        </Layout>
      )}

      {/* 필터 토글 */}
      <FilterToggle 
        btnRef={btnRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        optionData={optionData}
        setOptionData={setOptionData}
        lockTotal={lockTotal}
        setLockTotal={setLockTotal}
      />
      
    </>
  )
}

const OptionPanel = styled.div`
  position: fixed;
  background-color: white;
  padding: 1rem 0;
  top: 90px;
  z-index: 100;
  box-shadow: 0px 8px 20px rgb(124,51,231,0.25);
`
