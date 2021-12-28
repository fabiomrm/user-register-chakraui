import { Flex, Container, Image, Text, Stack, Button } from '@chakra-ui/react';


type Props = {
    onLogout: () => void;
};

export const Header = ({ onLogout }: Props) => {
    return (
        <Flex
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
        >
            <Container maxW="container.lg">
                <Stack flexDirection="row" alignItems="center"  mt={2} mb={2}>
                    <Image src="/images/logo.png" alt="logo" boxSize="40px" objectFit="contain"/>
                    <Text fontSize="xl" fontWeight="500">
                        Cadastro de Clientes
                    </Text>
                    <Stack style={{marginLeft: "auto"}}>
                        <Button variant="link" onClick={() => onLogout()}>Sair</Button>
                    </Stack>
                </Stack> 
            </Container>
        </Flex>
    );
};