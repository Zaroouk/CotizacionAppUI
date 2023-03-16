import { Image, ChakraProvider,extendTheme } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f5f5f5",
      100: "#ebebeb",
      // Add more colors here...
    },
    buttons:{
      100:"#007EA7",
      200:"#003459",
      300:"#00171F",
      400:"#00A7E1",
      500:"#FFFFFF"
    }
    // Add more color modes here...
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
