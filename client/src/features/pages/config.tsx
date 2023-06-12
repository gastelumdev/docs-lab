import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TData } from "./types";

/**
 * @role Parent feature
 * This feature will serve as a entry point to the application
 * once the user has logged in.
 * All configuration settings for this feature will be declared here
 */
export default {
    name: "pages",
    altName: "page",
    capName: "Pages",
    defaultData: {
        header: "",
        site: localStorage.getItem("siteId"),
    },
    forOneData: { header: "", site: "" },
    redirectComponent: "sections",
    parentFeature: "site",
    parentId: localStorage.getItem("siteId"),
    tableColumns: (
        handleDelete: (id: string) => {},
        handleUpdateButton: (row: TData) => {},
        handleSetId: (dataId: string) => void
    ) => {
        return [
            {
                name: "Header",
                selector: (row: { header: any; _id: any }) => row.header,
                sortable: true,
            },
            {
                cell: (row: TData) => (
                    <>
                        <Button
                            colorScheme="black"
                            variant={"outline"}
                            size="xs"
                            mr="6px"
                            onClick={() => handleSetId(row._id)}
                        >
                            View
                        </Button>
                        <Button
                            size="xs"
                            variant={"outline"}
                            colorScheme="red"
                            mr="6px"
                            onClick={() => handleDelete(row._id)}
                        >
                            Delete
                        </Button>
                        <Button
                            colorScheme="blue"
                            variant={"outline"}
                            size="xs"
                            onClick={() => handleUpdateButton(row)}
                        >
                            Update
                        </Button>
                    </>
                ),
            },
        ];
    },
    formFields: ["header"],
};
