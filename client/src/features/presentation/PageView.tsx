import React from "react";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getOneDataAsync } from "../pages/slice";
import { getDataAsync } from "../sections/slice";
import { TData as TSection } from "../sections/types";
import { Link, useParams } from "react-router-dom";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Container,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const PageView = () => {
    const dispatch = useAppDispatch();
    const page = useAppSelector((state) => state.pages.oneData);
    const sections = useAppSelector((state) => state.sections.data);
    const { pageId } = useParams();

    useEffect(() => {
        dispatch(getOneDataAsync(pageId || ""));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDataAsync(pageId || ""));
    }, [dispatch]);

    return (
        <>
            <Container maxW={"7xl"} p="12" pt="4">
                <Breadcrumb
                    spacing="8px"
                    mb="30"
                    separator={<ChevronRightIcon color="gray.500" />}
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/#/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Heading as="h1">{page.header}</Heading>
                <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
                    {sections.map((section: TSection) => (
                        <Box key={section._id}>
                            <Heading as="h4">{section.header}</Heading>
                            <Text as="p" fontSize="lg">
                                {section.content}
                            </Text>
                        </Box>
                    ))}
                </VStack>
            </Container>
        </>
    );
};

export default PageView;
