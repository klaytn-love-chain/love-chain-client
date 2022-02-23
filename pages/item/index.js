import React, { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '../../src/components/Layout'
import axios from 'axios';
import LockCard from '../../src/components/LockCard'
import FilterToggle from '../../src/components/FilterToggle'
import FilterResult from '../../src/components/FilterResult'
import styled from 'styled-components';
import {
  Button,
  HStack,
  Text,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';

export default function ItemListPage() {
  const [loading, setLoading] = useState(false)
  const [lockData, setLockData] = useState({
    list : [],
    total: 0
  })

  // 무한스크롤링 기능
  const [page, setPage] = useState(0)
  const [scrolling, setScrolling] = useState(false)

  // Filter Toggle
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const offsetNumber = 0 + (12 * page)
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
        offset: 0 + (12 * page)
    })

  // optionData에 따른 url 변경 적용
  const url = `https://hohyeon.site/api/item?${optionData.date ? 'date=true' : ''}${optionData.oneLine ? '&oneLine=true' : ''}${optionData.coupleImage ? '&coupleImage=true' : ''}${optionData.socialProfile ? '&socialProfile=true' : ''}${optionData.isAvailable ? '&isAvailable=true' : ''}${optionData.price.order == 'desc' ? '&price=desc' : '&price=asc'}&limit=12&offset=${offsetNumber}`;

  // 무한스크롤링 기능
  const getMoreItems = async() => {
      setScrolling(true)
      try {
        const { data } = await axios.get(url)
        setLockData(prevState => ({
          list: [...prevState.list, ...data.list],
          total: data.total
        }))
        console.log('url : ', url)
        console.log('lockData : ', lockData)
        setLoading(true)
      } catch(err) {
        console.log(err)
      }
      setScrolling(false)
  }

  // page변할때마다 함수 불러오기
  useEffect(() => {
    getMoreItems()
  }, [page, optionData])

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
                {lockData.total}개의 자물쇠가 검색되었습니다.
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
            scrolling={scrolling}
            optionData={optionData}
            lockList={lockData.list}
          />
        </Layout>
      )}

      {/* 필터 토글 */}
      <FilterToggle
        btnRef={btnRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setPage={setPage}
        optionData={optionData}
        setOptionData={setOptionData}
        lockData={lockData}
        setLockData={setLockData}
        getMoreItems={getMoreItems}
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
