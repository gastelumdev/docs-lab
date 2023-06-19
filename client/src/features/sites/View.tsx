import React from "react";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import axios from "axios";
import API_URL from "../api/api_url";
import { logoutAsync } from "../auth/authSlice";
import {
    createDataAsync,
    deleteDataAsync,
    updateDataAsync,
    getDataAsync,
    selectCreatedData,
    selectData,
} from "./slice";
import Nav from "../../components/NavBar";
import {
    SimpleGrid,
    Card,
    CardHeader,
    Heading,
    CardBody,
    CardFooter,
    Button,
    Text,
    Wrap,
    Container,
    Center,
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Select,
    Stack,
    Textarea,
    useDisclosure,
    HStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Navigate, useNavigate } from "react-router-dom";
import EditEvent from "./Edit";
import { TData } from "./types";
import config from "./config";

const View = () => {
    const selectedData = useAppSelector(selectData);
    const newSelectedData = useAppSelector(selectCreatedData);

    const [rerender, setRerender] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [data, setData] = useState<TData>({
        name: "",
        description: "",
        owner: localStorage.getItem("userId"),
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef();

    useEffect(() => {
        dispatch(getDataAsync());
    }, [dispatch, rerender, redirect]);

    const create = async () => {
        // const event = { name: "New Event 1", description: "New Event Desc" };
        dispatch(createDataAsync(data));
        setData({
            name: "",
            description: "",
            owner: localStorage.getItem("userId"),
        });
        dispatch(getDataAsync());
        setRerender(!rerender);
        onClose();
    };

    const handleUpdateButton = (data: TData) => {
        console.log(data);
        onOpen();
    };

    const handleUpdate = async (data: TData) => {
        dispatch(updateDataAsync(data));
        dispatch(getDataAsync());
        setRerender(!rerender);
    };

    const handleDelete = async (dataId: string) => {
        console.log(dataId);
        dispatch(deleteDataAsync(dataId));
        dispatch(getDataAsync());
        setRerender(!rerender);
    };

    const handleSetId = (dataId: string) => {
        // dispatch(setEventId(eventId));
        localStorage.setItem(`${config.altName}Id`, dataId);
        setRerender(!rerender);
        setRedirect(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const onRerender = () => {
        dispatch(getDataAsync());
        setRerender(!rerender);
        console.log(rerender);
    };

    const handleLogout = async () => {
        dispatch(logoutAsync());
    };

    if (redirect && localStorage.getItem(`${config.altName}Id`))
        return (
            <Navigate
                to={`/${config.redirectComponent}/${localStorage.getItem(
                    `${config.altName}Id`
                )}/`}
                replace
            />
        );

    return (
        <div>
            <Nav logout={handleLogout} />

            {/********** CREATE DRAWER **********/}
            <Drawer
                isOpen={isOpen}
                placement="right"
                // initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        Create a new {config.altName}
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input
                                    // ref={firstField}
                                    id="name"
                                    name="name"
                                    placeholder="Please enter event name"
                                    onChange={handleChange}
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="name">
                                    Description
                                </FormLabel>
                                <Input
                                    id="description"
                                    name="description"
                                    placeholder="Please enter event description"
                                    onChange={handleChange}
                                />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={() => create()}>
                            Submit
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/********************* BODY **********************/}
            <Container maxW="4xl" pt={"30px"} pb={"50px"}>
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={onOpen}
                    mb={"50px"}
                >
                    Create {config.altName}
                </Button>
                <Heading>
                    <Center pb={"50px"}>
                        {config.name.charAt(0).toUpperCase() +
                            config.name.slice(1)}
                    </Center>
                </Heading>
                <SimpleGrid
                    spacing={4}
                    templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                >
                    {selectedData.length > 0
                        ? selectedData.map((data: TData, index: any) => (
                              <Card key={index}>
                                  <CardHeader>
                                      <Heading size="md">{data.name}</Heading>
                                  </CardHeader>
                                  <CardBody>
                                      <Text>{data.description}</Text>
                                  </CardBody>
                                  <CardFooter>
                                      <HStack>
                                          <Button
                                              colorScheme="blue"
                                              variant="ghost"
                                              size="xs"
                                              onClick={() =>
                                                  handleSetId(data._id)
                                              }
                                          >
                                              View
                                          </Button>
                                          <EditEvent
                                              _data={data}
                                              onRerender={onRerender}
                                          />
                                          <Button
                                              colorScheme="red"
                                              variant="ghost"
                                              size="xs"
                                              onClick={() =>
                                                  handleDelete(data._id)
                                              }
                                          >
                                              Delete
                                          </Button>
                                      </HStack>
                                  </CardFooter>
                              </Card>
                          ))
                        : null}
                </SimpleGrid>
                {selectedData.length === 0 ? (
                    <Center>
                        Click the Create {config.altName} button to create an{" "}
                        {config.altName}.
                    </Center>
                ) : null}
            </Container>
        </div>
    );
};

export default View;
