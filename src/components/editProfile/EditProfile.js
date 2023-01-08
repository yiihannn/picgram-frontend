import {Stack} from "@mui/material";
import {stringAvatar} from "../utils";
import Avatar from "@mui/material/Avatar";
import {GET_USER_PROFILE} from "../../graphql/Queries";
import {useQuery} from "@apollo/client";
import {useContext} from "react";
import {AppContext} from "../../App";
import {Loading} from "../others/Loading";
import {QueryError} from "../others/QueryError";

export const EditProfile = () => {
    const {currUser} = useContext(AppContext);
    const {loading: profileLoading, error: profileError, data: profileData} = useQuery(GET_USER_PROFILE, {
        variables: {userId: currUser.userId},
    });

    if (profileLoading) return <Loading/>;
    if (profileError) return <QueryError errorMessage={profileError}/>;

    const name = profileData.user.firstName + " " + profileData.user.lastName;

    return (
        <Stack maxWidth="md" alignItems="center" justifyContent="flex-start">
            <Avatar {...stringAvatar(name)} sx={{
                ...stringAvatar(name).sx,
                width: 90, height: 90, fontSize: 50
            }}/>

        </Stack>
    )
}