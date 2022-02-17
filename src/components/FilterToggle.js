import React from 'react';
import styles from './LockCard.module.scss';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

function FilterToggle({ btnRef, isOpen, onOpen, onClose }) {
	return (
        <>
            <Drawer
                size='lg'
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>정렬</DrawerHeader>

                <DrawerBody>
                    가격 내림차순
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                    상품 보기
                    </Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
	);
}

export default FilterToggle;