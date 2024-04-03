import { ChakraProvider, Container } from '@chakra-ui/react'
import ListTodo from '../components/ListTodo.js';
import NavBar from '../components/NavBar.js';
import ToastNotification from '@/components/ToastNotification.js';
import { CookiesProvider } from 'next-client-cookies/server';

export default function Home() {
  return (
    <CookiesProvider>
      <ChakraProvider>
        <ToastNotification />
        <NavBar />
        <Container >
          <ListTodo />
        </Container>
      </ChakraProvider>
    </CookiesProvider>
  )
}
