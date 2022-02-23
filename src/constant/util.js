export const isMobile = () => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};

export const getKlipAccessUrl = (method, request_key) => {
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
