/* eslint-disable react/no-children-prop */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUserState } from '../../src/contexts/useUserContext';
import { getItem, getItemUserInfo, postItemUserInfo, uploadAsset, writeCoupleName } from '../constant/api';
import styles from './LockEdit.module.scss';
import {
  Box,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  InputLeftAddon,
  InputGroup,
  RadioGroup,
  Radio,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Heading,
} from '@chakra-ui/react';
import QRCode from 'qrcode.react';

function LockEdit({ tokenId }) {
  const router = useRouter();
  const toast = useToast();
  const { userAddress, requestKey } = useUserState();
  const [lockInfo, setLockInfo] = useState(null);
  const [person1Name, setPeson1Name] = useState('');
  const [person2Name, setPeson2Name] = useState('');
  const [qrvalue, setQrvalue] = useState('DEFAULT');

  const [date, setDate] = useState('');
  const [oneLine, setOneLine] = useState('');

  const [person1Instagram, setPerson1Instagram] = useState('');
  const [person1Twitter, setPerson1Twitter] = useState('');
  const [person1URL, setPerson1URL] = useState('');
  const [person2Instagram, setPerson2Instagram] = useState('');
  const [person2Twitter, setPerson2Twitter] = useState('');
  const [person2URL, setPerson2URL] = useState('');

  const [isPrivate, setIsPrivate] = useState(null);

  const coupleImageRef = useRef();
  const person1ProfileRef = useRef();
  const person2ProfileRef = useRef();

  const handlePerson1NameChange = useCallback((e) => setPeson1Name(e.target.value), []);
  const handlePerson2NameChange = useCallback((e) => setPeson2Name(e.target.value), []);

  const handleDateChange = useCallback((e) => setDate(e.target.value), []);
  const handleOneLineChange = useCallback((e) => setOneLine(e.target.value), []);

  const handlePerson1InstagramChange = useCallback((e) => setPerson1Instagram(e.target.value), []);
  const handlePerson2InstagramChange = useCallback((e) => setPerson2Instagram(e.target.value), []);
  const handlePerson1TwitterChange = useCallback((e) => setPerson1Twitter(e.target.value), []);
  const handlePerson2TwitterChange = useCallback((e) => setPerson2Twitter(e.target.value), []);
  const handlePerson1URLChange = useCallback((e) => setPerson1URL(e.target.value), []);
  const handlePerson2URLChange = useCallback((e) => setPerson2URL(e.target.value), []);

  const handleIsPrivateChange = useCallback((e) => {
    setIsPrivate(e);
  }, []);

  const { isOpen: isNameModalOpen, onOpen: onNameModalOpen, onClose: onNameModalClose } = useDisclosure();
  const initInfo = useCallback(async () => {
    if (tokenId) {
      const lockData = await getItem(tokenId);
      setLockInfo(lockData);

      const userInfo = await getItemUserInfo(tokenId);

      setDate(userInfo.options.date);
      setOneLine(userInfo.options.oneLine);

      setPerson1Instagram(userInfo.options.socialProfile.oneInstagram);
      setPerson2Instagram(userInfo.options.socialProfile.twoInstagram);
      setPerson1Twitter(userInfo.options.socialProfile.oneTwitter);
      setPerson2Twitter(userInfo.options.socialProfile.twoTwitter);
      setPerson1URL(userInfo.options.socialProfile.oneURL);
      setPerson2URL(userInfo.options.socialProfile.twoURL);

      setIsPrivate(userInfo.isPrivate.toString());
    }
  }, [tokenId]);
  const handleNameSubmit = (oneName, twoName) => {
    writeCoupleName(tokenId, oneName, twoName, setQrvalue, async (result) => {
      if (result.status === 'success') {
        await toast({
          title: '???????????? ????????? ?????????????????????',
          description: `tx_hash: ${result.tx_hash} `,
          status: 'success',
          duration: null,
          isClosable: true,
          containerStyle: {
            minWidth: 'max-content',
          },
				});
				router.push('/my');
      } else {
        await toast({
          title: '???????????? ????????? ?????????????????????. ?????? ??????????????????.',
          status: 'error',
          duration: 3000,
          isClosable: true,
				});
				router.push('/my');
      }

      onNameModalClose();
    });
  };
  const handleDetailSubmit = async () => {
    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    formData1.append('file', person1ProfileRef.current.files[0]);
    formData2.append('file', person2ProfileRef.current.files[0]);
    formData3.append('file', coupleImageRef.current.files[0]);

    const [coupleImage, oneImage, twoImage] = await await Promise.all([uploadAsset(formData3), uploadAsset(formData1), uploadAsset(formData2)]);

    const contents = {
      tokenId,
      profileImage: {
        onePerson: oneImage || null,
        twoPerson: twoImage || null,
      },
      options: {
        date,
        oneLine,
        coupleImage: coupleImage || null,
        socialProfile: {
          oneInstagram: person1Instagram,
          twoInstagram: person2Instagram,
          oneTwitter: person1Twitter,
          twoTwitter: person2Twitter,
          oneURL: person1URL,
          twoURL: person2URL,
        },
      },
      isPrivate: isPrivate === 'true',
    };
    const { success, message } = await postItemUserInfo({
      tokenId,
      contents,
      userAddress,
      requestKey,
    });

    if (success) {
      await toast({
        title: '??????????????? ????????? ?????????????????????.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      router.push('/my');
    }

    if (message === 'Unauthorized') {
      await toast({
        title: '????????? ????????? ????????? ?????????????????????.',
        description: '?????? ????????? ????????????.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      router.push('/login');
    }
  };

  useEffect(() => {
    initInfo();
  }, [initInfo]);

  return (
    <div className={styles.container}>
      <div>{lockInfo && <Image width={200} height={200} src={lockInfo.lockImage} alt={`${lockInfo.tokenId} ????????? ?????????`} quality={100} />}</div>

      <Tabs size="lg" variant="enclosed" isFitted colorScheme="purple">
        <TabList>
          <Tab>???????????? ??????</Tab>
          <Tab>??????????????? ?????? ??????</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box className={styles.info}>
              <Alert
                status="warning"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                marginBottom="30px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  ???????????? ???????????? ???????????? ???????????????.
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  ???????????? ????????? Klaytn ??????????????? ???????????? ????????? ????????? ????????? ???????????? ???????????????.
                </AlertDescription>
              </Alert>

              <FormControl mt="5">
                <div className={styles.group}>
                  <div className={styles.title}>??????</div>
                  <div className={styles.support}>??? ?????? ????????? ?????? ???????????? ????????? ???????????????.</div>
                  <div className={styles.subTitle}>Person1</div>
                  <InputGroup mb="2">
                    <FormLabel hidden htmlFor="person1Name">
                      Person1Name
                    </FormLabel>
                    <Input id="person1Name" type="text" value={person1Name} onChange={handlePerson1NameChange} placeholder="????????? ??????????????????." />
                  </InputGroup>
                  <div className={styles.subTitle}>Person2</div>
                  <InputGroup mb="5">
                    <FormLabel hidden htmlFor="person2Name">
                      Person2
                    </FormLabel>
                    <Input id="person2Name" type="text" value={person2Name} onChange={handlePerson2NameChange} placeholder="????????? ??????????????????." />
                  </InputGroup>
                </div>
              </FormControl>
              <Button isFullWidth onClick={onNameModalOpen} colorScheme="purple" disabled={!person1Name.length || !person2Name.length}>
                ????????????
              </Button>
            </Box>
          </TabPanel>

          <TabPanel>
            <FormControl>
              <div className={styles.group}>
                <div className={styles.title}>????????? ??????</div>
                <div className={styles.subTitle}>Person1</div>
                <InputGroup mb="2">
                  <input ref={person1ProfileRef} id="person1ProfileImage" type="file" />
                </InputGroup>
                <div className={styles.subTitle}>Person2</div>
                <InputGroup mb="5">
                  <input ref={person2ProfileRef} id="person2ProfileImage" type="file" />
                </InputGroup>
              </div>

              {lockInfo?.feature.date && (
                <div className={styles.group}>
                  <div className={styles.title}>?????? ??????</div>
                  <InputGroup mb="5">
                    <FormLabel hidden htmlFor="date">
                      ?????? ??????
                    </FormLabel>
                    <Input id="date" type="date" value={date} onChange={handleDateChange} />
                  </InputGroup>
                </div>
              )}

              {lockInfo?.feature.coupleImage && (
                <div className={styles.group}>
                  <div className={styles.title}>?????? ??????</div>
                  <InputGroup mb="5">
                    <input ref={coupleImageRef} id="coupleImage" type="file" />
                  </InputGroup>{' '}
                </div>
              )}

              {lockInfo?.feature.oneLine && (
                <div className={styles.group}>
                  <div className={styles.title}>??? ??? ??????</div>
                  <InputGroup mb="5">
                    <FormLabel hidden htmlFor="oneLine">
                      ??? ??? ??????
                    </FormLabel>
                    <Input
                      id="oneLine"
                      type="string"
                      value={oneLine}
                      placeholder="????????? ????????? ??? ?????? ??? ??? ????????? ??????????????????."
                      onChange={handleOneLineChange}
                    />
                  </InputGroup>
                </div>
              )}

              {lockInfo?.feature.socialProfile && (
                <div className={styles.group}>
                  <div className={styles.title}>?????? ?????????</div>
                  <div className={styles.subTitle}>Person1</div>
                  <InputGroup mb="2">
                    <FormLabel hidden htmlFor="person1Instagram">
                      person1Instagram
                    </FormLabel>
                    <InputLeftAddon children="???????????????" w="120px" />
                    <Input
                      id="person1Instagram"
                      type="text"
                      value={person1Instagram}
                      onChange={handlePerson1InstagramChange}
                      placeholder="@?????? ???????????? ??????????????????."
                    />
                  </InputGroup>
                  <InputGroup mb="2">
                    <FormLabel hidden htmlFor="person1Twitter">
                      person1twitter
                    </FormLabel>
                    <InputLeftAddon children="?????????" w="120px" />
                    <Input
                      id="person1Twitter"
                      type="text"
                      value={person1Twitter}
                      onChange={handlePerson1TwitterChange}
                      placeholder="@?????? ???????????? ??????????????????."
                    />
                  </InputGroup>
                  <InputGroup mb="5">
                    <FormLabel hidden htmlFor="person1URL">
                      person1URL
                    </FormLabel>
                    <InputLeftAddon children="URL" w="120px" />
                    <Input id="person1URL" type="text" value={person1URL} onChange={handlePerson1URLChange} placeholder="" />
                  </InputGroup>

                  <div className={styles.subTitle}>Person2</div>
                  <InputGroup mb="2">
                    <FormLabel hidden htmlFor="person2Instagram">
                      person2Instagram
                    </FormLabel>
                    <InputLeftAddon children="???????????????" w="120px" />
                    <Input
                      id="person2Instagram"
                      type="text"
                      value={person2Instagram}
                      onChange={handlePerson2InstagramChange}
                      placeholder="@?????? ???????????? ??????????????????."
                    />
                  </InputGroup>
                  <InputGroup mb="2">
                    <FormLabel hidden htmlFor="person2Twitter">
                      person2twitter
                    </FormLabel>
                    <InputLeftAddon children="?????????" w="120px" />
                    <Input
                      id="person2Twitter"
                      type="text"
                      value={person2Twitter}
                      onChange={handlePerson2TwitterChange}
                      placeholder="@?????? ???????????? ??????????????????."
                    />
                  </InputGroup>
                  <InputGroup mb="5">
                    <FormLabel hidden htmlFor="person2URL">
                      person2URL
                    </FormLabel>
                    <InputLeftAddon children="URL" w="120px" />
                    <Input id="person2URL" type="text" value={person2URL} onChange={handlePerson2URLChange} placeholder="" />
                  </InputGroup>
                </div>
              )}

              <div className={styles.group}>
                <div className={styles.title}>??????????????? ????????????</div>
                <InputGroup mb="5">
                  <FormLabel hidden htmlFor="isPrivate">
                    ????????????
                  </FormLabel>
                  <RadioGroup value={isPrivate} onChange={handleIsPrivateChange} colorScheme="purple">
                    <Stack>
                      <Radio value="false">??????</Radio>
                      <Radio value="true">?????????</Radio>
                    </Stack>
                  </RadioGroup>
                </InputGroup>
              </div>
            </FormControl>
            <Button isFullWidth colorScheme="purple" onClick={handleDetailSubmit}>
              ????????????
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* ???????????? ?????? ?????? */}
      <Modal
        isOpen={isNameModalOpen}
        onClose={() => {
          onNameModalClose();
          setQrvalue('DEFAULT');
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <>
            <ModalHeader>???????????? ??????</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {qrvalue === 'DEFAULT' ? (
                <div className={styles.content}>
                  <div className={styles.names}>
                    <span className={styles.name}>{person1Name}</span>
                    <span className={styles.name}>{person2Name}</span>
                  </div>
                  ??? ?????? ???????????? ???????????? ???????????? ??????????
                </div>
              ) : (
                <>
                  <Heading size="md" mb={10} textAlign={'center'} lineHeight={1.5}>
                    ????????? QR????????? ??????????????????!
                  </Heading>
                  <QRCode value={qrvalue} size={256} style={{ margin: 'auto' }} />
                </>
              )}
            </ModalBody>
            <ModalFooter>
              {qrvalue === 'DEFAULT' ? (
                <Button isFullWidth colorScheme="purple" onClick={() => handleNameSubmit(person1Name, person2Name)}>
                  ???, ??????????????????.
                </Button>
              ) : (
                <></>
              )}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default LockEdit;
