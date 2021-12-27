import {Box, Table, Thead, Tr, Td, Tbody, Avatar, Button} from '@chakra-ui/react';

export const UsersList = () => {
    return(

        <Box
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
            borderRdius="md"
            p="1rem"
        >
            <Table>
                <Thead>
                    <Tr>
                        <Td>Avatar</Td>
                        <Td width="90%">Nome</Td>
                        <Td textAlign="end">Ações</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td><Avatar bg="green"/></Td>
                        <Td>Fulano de tal</Td>
                        <Td textAlign="end">
                            <Button type="button" variant="outline" colorScheme="green">
                                Editar
                            </Button>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    );
}