import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
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
import {ExplorePage} from "./components/explorePage/ExplorePage";
import {EditProfile} from "./components/editProfile/EditProfile";
import {InstantSearchPage} from "./components/searchWidget/instantSearchPage/InstantSearchPage";

export const AppContext = createContext();

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        user: {
                            merge: true,
                        }
                    }
                }
            }
        }),
        link: createUploadLink(),
        connectToDevTools: true
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
                        <Route path="/" element={<Navigate to="/explore"/>}/>
                        <Route path="/explore" element={currUser ? <ExplorePage/> : <Navigate to="/login-register" replace={true}/>}/>
                        <Route path="/login-register" element={<LoginRegister/>}/>
                        <Route path="/user/:userId" element={currUser ? <UserPage/> : <Navigate to="/login-register" replace={true}/>}/>
                        <Route path="/home/:userId" element={currUser ? <HomePage/> : <Navigate to="/login-register" replace={true}/>}/>
                        <Route path="/search" element={currUser ? <InstantSearchPage/> : <Navigate to="/login-register" replace={true}/>}/>
                        <Route path="/edit-profile" element={currUser ? <EditProfile/> : <Navigate to="/login-register" replace={true}/>}/>
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </ApolloProvider>
    );
}

export default App;
