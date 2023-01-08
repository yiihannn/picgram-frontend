import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {MainPage} from "./components/explorePage/MainPage"
import {TopBar} from "./components/topBar/TopBar"
import {useState, createContext, useEffect} from "react";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client"
import { createUploadLink } from "apollo-upload-client";
import {LoginRegister} from "./components/loginRegister/LoginRegister";
import {UserPage} from "./components/userPage/UserPage";
import {HomePage} from "./components/homePage/HomePage";
import {SearchPage} from "./components/searchPage/SearchPage";

export const AppContext = createContext();

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: createUploadLink()
    });

    const [currPage, setCurrPage] = useState("");
    const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem("currUser")));

    useEffect(() => {
        localStorage.setItem("currUser", JSON.stringify(currUser));
    }, [currUser])

    return (
        <ApolloProvider client={client}>
            <AppContext.Provider value={{
                currPage, setCurrPage,
                currUser, setCurrUser,
            }}>
                <BrowserRouter>
                    {currUser !== null && <TopBar/>}
                    <Routes>
                        <Route path="/" element={currUser ? <MainPage/> : <Navigate to="/login-register" replace={true}/>}/>
                        <Route path="/login-register" element={<LoginRegister/>}/>
                        <Route path="/user/:userId" element={currUser ? <UserPage/> : <Navigate to="/login-register" replace={true}/>}/>
                        <Route path="/home/:userId" element={currUser ? <HomePage/> : <Navigate to="/login-register" replace={true}/>}/>
                        <Route path="/search" element={currUser ? <SearchPage/> : <Navigate to="/login-register" replace={true}/>}/>
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </ApolloProvider>
    );
}

export default App;
