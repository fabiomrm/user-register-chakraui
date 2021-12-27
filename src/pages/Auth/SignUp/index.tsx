import { Flex, Stack, Image, Heading, Box, FormControl, 
    InputGroup, InputLeftElement, Input, Button } from '@chakra-ui/react';

import { AtSignIcon, LockIcon } from '@chakra-ui/icons';


export const SignUp = () => {
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
                <form action="">
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
                                <Input type="email" placeholder="Endereço de email"/>
                            </InputGroup>
                        </FormControl>

                        <FormControl>
                            <InputGroup>
                                <InputLeftElement 
                                    pointerEvents="none"
                                    children={<LockIcon color="gray.300"/>}
                                />
                                <Input type="password" placeholder="Senha"/>
                            </InputGroup>
                        </FormControl>

                        <FormControl>
                            <InputGroup>
                                <InputLeftElement 
                                    pointerEvents="none"
                                    children={<LockIcon color="gray.300"/>}
                                />
                                <Input type="password" placeholder="Confirmar senha"/>
                            </InputGroup>
                        </FormControl>

                        <Button type="submit" variant="solid" colorScheme="green">
                            Login
                        </Button>
                        <Button type="button" variant="link" colorScheme="green">
                            Voltar
                        </Button> 
                    </Stack>
                </form>
            </Box>
        </Stack>
    </Flex>
);
}