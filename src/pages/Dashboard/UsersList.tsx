import {Box, Table, Thead, Tr, Td, Tbody, Avatar, Button} from '@chakra-ui/react';
import { User } from '../../types/User';

type UserListProps = {
    users: Array<User>;
    handleEdit: (user: User) => void;
}

export const UsersList = ({ users, handleEdit }: UserListProps) => {


    return(

        <Box
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
            borderRadius="md"
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
                    {users.map((user) => (
                        <Tr key={user.id}>
                            <Td><Avatar bg="green"/></Td>
                            <Td>{user.name}</Td>
                            <Td textAlign="end">
                                <Button type="button" variant="outline" colorScheme="green" onClick={() => handleEdit(user)}>
                                    Editar
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}