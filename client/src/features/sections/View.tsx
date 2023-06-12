import React, { useEffect, useState } from "react";
import SidebarWithHeader from "../../components/DashboardNav";
import {
    Box,
    Button,
    ChakraProvider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormLabel,
    Input,
    Stack,
    useDisclosure,
    Text,
    Badge,
    Toast,
    useToast,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DataTable, { TableColumn, TableRow } from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import {
    createDataAsync,
    deleteDataAsync,
    getDataAsync,
    selectCreatedData,
    selectError,
    selectData,
    updateDataAsync,
} from "./slice";
import { TData } from "./types";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import config from "./config";
import Nav from "../../components/NavBar";
import { logoutAsync } from "../auth/authSlice";

const View = () => {
    const selectedData = useAppSelector(selectData);
    const selectedCreatedData = useAppSelector(selectCreatedData);
    const toast = useToast();
    const error = useAppSelector(selectError);

    const [rerender, setRerender] = useState(true);
    const [data, setData] = useState<TData>(config.defaultData);
    const [isCreate, setIsCreate] = useState(true);
    const params = useParams();

    const dispatch = useAppDispatch();
    const {
        isOpen: isCreateOpen,
        onOpen: onCreateOpen,
        onClose: onCreateClose,
    } = useDisclosure();
    const {
        isOpen: isUpdateOpen,
        onOpen: onUpdateOpen,
        onClose: onUpdateClose,
    } = useDisclosure();

    useEffect(() => {
        console.log(localStorage.getItem("pageId"));
        dispatch(getDataAsync(localStorage.getItem("pageId")));
    }, [dispatch, rerender]);

    const createData = async () => {
        console.log(data);
        dispatch(createDataAsync(data));
        setData(config.defaultData);
        dispatch(getDataAsync(config.parentId));
        setRerender(!rerender);
        onCreateClose();

        console.log(error);
        if (error) {
            return toast({
                position: "top",
                title: "Participant already exists",
                description: "The participant with that email already exists",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (dataId: string) => {
        dispatch(deleteDataAsync(dataId));
        dispatch(getDataAsync(config.parentId));
        setRerender(!rerender);
    };

    const handleUpdateButton = async (data: TData) => {
        setIsCreate(true);
        onUpdateOpen();
        setData({
            ...data,
            _id: data._id,
            header: data.header,
        });
    };

    const handleUpdate = async () => {
        dispatch(updateDataAsync(data));
        dispatch(getDataAsync(config.parentId));
        setRerender(!rerender);
        onUpdateClose();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleLogout = async () => {
        dispatch(logoutAsync());
    };

    const columns: any = config.tableColumns(handleDelete, handleUpdateButton);

    return (
        <ChakraProvider>
            <Drawer
                isOpen={isCreateOpen}
                placement="right"
                // initialFocusRef={firstField}
                onClose={onCreateClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        Create {config.altName}
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="24px">
                            {config.formFields.map((field, index) => {
                                return (
                                    <Box key={index}>
                                        <FormLabel htmlFor={field}>
                                            {field}
                                        </FormLabel>
                                        <Input
                                            // ref={firstField}
                                            id={field}
                                            name={field}
                                            placeholder={`Please enter ${config.altName} ${field}`}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                );
                            })}
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={onCreateClose}
                        >
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={() => createData()}>
                            Create
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Drawer
                isOpen={isUpdateOpen}
                placement="right"
                // initialFocusRef={firstField}
                onClose={onUpdateClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        Create {config.altName}
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="24px">
                            {config.formFields.map((field, index) => {
                                return (
                                    <Box key={index}>
                                        <FormLabel htmlFor={field}>
                                            {field}
                                        </FormLabel>
                                        <Input
                                            // ref={firstField}
                                            id={field}
                                            name={field}
                                            placeholder={`Please enter ${config.parentFeature} ${config.name}`}
                                            onChange={handleChange}
                                            value={data[field as keyof TData]}
                                        />
                                    </Box>
                                );
                            })}
                            {/* <Box>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input
                                    // ref={firstField}
                                    id="name"
                                    name="name"
                                    placeholder="Please enter event name"
                                    onChange={handleChange}
                                    value={data.name}
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    // ref={firstField}
                                    id="email"
                                    name="email"
                                    placeholder="Please enter participant email"
                                    onChange={handleChange}
                                    value={data.email}
                                />
                            </Box> */}
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={onUpdateClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => handleUpdate()}
                        >
                            Update
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Nav logout={handleLogout} />
            <Breadcrumb
                spacing="8px"
                m={"20px"}
                separator={<ChevronRightIcon color="gray.500" />}
            >
                <BreadcrumbItem>
                    <BreadcrumbLink href="/#">Sites</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href={`/#/pages/${config.parentId}`}>
                        Pages
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Box
                // maxW={{ base: "full", md: "275px" }}
                bg="white"
                w={"full"}
                borderWidth="1px"
                borderRadius="lg"
                p={5}
            >
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    size="sm"
                    mb="30px"
                    onClick={onCreateOpen}
                >
                    Create {config.capName}
                </Button>
                <DataTable
                    columns={columns}
                    data={selectedData}
                    selectableRows
                    pagination
                />
            </Box>
        </ChakraProvider>
    );
};

export default View;
