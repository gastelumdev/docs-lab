import { Button } from "@chakra-ui/react";
import { TData } from "./types";

/**
 * @role Parent feature
 * This feature will serve as a entry point to the application
 * once the user has logged in.
 * All configuration settings for this feature will be declared here
 */
export default {
    name: "sections",
    altName: "sections",
    capName: "Sections",
    defaultData: {
        header: "",
        content: "",
        page: localStorage.getItem("pageId"),
    },
    forOneData: { header: "", content: "", page: "" },
    redirectComponent: "sections",
    parentFeature: "page",
    parentId: localStorage.getItem("pageId"),
    tableColumns: (
        handleDelete: (id: string) => {},
        handleUpdateButton: (row: TData) => {}
    ) => {
        return [
            {
                name: "Header",
                selector: (row: { header: any }) => row.header,
                sortable: true,
            },
            {
                name: "Content",
                selector: (row: { content: any }) => row.content,
                sortable: true,
            },
            {
                cell: (row: TData) => (
                    <>
                        <Button
                            size="xs"
                            colorScheme="red"
                            mr="6px"
                            onClick={() => handleDelete(row._id)}
                        >
                            Delete
                        </Button>
                        <Button
                            colorScheme="blue"
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
    formFields: ["header", "content"],
};
