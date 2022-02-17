import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../src/components/Layout'
import axios from 'axios';
import LockCard from '../../src/components/LockCard'
import FilterToggle from '../../src/components/FilterToggle'
import { 
  Button, 
  HStack, 
  Text, 
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'

export default function ItemListPage() {

  const url = 'http://13.125.214.179:3000/api/item?isAvailable=true&price=desc&limit=10&offset=0'
  const [isLoading, setIsLoading] = useState(false)
  const [lockData, setlockData] = useState(null)

  // @chakra-ui/react
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const fetchLockData = async () => {
    try {
      const { data } = await axios.get(url)
      console.log(data)
      setlockData(data)
      setIsLoading(true)

    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() =>{
    fetchLockData()
  }, [])

  return (
    <>
      {!isLoading ? (
        <Layout>
          <Spinner />
        </Layout>
      ) : (
        <Layout>
          <HStack 
            spacing='5%' 
            style={{ display: 'inline' }}
          >
            <Text 
              size='lg' 
              style={{ display: 'inline' }}
            >
              {lockData.list.length}개의 자물쇠가 검색되었습니다.
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
          <LockCard list={lockData.list} />
        </Layout>
      )}

      {/* 필터 토글 */}
      <FilterToggle 
        btnRef={btnRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      
    </>
  )
}


