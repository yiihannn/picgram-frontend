import {createTheme, ThemeProvider} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {useState} from "react";
import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import {useSearchParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {SEARCH_PHOTOS, SEARCH_USERS} from "../../graphql/Queries";
import {Loading} from "../others/Loading";
import {QueryError} from "../others/QueryError";
import {SearchPhoto} from "./SearchPhoto";
import {SearchUser} from "./SearchUser";

const categories = ["Photo", "User"]

export const SearchPage = () => {
    const theme = createTheme();
    const [searchParams] = useSearchParams();
    const params = Object.fromEntries([...searchParams]);
    const {loading: photoLoading, error: photoError, data: photoData}
        = useQuery(SEARCH_PHOTOS, {variables: {keywords: params.keywords}});
    const {loading: userLoading, error: userError, data: userData}
        = useQuery(SEARCH_USERS, {variables: {keywords: params.keywords}});

    const [category, setCategory] = useState("Photo");

    const handleClickCategory = (option) => {
        if (option !== category) {
            setCategory(option);
        }
    }

    if (photoLoading) return <Loading/>
    if (photoError) return <QueryError errorMessage={photoError}/>
    if (userLoading) return <Loading/>
    if (userError) return <QueryError errorMessage={userError}/>

    return (
        <ThemeProvider theme={theme}>
            <Stack alignItems="center">
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {categories.map((option) => (
                        <Button
                            key={option}
                            onClick={() => handleClickCategory(option)}
                            sx={{
                                color: category === option ? 'white' : 'black',
                                fontSize: 15,
                                display: 'block',
                                textTransform: 'none',
                                fontFamily: 'BlinkMacSystemFont',
                                borderRadius: 10, p: 1,
                                backgroundColor: category === option ? 'black' : 'white',
                                "&:hover": {
                                    backgroundColor: category === option ? 'black' : 'white',
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {option}
                        </Button>))}
                </Box>
                <Stack direction="row" justifyContent="center" alignItems="flex-start" margin={1.5}>
                    {category === "Photo" ? <SearchPhoto photoList={photoData.getPhotos?.edges}/> :
                        <SearchUser userList={userData.getUsers?.edges}/>}
                </Stack>
            </Stack>
        </ThemeProvider>

    )
}