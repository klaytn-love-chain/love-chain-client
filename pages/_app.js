import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { Global } from '@emotion/react'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/autoplay';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
})

const theme = extendTheme({
  fonts: {
    heading: 'LeferiBaseType-BoldA',
    body: 'LeferiBaseType-RegularA'
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
      <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </>
  )
}

export default MyApp
