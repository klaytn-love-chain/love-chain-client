import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Heading, Spinner } from '@chakra-ui/react';
import QRCode from 'qrcode.react';

import { getUserRequestKey, postUser } from '../constant/api';
import { useUserDispatch } from '../contexts/useUserContext';
import { getKlipAccessUrl, isMobile } from '../constant/util';

const getAddress = async (setQrvalue, callback) => {
  const { request_key } = await getUserRequestKey();

  if (isMobile()) window.location.href = getKlipAccessUrl('iOS', request_key);
  else setQrvalue(() => getKlipAccessUrl('QR', request_key));

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
      {!isMobile() &&
        (qrvalue === 'DEFAULT' ? (
          <Spinner thickness="4px" speed="0.65s" size="xl" margin={150} />
      ) : (
          <>
            <Heading size="md" mt={30} textAlign={'center'} lineHeight={1.5}>
              아래의 QR코드를 스캔하시면<br/> Klip 로그인으로 이동합니다.
            </Heading>
            <QRCode value={qrvalue} size={256} style={{ margin: 'auto', marginTop: 50 }} />
          </>
        ))}
    </>
  );
}
export default Login;
