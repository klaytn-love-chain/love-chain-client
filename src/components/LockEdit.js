import React, { useState, useCallback } from 'react';
import styles from './LockEdit.module.scss';
import {
	Box,
	Tabs, TabList, TabPanels, Tab, TabPanel,
	Alert, AlertIcon, AlertTitle, AlertDescription,
	Input, InputLeftAddon, InputGroup,
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
} from '@chakra-ui/react';

function LockEdit() {
	const [person1Name, setPeson1Name] = useState('');
	const [person2Name, setPeson2Name] = useState('');

	const [person1ProfileImage, setPeson1ProfileImage] = useState('');
	const [person2ProfileImage, setPeson2ProfileImage] = useState('');
	const [date, setDate] = useState('');
	const [coupleImage, setCoupleImage] = useState('');
	const [oneLine, setOneLine] = useState('');

	const [person1Instagram, setPerson1Instagram] = useState('');
	const [person1Twitter, setPerson1Twitter] = useState('');
	const [person1URL, setPerson1URL] = useState('');
	const [person2Instagram, setPerson2Instagram] = useState('');
	const [person2Twitter, setPerson2Twitter] = useState('');
	const [person2URL, setPerson2URL] = useState('');

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

	const {
		isOpen: isNameModalOpen,
		onOpen: onNameModalOpen,
		onClose: onNameModalClose
	} = useDisclosure();
	const handleNameSubmit = () => { }
	const handleDetailSubmit = () => { }

	return (
		<div className={styles.container}>
			<Tabs size='lg' variant='enclosed' isFitted  colorScheme="purple">
				<TabList>
					<Tab>커플이름 수정</Tab>
					<Tab>미니사이트 수정</Tab>
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
							</FormControl>
						<Button
							isFullWidth
							onClick={handleDetailSubmit}
							colorScheme="purple"
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
