/* eslint-disable react/no-children-prop */
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUserState } from '../../src/contexts/useUserContext'
import { getItem, getItemUserInfo, postItemUserInfo } from '../constant/api'
import styles from './LockEdit.module.scss';
import {
	Box,Stack,
	Tabs, TabList, TabPanels, Tab, TabPanel,
	Alert, AlertIcon, AlertTitle, AlertDescription,
	Input, InputLeftAddon, InputGroup,
	RadioGroup, Radio,
	Button,
	FormControl, FormLabel,
	useDisclosure,
	Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
	ModalCloseButton,
	useToast,
} from '@chakra-ui/react';

function LockEdit({ tokenId }) {
	const router = useRouter();
	const toast = useToast();
	const { userAddress, requestKey } = useUserState();
	const [lockInfo, setLockInfo] = useState(null);
	const [person1Name, setPeson1Name] = useState('');
	const [person2Name, setPeson2Name] = useState('');

	const [person1ProfileImage, setPeson1ProfileImage] = useState('');
	const [person2ProfileImage, setPeson2ProfileImage] = useState('');
	const [date, setDate] = useState('');
	const [oneLine, setOneLine] = useState('');
	const [coupleImage, setCoupleImage] = useState('');

	const [person1Instagram, setPerson1Instagram] = useState('');
	const [person1Twitter, setPerson1Twitter] = useState('');
	const [person1URL, setPerson1URL] = useState('');
	const [person2Instagram, setPerson2Instagram] = useState('');
	const [person2Twitter, setPerson2Twitter] = useState('');
	const [person2URL, setPerson2URL] = useState('');

	const [isPrivate, setIsPrivate] = useState(null);

	const handlePerson1NameChange = useCallback((e) => setPeson1Name(e.target.value), []);
	const handlePerson2NameChange = useCallback((e) => setPeson2Name(e.target.value), []);

	const handlePerson1ProfileImageChange = useCallback((e) => setPeson1ProfileImage(e.target.value), []);
	const handlePerson2ProfileImageChange = useCallback((e) => setPeson2ProfileImage(e.target.value), []);
	const handleDateChange = useCallback((e) => setDate(e.target.value), []);
	const handleCoupleImageChange = useCallback((e) => setCoupleImage(e.target.value), []);
	const handleOneLineChange = useCallback((e) => setOneLine(e.target.value), []);

	const handlePerson1InstagramChange = useCallback((e) => setPerson1Instagram(e.target.value), []);
	const handlePerson2InstagramChange = useCallback((e) => setPerson2Instagram(e.target.value), []);
	const handlePerson1TwitterChange = useCallback((e) => setPerson1Twitter(e.target.value), []);
	const handlePerson2TwitterChange = useCallback((e) => setPerson2Twitter(e.target.value), []);
	const handlePerson1URLChange = useCallback((e) => setPerson1URL(e.target.value), []);
	const handlePerson2URLChange = useCallback((e) => setPerson2URL(e.target.value), []);

	const handleIsPrivateChange = useCallback((e) => { console.log(e), setIsPrivate(e) }, []);

	const {
		isOpen: isNameModalOpen,
		onOpen: onNameModalOpen,
		onClose: onNameModalClose
	} = useDisclosure();
	const initInfo = useCallback(async () => {

		if (tokenId) {
			const lockData = await getItem(tokenId);
			setLockInfo(lockData);
			console.log(lockData);

			const userInfo = await getItemUserInfo(tokenId);
			console.log(userInfo);
			setPeson1ProfileImage(userInfo.profileImage.oneImage);
			setPeson2ProfileImage(userInfo.profileImage.twoImage);

			setDate(userInfo.options.date);
			setOneLine(userInfo.options.oneLine);
			setCoupleImage(userInfo.options.coupleImage);

			setPerson1Instagram(userInfo.options.socialProfile.oneInstagram);
			setPerson2Instagram(userInfo.options.socialProfile.twoInstagram);
			setPerson1Twitter(userInfo.options.socialProfile.oneTwitter);
			setPerson2Twitter(userInfo.options.socialProfile.twoTwitter);
			setPerson1URL(userInfo.options.socialProfile.oneURL);
			setPerson2URL(userInfo.options.socialProfile.twoURL);

			setIsPrivate(userInfo.isPrivate.toString());
    }

	}, [tokenId]);
	const handleNameSubmit = () => { }
	const handleDetailSubmit = async () => {
		const contents = {
			tokenId,
			profileImage: {
				oneImage,
				twoImage,
			},
			options: {
				date,
				oneLine,
				coupleImage,
				socialProfile: {
					oneInstagram,
					twoInstagram,
					oneTwitter,
					twoTwitter,
					oneURL,
					twoURL,
				}
			},
			isPrivate: isPrivate === 'true',
		}
		const { success, message } = await postItemUserInfo({
			tokenId,
			contents,
			userAddress,
			requestKey
		});

		if (success) {
			await toast({
				title: '미니사이트 정보가 수정되었습니다.',
				status: 'success',
				duration: 1000,
				isClosable: true,
			});
			router.push('/my');
		}

		if (message === 'Unauthorized') {
			await toast({
				title: '권한이 없거나 인증이 만료되었습니다.',
				description: '다시 로그인 해주세요.',
				status: 'error',
				duration: 1000,
				isClosable: true,
			});
			router.push('/login');
		}
	}

	useEffect(() => {
		initInfo();
	}, [initInfo]);

	return (
		<div className={styles.container}>
			<div>
			{
				lockInfo && (
					<Image
						width={200}
						height={200}
						src={lockInfo.lockImage}
						alt={`${lockInfo.tokenId} 자물쇠 이미지`}
						quality={100}
					/>
				)
			}
			</div>

			<Tabs size='lg' variant='enclosed' isFitted  colorScheme="purple">
				<TabList>
					<Tab>커플이름 수정</Tab>
					<Tab>미니사이트 정보 수정</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Box className={styles.info}>
							<Alert
								status='warning'
								variant='subtle'
								flexDirection='column'
								alignItems='center'
								justifyContent='center'
								textAlign='center'
								height='200px'
								marginBottom='30px'
							>
								<AlertIcon boxSize='40px' mr={0} />
								<AlertTitle mt={4} mb={1} fontSize='lg'>
									커플이름 수정에는 수수료가 발생합니다.
								</AlertTitle>
								<AlertDescription maxWidth='sm'>
									커플이름 수정은 Klaytn 블록체인에 반영되기 때문에 수정할 때마다 수수료가 발생합니다.
								</AlertDescription>
							</Alert>

							<FormControl mt="5">
								<div className={styles.group}>
									<div className={styles.title}>이름</div>
									<div className={styles.support}>두 분의 이름을 모두 입력해야 수정이 가능합니다.</div>
									<div className={styles.subTitle}>Person1</div>
									<InputGroup mb="2">
										<FormLabel hidden htmlFor='person1Name'>Person1Name</FormLabel>
										<Input
											id='person1Name'
											type='text'
											value={person1Name}
											onChange={handlePerson1NameChange}
											placeholder='이름을 입력해주세요.'
										/>
									</InputGroup>
									<div className={styles.subTitle}>Person2</div>
									<InputGroup mb="5">
										<FormLabel hidden htmlFor='person2Name'>Person2</FormLabel>
										<Input
											id='person2Name'
											type='text'
											value={person2Name}
											onChange={handlePerson2NameChange}
											placeholder='이름을 입력해주세요.'
										/>
									</InputGroup>
									</div>
								</FormControl>
							<Button
								isFullWidth
								onClick={onNameModalOpen}
								colorScheme="purple"
								disabled={!person1Name.length || !person2Name.length}
							>
								수정하기
							</Button>
						</Box>
					</TabPanel>


					<TabPanel>
						<FormControl>
							<div className={styles.group}>
								<div className={styles.title}>프로필 사진</div>
								<div className={styles.subTitle}>Person1</div>
								<InputGroup mb="2">
									<FormLabel hidden htmlFor='person1ProfileImage'>Person1</FormLabel>
									<Input
										id='person1ProfileImage'
										type='text'
										value={person1ProfileImage}
										onChange={handlePerson1ProfileImageChange}
										placeholder='사진 URL을 입력해주세요.'
									/>
								</InputGroup>
								<div className={styles.subTitle}>Person2</div>
								<InputGroup mb="5">
									<FormLabel hidden htmlFor='person2ProfileImage'>Person2</FormLabel>
									<Input
										id='person2ProfileImage'
										type='text'
										value={person2ProfileImage}
										onChange={handlePerson2ProfileImageChange}
										placeholder='사진 URL을 입력해주세요.'
									/>
								</InputGroup>
							</div>

							{lockInfo?.feature.date && (
								<div className={styles.group}>
									<div className={styles.title}>만난 날짜</div>
									<InputGroup mb="5">
										<FormLabel hidden htmlFor='date'>만난 날짜</FormLabel>
										<Input
											id='date'
											type='date'
											value={date}
											onChange={handleDateChange}
										/>
									</InputGroup>
								</div>
							)}

							{lockInfo?.feature.coupleImage && (
								<div className={styles.group}>
									<div className={styles.title}>커플 사진</div>
									<InputGroup mb="5">
										<FormLabel hidden htmlFor='coupleImage'>커플 사진</FormLabel>
										<Input
											id='coupleImage'
											type='string'
											value={coupleImage}
											placeholder='사진 URL을 입력해주세요.'
											onChange={handleCoupleImageChange}
											/>
									</InputGroup>
								</div>
							)}

							{lockInfo?.feature.oneLine && (
								<div className={styles.group}>
									<div className={styles.title}>한 줄 문장</div>
									<InputGroup mb="5">
										<FormLabel hidden htmlFor='oneLine'>한 줄 문장</FormLabel>
										<Input
											id='oneLine'
											type='string'
											value={oneLine}
											placeholder='커플을 소개할 수 있는 한 줄 문장을 입력해주세요.'
											onChange={handleOneLineChange}
										/>
									</InputGroup>
								</div>
							)}

							{lockInfo?.feature.socialProfile && (
								<div className={styles.group}>
									<div className={styles.title}>소셜 프로필</div>
									<div className={styles.subTitle}>Person1</div>
									<InputGroup mb="2">
										<FormLabel hidden htmlFor='person1Instagram'>person1Instagram</FormLabel>
										<InputLeftAddon children='인스타그램' w="120px" />
										<Input
											id='person1Instagram'
											type='text'
											value={person1Instagram}
											onChange={handlePerson1InstagramChange}
											placeholder='@없이 아이디만 입력해주세요.'
										/>
									</InputGroup>
									<InputGroup mb="2">
										<FormLabel hidden htmlFor='person1Twitter'>person1twitter</FormLabel>
										<InputLeftAddon children='트위터' w="120px"/>
										<Input
											id='person1Twitter'
											type='text'
											value={person1Twitter}
											onChange={handlePerson1TwitterChange}
											placeholder='@없이 아이디만 입력해주세요.'
										/>
									</InputGroup>
									<InputGroup mb="5">
										<FormLabel hidden htmlFor='person1URL'>person1URL</FormLabel>
										<InputLeftAddon children='URL' w="120px"/>
										<Input
											id='person1URL'
											type='text'
											value={person1URL}
											onChange={handlePerson1URLChange}
											placeholder=''
										/>
									</InputGroup>

									<div className={styles.subTitle}>Person2</div>
									<InputGroup mb="2">
										<FormLabel hidden htmlFor='person2Instagram'>person2Instagram</FormLabel>
										<InputLeftAddon children='인스타그램' w="120px" />
										<Input
											id='person2Instagram'
											type='text'
											value={person2Instagram}
											onChange={handlePerson2InstagramChange}
											placeholder='@없이 아이디만 입력해주세요.'
										/>
									</InputGroup>
									<InputGroup mb="2">
										<FormLabel hidden htmlFor='person2Twitter'>person2twitter</FormLabel>
										<InputLeftAddon children='트위터' w="120px"/>
										<Input
											id='person2Twitter'
											type='text'
											value={person2Twitter}
											onChange={handlePerson2TwitterChange}
											placeholder='@없이 아이디만 입력해주세요.'
										/>
									</InputGroup>
									<InputGroup mb="5">
										<FormLabel hidden htmlFor='person2URL'>person2URL</FormLabel>
										<InputLeftAddon children='URL' w="120px"/>
										<Input
											id='person2URL'
											type='text'
											value={person2URL}
											onChange={handlePerson2URLChange}
											placeholder=''
										/>
									</InputGroup>
								</div>
							)}

							<div className={styles.group}>
								<div className={styles.title}>미니사이트 공개여부</div>
								<InputGroup mb="5">
									<FormLabel hidden htmlFor='isPrivate'>공개여부</FormLabel>
									<RadioGroup value={isPrivate} onChange={handleIsPrivateChange} colorScheme="purple">
										<Stack>
											<Radio value="false">공개</Radio>
											<Radio value="true">비공개</Radio>
										</Stack>
									</RadioGroup>
								</InputGroup>
							</div>

						</FormControl>
						<Button
							isFullWidth
							colorScheme="purple"
							onClick={handleDetailSubmit}
						>
							수정하기
						</Button>
					</TabPanel>
				</TabPanels>
			</Tabs>


			{/* 커플이름 수정 모달 */}
			<Modal
				isOpen={isNameModalOpen}
				onClose={onNameModalClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>커플이름 수정</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div className={styles.content}>
							<div className={styles.names}>
								<span className={styles.name}>{person1Name}</span>
								<span className={styles.name}>{person2Name}</span>
							</div>
							두 분의 이름으로 자물쇠에 기록하면 될까요?
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							isFullWidth
							colorScheme="purple"
							onClick={handleNameSubmit}>
							네, 기록해주세요.
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	)
}

export default LockEdit
