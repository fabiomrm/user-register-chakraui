import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { SignIn } from './pages/Auth/SignIn';
import { SignUp } from './pages/Auth/SignUp';
import { Home } from './pages/Dashboard/Home';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <SignIn/> } />
          <Route path="/signup" element={ <SignUp/> } />
          <Route path="/home" element={ <Home/> } />
        </Routes>
      </BrowserRouter>

    </ChakraProvider>
   
  );
}

export default App;
