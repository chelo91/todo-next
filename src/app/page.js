import { ChakraProvider, Container } from '@chakra-ui/react'
import ListTodo from '../components/ListTodo.js';
import NavBar from '../components/NavBar.js';
import ToastNotification from '@/components/ToastNotification.js';

export default function Home() {
  return (
    <ChakraProvider>
      <ToastNotification />
      <NavBar />
      <Container >
        <ListTodo />
      </Container>
    </ChakraProvider>
  )
}
