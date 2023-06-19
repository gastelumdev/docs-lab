const DEBUG = process.env.REACT_APP_DEBUG || "false";

const API_URL = (process.env.REACT_APP_DEBUG == "true")
    ? "http://localhost:4000"
    : "https://docs-lab-backend.onrender.com";

export default API_URL;