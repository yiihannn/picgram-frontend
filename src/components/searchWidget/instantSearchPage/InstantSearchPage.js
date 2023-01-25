import algoliasearch from 'algoliasearch/lite';
import {Index, InstantSearch} from 'react-instantsearch-hooks-web';
import Box from "@mui/material/Box";
import {useSearchParams} from "react-router-dom";
import {UserSearchHits} from "../searchHits/UserSearchHits";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhotoIcon from '@mui/icons-material/Photo';
import {SearchBox} from '../searchBox/SearchBox'
import {PhotoSearchHits} from "../searchHits/PhotoSearchHits";


const appId = '7CI3VTUHVV';
const apiKey = 'd7185cba8ed52d76b61e0a2a17deeade';

const searchClient = algoliasearch(appId, apiKey);

export function InstantSearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const category = searchParams.get('category');

    const handleClickCategory = (option) => {
        if (option !== category) {
            setSearchParams({query: query, category: option});
        }
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Box component="button"
                    key="photo"
                    onClick={() => handleClickCategory("photo")}
                    sx={{
                        color: category === 'photo' ? 'black' : 'grey',
                        backgroundColor: 'white',
                        fontSize: 15,
                        textTransform: 'none',
                        fontFamily: 'BlinkMacSystemFont',
                        pl: 4, pr: 4, pt: 2, pb: 2,
                        border: 'none',
                        borderBottom: category === 'photo' ? '2px solid black' : 'none',
                        "&:hover": {
                            cursor: 'pointer'
                        }
                    }}
                >
                    <PhotoIcon/>
                </Box>
                <Box component="button"
                    key="user"
                    onClick={() => handleClickCategory("user")}
                     sx={{
                         color: category === 'user' ? 'black' : 'grey',
                         backgroundColor: 'white',
                         fontSize: 15,
                         textTransform: 'none',
                         fontFamily: 'BlinkMacSystemFont',
                         pl: 4, pr: 4, pt: 2, pb: 2,
                         border: 'none',
                         borderBottom: category === 'user' ? '2px solid black' : 'none',
                         "&:hover": {
                             cursor: 'pointer'
                         }
                     }}
                >
                    <AccountBoxIcon/>
                </Box>
            </Box>
            <Box>
                <InstantSearch searchClient={searchClient} indexName="photo_sharing_photo_dev">
                    <SearchBox/>
                    {category === 'user' && <Index indexName="photo_sharing_user_dev">
                        <UserSearchHits/>
                    </Index>}

                    {category === 'photo' && <Index indexName="photo_sharing_photo_dev">
                        <PhotoSearchHits/>
                    </Index>}

                </InstantSearch>
            </Box>
        </Box>

    )
}