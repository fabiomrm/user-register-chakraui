import { Flex, Stack, Image, Heading, Box, FormControl, 
        InputGroup, InputLeftElement, Input, FormHelperText, 
        Link, Button } from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';

import { RouterLink } from '../../../components/RouterLink';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const login = () => {
        navigate("/home");
    }

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.300"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mb="2"
            >
                <Image src="/images/logo.png" alt="logo" boxSize="80px" objectFit="contain"/>
                <Heading>Cadastro de Clientes</Heading>
                <Box
                    minW={{base: "90%", md: "470px"}}
                >
                    <form action="" onSubmit={handleSubmit(login)}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                            borderRadius="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement 
                                        pointerEvents="none"
                                        children={<AtSignIcon color="gray.300"/>}
                                    />
                                    <Input type="email" placeholder="Endereço de email" {...register("email")}/>
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement 
                                        pointerEvents="none"
                                        children={<LockIcon color="gray.300"/>}
                                    />
                                    <Input type="password" placeholder="Senha" {...register("password")}/>
                                </InputGroup>
                                <FormHelperText textAlign="right">
                                        <Link>Esqueceu a senha?</Link>
                                </FormHelperText>
                            </FormControl>
                            <Button type="submit" variant="solid" colorScheme="green">
                                Login
                            </Button>
                            
                        </Stack>
                    </form>

                </Box>
            </Stack>
            <Box>
                Ainda não possui cadastro? 
                <RouterLink to="/signup" color="green">Cadastre-se</RouterLink>
            </Box>
        </Flex>
    );
}