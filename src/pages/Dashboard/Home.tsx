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
import { Customer } from '../../types/Customer';

let id = 1;

export const Home = () => {

    const modalAddCustomer = useDisclosure();
    const modalLogout = useDisclosure();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue } = useForm<User>();
    const [user, setUser] = useState<User>();
    const [customers, setCustomers] = useState<Array<Customer>>([]);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>();

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
        getCustomers()
        
    }, [])

    const getCustomers = () => {
        fetch("http://localhost:3001/v1/customers", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then(async (res) => {
            const json = await res.json();
            if(res.ok) {
                console.log(json)
                setCustomers(json)
            } else {
                console.log(`Error: ${json.message}`)
            }
        })
    }


    const saveCustomer: SubmitHandler<Customer> = (data): void => {
        modalAddCustomer.onClose();

        fetch('http://localhost:3001/v1/customers', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
        })
        .then(async (response) => {
            const json = await response.json();
            if(response.ok) {
                setValue("name", "");
                setValue("email", "");
                setValue("phone", "");

                getCustomers()
            } else {
                console.log(`Error: ${json.message}`)
            }
        })
    }

    const edit = (customer: Customer) => {
        setEditingCustomer(customer);
        setValue("name", customer.name);
        setValue("email", customer.email);
        setValue("phone", customer.phone);

        modalAddCustomer.onOpen();
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
                            onClick={modalAddCustomer.onOpen}
                        >
                            Adicionar
                        </Button>
                    </Flex>

                    {/* USERS LIST */}
                    <UsersList customers={customers} handleEdit={edit} />
                        
                </Stack>
            </Container>
            {/* MODAL DE CADASTRO */}
            <Modal isOpen={modalAddCustomer.isOpen} onClose={modalAddCustomer.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Usuário</ModalHeader>
                    <ModalCloseButton />
                    <form id="form" action="" method="POST" onSubmit={handleSubmit(saveCustomer)}>
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
                            <Button variant='ghost' onClick={modalAddCustomer.onClose}>Cancelar</Button>
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