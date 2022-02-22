/* eslint-disable react/no-children-prop */
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Button,
  useDisclosure,
  Input, FormControl, FormLabel,
	InputGroup, InputRightAddon,
	Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import styles from './MyLockList.module.scss';

function MyLockList({ list }) {
	const [lockToSell, setLockToSell] = useState(null);
	const {
		isOpen: isSellModalOpen,
		onOpen: onSellModalOpen,
		onClose: onSellModalClose
	} = useDisclosure();
	const handleSellModal = useCallback((item) => {
		setLockToSell(item);
		onSellModalOpen();
	}, [onSellModalOpen]);
	const handleSellLockSubmit = () => { };

	return (
		<div className={styles.container}>
			<div className={styles.title}>내가 소유한 자물쇠</div>
			<ul className={styles.list}>
				{
					list && (<>
						{list.map(item => {
							return (
								<li key={item.tokenId} className={styles.item} width={[1, 1 / 2, 1 / 3]} margin={['0 0 30px', '0 0 30px', '0 20px 20px', '0 20px 20px']}>
									<Image
										width={200}
										height={200}
										src={item.lockImage}
										alt={`${item.tokenId} 자물쇠 이미지`}
										quality={100}
									/>
									<div className={styles.number}>No. {item.tokenId}</div>
									<div className={styles.price}>
										<span>구매한 가격</span>
										<span>{`${item.price.toLocaleString()} Klay`}</span>
									</div>
									<Link href={`/item/${item.tokenId}/edit`}>
										<a>
											<Button
												isFullWidth
												colorScheme="purple"
											>
												내용 수정하기
											</Button>
										</a>
									</Link>
									<Link href={`/site/${item.tokenId}`}>
										<a>
											<Button
												mt="2"
												isFullWidth
												colorScheme="purple"
											>
												미니사이트로 이동하기
											</Button>
										</a>
									</Link>
									<Button
										mt="2"
										isFullWidth
										colorScheme="purple"
										onClick={() => handleSellModal(item)}
									>
										판매하기
									</Button>
								</li>
							)
						})}
					</>)
				}
			</ul>

			{/* 판매하기 모달 */}
			<Modal
				isOpen={isSellModalOpen}
				onClose={onSellModalClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>마켓에 자물쇠 판매</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div className={styles.sell}>
							<Image
								width={300}
								height={300}
								src={lockToSell?.lockImage}
								alt={`${lockToSell?.tokenId} 자물쇠 이미지`}
								quality={100}
							/>
							<div className={styles.number}>No. {lockToSell?.tokenId}</div>
							<div className={styles.price}>
								<span>구매한 가격</span>
								<span>{`${lockToSell?.price.toLocaleString()} Klay`}</span>
							</div>
						</div>
						<FormControl mt="5">
							<FormLabel htmlFor='wishPrice'>희망 판매가격</FormLabel>
							<InputGroup>
								<Input
									id='wishPrice'
									type='text'
									placeholder='마켓에 판매하고자 하는 가격을 적어주세요.'
								/>
								<InputRightAddon children='Klay' />
							</InputGroup>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							isFullWidth
							colorScheme="purple"
							onClick={handleSellLockSubmit}>
							판매하기
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	)
}

export default MyLockList;