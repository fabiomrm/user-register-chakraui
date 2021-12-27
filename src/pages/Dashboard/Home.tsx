import { Flex, Container, Stack, Button } from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { UsersList } from './UsersList';
import { Searchbar } from '../../components/Searchbar';

export const Home = () => {


    return (
        <Flex
            flexDirection="column"
            width="100vw"
            height="100vh"
            backgroundColor="gray.200"
        >
        <Header />
        <Container maxW="container.lg">
            <Stack
                mt={4}
            >
                {/* SEARCH BAR */}
                <Searchbar />

                {/* ADD BUTTON */}
                <Flex justifyContent="flex-end">
                    <Button 
                        type="button" 
                        variant="solid" 
                        colorScheme="green"
                    >
                        Adicionar
                    </Button>
                </Flex>

                {/* USERS LIST */}
                <UsersList />
                
            </Stack>
        </Container>
        
        </Flex>
    );
};