import SignInSide from "./SignInSide"
import SignUpSide from "./SignUpSide"
import { useContext } from "react";
import {AppContext} from "../../App";


export const LoginRegister = () => {
    const { currPage } = useContext(AppContext);

    return (
        currPage === "signup" ? <SignUpSide /> : <SignInSide />
    );

}