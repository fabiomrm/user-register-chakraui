import { Flex, Stack, Image, Heading, Box, FormControl, 
    InputGroup, InputLeftElement, Input, Button } from '@chakra-ui/react';
import { AtSignIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import { RouterLink } from '../../../components/RouterLink';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export const SignUp = () => {

    const { register, handleSubmit } = useForm();    
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const userRegister = (payload: any) => {

        setErrorMessage('');
        if(payload.password) {
            if(payload.password !== payload.confirmPassword) {
                setErrorMessage("As senhas não correspondem.")
                console.log(errorMessage)
                return;
            }
        } else {
            setErrorMessage("Informe uma senha");
            console.log(errorMessage)
            return;
        }
        if(payload.name.trim().length === 0) {
            setErrorMessage("Informe o seu nome.")
            console.log(errorMessage)
            return;
        }

        if(payload.email.trim().length === 0) {
            setErrorMessage("Informe o seu email.")
            console.log(errorMessage)
            return;
        }

        delete payload.confirmPassword;


        fetch("http://localhost:3001/v1/signup", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(payload)
        }).then(async (response) => {
            const json = await response.json();

            if(response.ok) {
                navigate("/")
            } else {
                console.log(json.message);
                setErrorMessage(json.message);
            }

        })
    };  

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
            <Heading>Cadastrar-se</Heading>
            <Box
                minW={{base: "90%", md: "470px"}}
            >
                <form action="" onSubmit={handleSubmit(userRegister)}>
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
                                <Input type="text" placeholder="Nome completo" {...register("name")} />
                            </InputGroup>
                        </FormControl>

                        <FormControl>
                            <InputGroup>
                                <InputLeftElement 
                                    pointerEvents="none"
                                    children={<EmailIcon color="gray.300"/>}
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
                        </FormControl>

                        <FormControl>
                            <InputGroup>
                                <InputLeftElement 
                                    pointerEvents="none"
                                    children={<LockIcon color="gray.300"/>}
                                />
                                <Input type="password" placeholder="Confirmar senha" {...register("confirmPassword")}/>
                            </InputGroup>
                        </FormControl>

                        <Button type="submit" variant="solid" colorScheme="green">
                            Registrar
                        </Button>
                        <RouterLink to="/" variant="link" colorScheme="green">
                            Voltar
                        </RouterLink>
                        
                    </Stack>
                </form>
            </Box>
        </Stack>
    </Flex>
);
}