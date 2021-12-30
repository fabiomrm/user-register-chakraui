import { Flex, Container, Stack, Button, Modal, ModalOverlay, 
    ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, 
    useDisclosure, InputGroup, Input, InputLeftElement, Text } from '@chakra-ui/react';
import { AtSignIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Header } from '../../components/Header';
import { UsersList } from './UsersList';
import { Searchbar } from '../../components/Searchbar';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { User } from '../../types/User';

let id = 1;

export const Home = () => {

    const modalAddUser = useDisclosure();
    const modalLogout = useDisclosure();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue } = useForm<User>();
    const [users, setUsers] = useState<Array<User>>([]);
    const [user, setUser] = useState<User>();
    const [editingUser, setEditingUser] = useState<User | null>();

    useEffect(() => {
        fetch("http://localhost:3001/v1/users/me", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(async response => {
            const json = await response.json();

            if(response.ok) {
                setUser(json.user)
            } else {
                console.log((json.message));
            }
        })
        .catch(e => console.log(e));
        
    }, [])


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
        
        modalAddUser.onClose();
    }

    const edit = (user: User) => {
        setEditingUser(user);
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("phone", user.phone);

        modalAddUser.onOpen();
    };

    const showLogoutPopup = () => {
        modalLogout.onOpen();
    };

    const logout = () => {

        localStorage.removeItem("token");
        
        modalLogout.onClose();
        navigate('/');
    };

    return (
        <Flex
            flexDirection="column"
            width="100vw"
            height="100vh"
            backgroundColor="gray.200"
        >
            <Header onLogout={showLogoutPopup}/>

            <Container maxW="container.lg">
                <Stack
                    mt={4}
                >
                    <Text>{user?.name || "-"} ({user?.email})</Text>
                    {/* SEARCH BAR */}
                    <Searchbar />

                    {/* ADD BUTTON */}
                    <Flex justifyContent="flex-end">
                        <Button 
                            type="button" 
                            variant="solid" 
                            colorScheme="green"
                            onClick={modalAddUser.onOpen}
                        >
                            Adicionar
                        </Button>
                    </Flex>

                    {/* USERS LIST */}
                    <UsersList users={users} handleEdit={edit} />
                        
                </Stack>
            </Container>
            {/* MODAL DE CADASTRO */}
            <Modal isOpen={modalAddUser.isOpen} onClose={modalAddUser.onClose}>
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
                            <Button variant='ghost' onClick={modalAddUser.onClose}>Cancelar</Button>
                            <Button type="submit" colorScheme='green' mr={3}>Salvar</Button>
                        </ModalFooter>
                    </form> 
                </ModalContent>
            </Modal>

            {/* MODAL LOGOUT */}
            <Modal isOpen={modalLogout.isOpen} onClose={modalLogout.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Tem certeza que deseja sair?</ModalHeader>
                    <ModalCloseButton />
                        <ModalBody>
                            <Text>Você tem certeza que deseja sair?</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' onClick={modalLogout.onClose}>Cancelar</Button>
                            <Button type="button" colorScheme='green' mr={3} onClick={logout}>Sair</Button>
                        </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};