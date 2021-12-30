import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { SignIn } from './pages/Auth/SignIn';
import { SignUp } from './pages/Auth/SignUp';
import { Home } from './pages/Dashboard/Home';



type PrivateRouteProps = {
  children: JSX.Element;
  redirectTo: string;
};

const PrivateRoute = ({ children, redirectTo }: PrivateRouteProps) => {

  const isAuthenticated = localStorage.getItem("token") !== null;

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <SignIn/> } />
          <Route path="/signup" element={ <SignUp/> } />
          <Route path="/home" element={ <PrivateRoute children={<Home />} redirectTo='/'/> } />
        </Routes>
      </BrowserRouter>

    </ChakraProvider>
   
  );
}

export default App;
