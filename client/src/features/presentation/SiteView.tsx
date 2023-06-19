import React from "react";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getOneDataAsync, selectOneData } from "../sites/slice";
import { getDataAsync, selectData } from "../pages/slice";
import { Link, useParams } from "react-router-dom";
import { TData as TPage } from "../pages/types";
import {
    Box,
    Button,
    List,
    ListItem,
    SimpleGrid,
    useColorModeValue,
    Text,
    Stack,
} from "@chakra-ui/react";

const SiteView = () => {
    const dispatch = useAppDispatch();
    // const selectedOneData = useAppSelector(selectOneData);
    const selectedOneData = useAppSelector((state) => state.sites.oneData);
    const selectedPages = useAppSelector((state) => state.pages.data);
    const { siteId } = useParams();

    useEffect(() => {
        dispatch(getOneDataAsync(siteId || ""));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDataAsync(siteId || ""));
    }, [dispatch]);

    return (
        <>
            <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                <Box p="70px">
                    <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                    >
                        {selectedOneData.name}
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                        <List spacing={2}>
                            {selectedPages.map((page: TPage) => (
                                <ListItem color="blue">
                                    <Link to={`/presentation/page/${page._id}`}>
                                        {page.header}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </SimpleGrid>
                </Box>
            </Stack>
        </>
    );
};

export default SiteView;
