import axios from 'axios';

const API_DOMAIN = 'https://hohyeon.site/api';
const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";

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
	const { data } = await axios.post(`${API_DOMAIN}/item/${tokenId}/info`,
		{ data: contents },
		{ params: {
			address: userAddress,
			request_key: requestKey,
		}});
  return data;
};

export const deleteItemUserInfo = async (tokenId) => {
  const { data } = await axios.delete(`${API_DOMAIN}/item/${tokenId}`);
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

export const buyNft = async (
  tokenId,
  setQrvalue,
  callback
) => {
  const functionJson = '{ "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" } ], "name": "buyLoveChain", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }';
  executeContract(
      "0xb4A3355156e3184EAA4d21aD613C2CA407A593dB",
      functionJson,
      "10000000000000000",
      `[\"${tokenId}\","\0xb4A3355156e3184EAA4d21aD613C2CA407A593dB"]`,
      setQrvalue,
      callback
  );
};

export const executeContract = (
  txTo,
  functionJSON,
  value,
  params,
  setQrvalue,
  callback
) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: "NSeoulTowerMarket",
      },
      type: "execute_contract",
      transaction: {
        to: txTo,
        abi: functionJSON,
        value: value,
        params: params,
      },
    })
    .then((response) => {
      const { request_key } = response.data;
      if (isMobile) {
        window.location.href = getKlipAccessUrl("android", request_key);
      } else {
        setQrvalue(getKlipAccessUrl("QR", request_key));
      }

      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          )
          .then((res) => {
            if (res.data.result) {
              console.log(`[Result] ${JSON.stringify(res.data.result)}`);
              callback(res.data.result);
              clearInterval(timerId);
              setQrvalue("DEFAULT");
            }
          });
      }, 1000);
    });
};