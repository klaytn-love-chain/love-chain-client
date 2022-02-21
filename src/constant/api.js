import axios from 'axios';

const API_DOMAIN = 'https://hohyeon.site/api';

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

export const postItemUserInfo = async ({ tokenId, params }) => {
  const { data } = await axios.post(`${API_DOMAIN}/item/${tokenId}/info`, {
    params,
  });
  return data;
};

export const deleteItemUserInfo = async (tokenId) => {
  const { data } = await axios.delete(`${API_DOMAIN}/item/${tokenId}`);
  return data;
};

export const getUserItems = async (userAddress) => {
  const { data } = await axios.get(`${API_DOMAIN}/item/${userAddress}/info`);
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
