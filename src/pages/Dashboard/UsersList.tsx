import {Box, Table, Thead, Tr, Td, Tbody, Avatar, Image, Button} from '@chakra-ui/react';

import { Customer } from '../../types/Customer';

type CustomerListProps = {
    customers?: Array<Customer>;
    handleEdit: (customer: Customer) => void;
}

export const UsersList = ({ customers, handleEdit }: CustomerListProps) => {


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
                    {customers && customers.map((customer) => (
                        <Tr key={customer.id}>
                            <Td>
                                {
                                    customer.pictureUrl ? <Image src={customer.pictureUrl}/>
                                    :
                                    <Avatar bg="green"/>
                                }
                            </Td>
                            <Td>{customer.name}</Td>
                            <Td textAlign="end">
                                <Button type="button" variant="outline" colorScheme="green" onClick={() => handleEdit(customer)}>
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