import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
    getSessionAsync,
    selectIsAuthenticated,
    selectStatus as selectAuthStatus,
    selectUser,
    getUserAsync,
} from "../features/auth/authSlice";
import { Spinner } from "@chakra-ui/react";

const PresentationRoutes = () => {
    const status = useAppSelector(selectAuthStatus);
    const user = useAppSelector(selectUser);
    const [isAuthenticated, setIsAuthenticated] = useState(
        useAppSelector(selectIsAuthenticated)
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSessionAsync());
        dispatch(getUserAsync());
    }, [dispatch]);

    console.log(user);

    if (status === "loading") {
        return <Spinner />;
    } else {
        if (
            isAuthenticated &&
            localStorage.getItem("token") &&
            (user.role == "admin" || user.role == "normal")
        ) {
            return <Outlet />;
        }
        return <Navigate to="/login" replace />;
    }
};

export default PresentationRoutes;
