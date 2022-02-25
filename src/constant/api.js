import axios from 'axios';
import { getKlipAccessUrl, isMobile } from './util';

const API_DOMAIN = 'https://hohyeon.site/api';
const A2P_API_PREPARE_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare';

export const getItem = async (tokenId) => {
  const { data } = await axios.get(`${API_DOMAIN}/item/${tokenId}`);
  return data;
};

export const getItems = async (params) => {
  const { data } = await axios.get(`${API_DOMAIN}/item`, {
    params: {
      isAvailable: true,
      price: 'desc',
      limit: 12,
      offset: 0,
      ...params,
    },
  });
  return data;
};

export const getItemUserInfo = async (tokenId) => {
  const { data } = await axios.get(`${API_DOMAIN}/item/${tokenId}/info`);
  return data;
};

export const postItemUserInfo = async ({ tokenId, contents, userAddress, requestKey }) => {
  const { data } = await axios.post(
    `${API_DOMAIN}/item/${tokenId}/info`,
    { ...contents },
    {
      params: {
        address: userAddress,
        request_key: requestKey,
      },
    }
  );
  return data;
};

// export const deleteItemUserInfo = async (tokenId) => {
//   const { data } = await axios.delete(`${API_DOMAIN}/item/${tokenId}`);
//   return data;
// };

export const deleteItemUserInfo = async ({tokenId, userAddress, requestKey }) => {
  const { data } = await axios.delete(
    `${API_DOMAIN}/item/${tokenId}`,
    {
          params: {
            address: userAddress,
            request_key: requestKey,
          },
        }
    );
  return data;
};

export const getUserItems = async (userAddress) => {
  const { data } = await axios.get(`${API_DOMAIN}/item/user/${userAddress}`);
  return data;
};

export const getUserRequestKey = async () => {
  const { data } = await axios.get(`${API_DOMAIN}/user/request_key`);
  return data;
};

export const postUser = async (address, request_key) => {
  const { data } = await axios.post(`${API_DOMAIN}/user`, {
    address,
    request_key,
  });
  return data;
};

export const buyNft = async (tokenId, price, setQrvalue, callback) => {
  const functionJson =
    '{ "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" } ], "name": "buyLoveChain", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }';
  executeContract(
    NSEOULTOWERMARCKET,
    functionJson,
    price.toString().padEnd(17, '0'),
    `[\"${tokenId}\"]`,
    setQrvalue,
    callback
  );
};

export const sellNft = async (fromAddress, tokenId, price, setQrvalue, callback) => {
  const functionJson =
    '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "_data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
  executeContract(
    LOVECHAIN_ADDRESS,
    functionJson,
    '0',
    `[\"${fromAddress}", \"${NSEOULTOWERMARCKET}", \"${tokenId}", \"${price}"]`,
    setQrvalue,
    callback
  );
};

export const writeCoupleName = async (tokenId, oneName, twoName, setQrvalue, callback) => {
  const functionJSON = `{"constant": false, "inputs": [{"name": "tokenId", "type": "uint256"},{"name": "name1","type": "string"},{"name": "name2","type": "string"}],"name": "writeCoupleName", "outputs": [],"payable": false,"stateMutability": "nonpayable", "type": "function"}`;

  executeContract(
    LOVECHAIN_ADDRESS,
    functionJSON,
    '0',
    `[\"${tokenId}", \"${oneName}", \"${twoName}"]`,
    setQrvalue,
    callback
  );
};

export const executeContract = (txTo, functionJSON, value, params, setQrvalue, callback) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: 'LOVE CHAIN',
      },
      type: 'execute_contract',
      transaction: {
        to: txTo,
        abi: functionJSON,
        value: value,
        params: params,
      },
    })
    .then((response) => {
      const { request_key } = response.data;
      if (isMobile()) {
        window.location.href = getKlipAccessUrl('android', request_key);
      } else {
        setQrvalue(getKlipAccessUrl('QR', request_key));
      }

      let timerId = setInterval(() => {
        axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`).then((res) => {
          if (res.data.result && res.data.result.status !== 'pending') {
            callback(res.data.result);
            clearInterval(timerId);
            setQrvalue('DEFAULT');
          }
        });
      }, 1000);
    });
};

export const uploadAsset = async (formData) => {
  try {
    const response = await axios.post('https://metadata-api.klaytnapi.com/v1/metadata/asset', formData, {
      headers: {
        Authorization:
          'Basic ' + Buffer.from(process.env.NEXT_PUBLIC_KAS_ACCESS_KEY_ID + ':' + process.env.NEXT_PUBLIC_KAS_SECRET_ACCESS_KEY).toString('base64'),
        'x-chain-id': '8217',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.uri;
  } catch (e) {
    console.error(e);
    return false;
  }
};
