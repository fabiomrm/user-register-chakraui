import { Flex, Container, Stack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, InputGroup, Input, InputLeftElement } from '@chakra-ui/react';
import { AtSignIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Header } from '../../components/Header';
import { UsersList } from './UsersList';
import { Searchbar } from '../../components/Searchbar';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { User } from '../../types/User';

let id = 1;

export const Home = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, setValue } = useForm<User>();
    const [users, setUsers] = useState<Array<User>>([]);
    const [editingUser, setEditingUser] = useState<User | null>();


    const saveUser: SubmitHandler<User> = (data): void => {
        let usersCopy = [...users];
        if(editingUser) {
            usersCopy = usersCopy.filter(user => user.id !== editingUser.id);
            data.id = editingUser.id;
        }
        else {
            data.id = id;
            id++;
        }
        usersCopy.push(data);
        usersCopy.sort((a, b) => {
            return a.name.localeCompare(b.name);
        })
        setUsers(usersCopy);

        console.log(data)
        setValue("name", "");
        setValue("email", "");
        setValue("phone", "");
        
        onClose();
    }

    const edit = (user: User) => {
        setEditingUser(user);
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("phone", user.phone);

        onOpen();
    };


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
                        onClick={onOpen}
                    >
                        Adicionar
                    </Button>
                </Flex>

                {/* USERS LIST */}
                <UsersList users={users} handleEdit={edit} />
                
            </Stack>
        </Container>
        {/* MODAL DE CADASTRO */}
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Usuário</ModalHeader>
          <ModalCloseButton />
            <form id="form" action="" method="POST" onSubmit={handleSubmit(saveUser)}>
            <ModalBody>
                <Stack>
                    <InputGroup>
                        <InputLeftElement 
                            pointerEvents="none"
                            children={ <AtSignIcon color="gray.300"/>}
                        />
                        
                        <Input type="text" placeholder="Nome de usuário" {...register("name")}/>
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement 
                            pointerEvents="none"
                            children={ <EmailIcon color="gray.300"/>}
                            />
                        <Input type="email" placeholder="Endereço de email" {...register("email")} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement 
                            pointerEvents="none"
                            children={ <PhoneIcon color="gray.300"/>}
                            />
                        <Input type="text" placeholder="Celular" {...register("phone")}/>
                    </InputGroup>
                </Stack> 
            </ModalBody>
            <ModalFooter>
                <Button variant='ghost' onClick={onClose}>Cancelar</Button>
                <Button type="submit" colorScheme='green' mr={3}>Salvar</Button>
            </ModalFooter>
            </form> 
        </ModalContent>
      </Modal>

        
        </Flex>
    );
};