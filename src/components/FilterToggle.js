import React, { useState, useEffect, useCallback } from 'react';
import styles from './FilterToggle.module.scss';
import styled from 'styled-components';
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

function FilterToggle({ 
    btnRef, 
    isOpen, 
    onOpen, 
    onClose, 
    setPage, 
    optionData, 
    setOptionData, 
    lockData, 
    setLockData, 
    getMoreItems 
}) {

    const handleOptionClick = (e) => {
        const { name, value } = e.target
        const reverseValue = (value == 'false')
        
        // 버튼 클릭했을 경우 true/false 사러 반대로 바꾸기
        setOptionData({
            ...optionData,
            [name]: reverseValue
        })

        // 내림차순 버튼을 클릭했을 경우 오름차순 버튼 비활성화
        if (name == 'desc') {
            setOptionData({
                ...optionData,
                price: {
                    order: 'desc',
                    asc: false,
                    desc: reverseValue
                }
            })
        }

        // 오름차순 버튼을 클릭했을 경우 내림차순 버튼 비활성화
        if (name == 'asc') {
            setOptionData({
                ...optionData,
                price: {
                    order: 'asc',
                    asc: reverseValue,
                    desc: false
                }
            })
        }

        // 초기화 버튼
        if (name == 'reset' && value == 'reset') {
            setOptionData({
                ...optionData,
                price: {
                    order: 'desc',
                    asc: false,
                    desc: false,
                },
                isAvailable: false,
                date: false,
                oneLine: false,
                coupleImage: false,
                socialProfile: false,
            })
            setLockData({
                list : [],
                total: 0
            })
            setPage(0)
        }
    }

    const showOptionList = () => {
        setLockData({
            list : [],
            total: lockData.total
        })
        setPage(0)
        getMoreItems()
    }
    
	return (
        <>
            <Drawer
                size='sm'
                placement='right'
                isOpen={isOpen}
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton style={{ background: '#7c33e7', color: 'white' }}/>

                    <DrawerHeader>정렬</DrawerHeader>
                    <div className={styles.option1}>
                        <ButtonGroup variant='outline' spacing='6'>
                            <ButtonStyle 
                                name='desc'
                                value={optionData.price.desc}
                                onClick={handleOptionClick}
                            >
                                가격 내림차순
                            </ButtonStyle>
                            <ButtonStyle 
                                name='asc'
                                value={optionData.price.asc} 
                                onClick={handleOptionClick}
                            >
                                가격 오름차순
                            </ButtonStyle>
                        </ButtonGroup>
                    </div>
                    <hr />
                    <DrawerHeader>구매가능</DrawerHeader>
                    <div className={styles.option1}>
                        <ButtonGroup variant='outline' spacing='6'>
                            <ButtonStyle 
                                name='isAvailable'
                                value={optionData.isAvailable}
                                onClick={handleOptionClick}
                            >
                                구매가능만 보기
                            </ButtonStyle>
                        </ButtonGroup>
                    </div>
                    <hr />
                    <DrawerHeader>옵션 선택</DrawerHeader>
                    <div className={styles.option2}>
                        <ButtonGroup 
                            variant='outline' 
                            spacing='6' 
                            className={styles.option3}
                            style={{ display: 'grid' }}
                        >
                            <ButtonStyle 
                                name='date'
                                value={optionData.date}
                                onClick={handleOptionClick}
                                style={{ marginLeft: '1.5rem' }}
                            >
                                만난날짜 등록가능
                            </ButtonStyle>
                            <ButtonStyle 
                                name='oneLine'
                                value={optionData.oneLine}
                                onClick={handleOptionClick}
                            >
                                한줄문장 등록가능
                            </ButtonStyle>
                            <ButtonStyle 
                                name='coupleImage'
                                value={optionData.coupleImage}
                                onClick={handleOptionClick}
                            >
                                커플사진 등록가능
                            </ButtonStyle>
                            <ButtonStyle 
                                name='socialProfile'
                                value={optionData.socialProfile}
                                onClick={handleOptionClick}
                            >
                                소셜프로필 등록가능
                            </ButtonStyle>
                        </ButtonGroup>
                    </div>

                    <DrawerFooter>
                        <Button 
                            mr={5} 
                            name='reset'
                            value='reset'
                            variant='outline' 
                            colorScheme='purple' 
                            onClick={handleOptionClick}
                        >
                            초기화
                        </Button>
                        <Button 
                            mr={3} 
                            variant='outline' 
                            colorScheme='purple' 
                            onClick={onClose}
                        >
                            <div onClick={showOptionList}>
                                {lockData.total}개 상품 보기
                            </div>
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
	);
}

export default FilterToggle;

const ButtonStyle = styled.button`
    border: 1px solid #7c33e7;
    border-radius: 1rem;
    padding: 0.4rem 0.8rem 0.2rem 0.8rem;
    color: #7c33e7;
    transition: 0.2s;

    background-color: ${props => props.value ? '#7c33e7' : 'white'};
    color: ${props => props.value ? 'white' : '#7c33e7'};
    
    &:hover {
        background-color: ${props => props.value ? null : 'rgb(0,0,0,0.10)'}; 
    }
`