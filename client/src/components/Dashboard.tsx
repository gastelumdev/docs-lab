import React, { useEffect, useState } from "react";
import SidebarWithHeader from "./DashboardNav";
import {
    Box,
    ChakraProvider,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { selectEventId } from "../features/events/eventsSlice";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";

const columns = [
    {
        name: "Name",
        selector: (row: { name: any }) => row["name"],
        sortable: true,
    },
    {
        name: "Email",
        selector: (row: { email: any }) => row.email,
        sortable: true,
    },
];

const Dashboard = () => {
    const params = useParams();
    const [eventId, setEventId] = useState(() => {
        const inittialValue = localStorage.getItem("eventId") || "";
        // const inittialValue = JSON.parse(saved);
        return inittialValue || "";
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch(getParticipantsAsync(localStorage.getItem("eventId")));
    }, [dispatch]);

    return (
        <ChakraProvider>
            <SidebarWithHeader>
                <h1>{params.id}</h1>
                {/* <Box
                    // maxW={{ base: "full", md: "275px" }}
                    bg="white"
                    w={"full"}
                    borderWidth="1px"
                    borderRadius="lg"
                    p={5}
                >
                    <DataTable
                        columns={columns}
                        data={participants}
                        selectableRows
                        pagination
                    />
                </Box> */}
            </SidebarWithHeader>
        </ChakraProvider>
    );
};

export default Dashboard;
