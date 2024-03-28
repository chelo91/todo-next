import { ChakraProvider, Container } from '@chakra-ui/react'
import ListTodo from '../components/ListTodo.js';
import NavBar from '../components/NavBar.js';

export default function Home() {
  return (
    <ChakraProvider>
      <NavBar />
      <Container >
        <ListTodo />
      </Container>
    </ChakraProvider>
  )
}
