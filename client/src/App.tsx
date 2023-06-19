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
import SiteView from "./features/presentation/SiteView";
import PageView from "./features/presentation/PageView";
import PresentationRoutes from "./components/PresentationRoutes";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        useAppSelector(selectIsAuthenticated)
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSessionAsync());
    }, [isAuthenticated]);

    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/pages/:siteId" element={<Pages />} />
                    <Route path="/sections/:pageId" element={<Sections />} />
                    <Route path="/" element={<Sites />} />
                </Route>
                <Route element={<PresentationRoutes />}>
                    <Route
                        path="/presentation/site/:siteId"
                        element={<SiteView />}
                    />
                    <Route
                        path="/presentation/page/:pageId"
                        element={<PageView />}
                    />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
