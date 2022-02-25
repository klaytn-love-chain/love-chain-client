import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { Global } from '@emotion/react';
import { UserProvider } from '../src/contexts/useUserContext';
import Head from 'next/head';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/autoplay';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
});

const theme = extendTheme({
  fonts: {
    heading: 'LeferiBaseType-BoldA',
    body: 'LeferiBaseType-RegularA',
  },
  colors: {
    purple: {
      600: "#7c33e7",
      500: "#7c33e7",
    },
  },
  breakpoints,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={`
          @font-face {
            font-family: 'LeferiBaseType-BoldA';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/LeferiBaseType-BoldA.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: 'LeferiBaseType-RegularA';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/LeferiBaseType-RegularA.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
        `}
      />
      <Head>
        <title>러브체인 | 사랑의 자물쇠</title>
        <meta name="description" content="러브체인 | NFT 사랑의 자물쇠" />
        <meta property="og:title" content="Content Title" />
        <meta property="og:image" content="/images/graph.png" />
        <meta property="og:description" content="영원한 사랑의 약속" />
      </Head>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
