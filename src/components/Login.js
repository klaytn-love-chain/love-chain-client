import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Heading, Spinner } from '@chakra-ui/react';
import QRCode from 'qrcode.react';

import { getUserRequestKey, postUser } from '../constant/api';
import { useUserDispatch } from '../contexts/useUserContext';

const isMobile = () => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};

const getKlipAccressUrl = (method, request_key) => {
  switch (method) {
    case 'QR':
      return `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
    case 'iOS':
      return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
    case 'android':
      return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
    default:
      return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  }
};

const getAddress = async (setQrvalue, callback) => {
  const { request_key } = await getUserRequestKey();

  if (isMobile()) window.location.href = getKlipAccressUrl('iOS', request_key);
  else setQrvalue(() => getKlipAccressUrl('QR', request_key));

  let id = setInterval(async () => {
    const res = await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`);

    if (res.data.result) {
      callback(res.data.result.klaytn_address, request_key);
      clearInterval(id);
    }
  }, 1000);
};

function Login() {
  const userDispatch = useUserDispatch();
  const [qrvalue, setQrvalue] = useState('DEFAULT');

  useEffect(() => {

    getAddress(setQrvalue, async (address, request_key) => {
      const { ok, msg } = await postUser(address, request_key);

      if (ok) userDispatch({ type: 'LOGIN', userAddress: address, request_key });
      else alert(msg);
      Router.replace('/my');

    });
  }, [userDispatch]);

  return (
    <>
      <Heading size="md" marginTop={30}>
        아래의 QR코드를 스캔해주세요!
      </Heading>
      {!isMobile() &&
        (qrvalue === 'DEFAULT' ? (
          <Spinner thickness="4px" speed="0.65s" size="xl" margin={150} />
        ) : (
          <QRCode value={qrvalue} size={256} style={{ margin: 'auto', marginTop: 50 }} />
        ))}
    </>
  );
}
export default Login;
