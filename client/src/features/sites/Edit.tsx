import React, { useEffect, useState } from "react";
import { updateDataAsync, getDataAsync } from "./slice";
import { TData } from "./types";
import config from "./config";
import {
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    FormLabel,
    Input,
    DrawerFooter,
    Box,
    useDisclosure,
    Stack,
} from "@chakra-ui/react";
import { useAppDispatch } from "../../app/hooks";

interface PropsType {
    _data: TData;
    onRerender(): void;
}

const EditEvent = (props: PropsType) => {
    const [redirect, setRedirect] = useState(false);
    const { _data, onRerender } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState<TData>(config.defaultData);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getDataAsync());
        console.log(data);
    }, [dispatch, data]);

    const handleClick = () => {
        // setSize(newSize);
        onOpen();
        setData(_data);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const onSubmit = () => {
        console.log(_data);
        dispatch(
            updateDataAsync({
                _id: data._id,
                name: data.name,
                description: data.description,
                owner: localStorage.getItem("userId"),
            })
        );
        // setData({
        //     title: "",
        //     overview: "",
        //     date: new Date(),
        // });
        dispatch(getDataAsync());
        onRedirect();
        onRerender();
        onClose();
    };

    const onRedirect = () => {
        setRedirect(true);
    };

    return (
        <>
            <Button
                colorScheme="teal"
                variant="ghost"
                size="xs"
                onClick={() => handleClick()}
            >
                Edit
            </Button>

            <Drawer onClose={onClose} isOpen={isOpen} size={"full"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Edit{" "}
                        {config.altName.charAt(0).toUpperCase() +
                            config.altName.slice(1)}
                    </DrawerHeader>
                    <DrawerBody>
                        <DrawerBody>
                            <Stack spacing="24px">
                                {" "}
                                */
                                <Box>
                                    <FormLabel htmlFor="name">Title</FormLabel>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Pleas enter the title of the event"
                                        onChange={handleChange}
                                        value={data["name"]}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel htmlFor="description">
                                        Overview
                                    </FormLabel>
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="Please enter the event overview"
                                        onChange={handleChange}
                                        value={data["description"]}
                                    />
                                </Box>
                            </Stack>
                        </DrawerBody>
                        <DrawerFooter borderTopWidth="1px">
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" onClick={onSubmit}>
                                Submit
                            </Button>
                        </DrawerFooter>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default EditEvent;
