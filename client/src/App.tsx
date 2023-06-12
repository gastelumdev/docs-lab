import { Login } from "./features/auth/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
    getSessionAsync,
    selectIsAuthenticated,
} from "./features/auth/authSlice";
import { useEffect, useState } from "react";
import Sites from "./features/sites/View";
import Pages from "./features/pages/View";
import Sections from "./features/sections/View";
import Register from "./features/auth/Register";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        useAppSelector(selectIsAuthenticated)
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSessionAsync());
    }, [isAuthenticated]);
    console.log("isAuthenticated", isAuthenticated);

    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/pages/:siteId" element={<Pages />} />
                    <Route path="/sections/:pageId" element={<Sections />} />
                    <Route path="/" element={<Sites />} />
                    {/* <Route path="/sites" element={<Sites />} /> */}
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/register" element={<Register />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
