import { AppProps } from 'next/app';
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from 'react-toastify';
import { Provider as NextAuthProvider } from 'next-auth/client';

import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ChakraProvider>
        <ToastContainer theme="colored" icon={false} />
        <Component {...pageProps} />
      </ChakraProvider>
    </NextAuthProvider>
  );
}

export default MyApp;