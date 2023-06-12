/**
 * @role Parent feature
 * This feature will serve as a entry point to the application
 * once the user has logged in.
 * All configuration settings for this feature will be declared here
 */
export default {
    name: "sites",
    altName: "site",
    defaultData: {
        name: "",
        description: "",
        owner: localStorage.getItem("userId"),
    },
    redirectComponent: "pages"
}