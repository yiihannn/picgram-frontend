import { useContext } from "react";
import { AppContext } from "../../App";
import { Explore } from "./Explore";
import { Navigate } from "react-router-dom";

export const MainPage = () => {
    const { currUser } = useContext(AppContext);
    if (!currUser) return <Navigate to="/login-register" />;
    return <Explore />;
}