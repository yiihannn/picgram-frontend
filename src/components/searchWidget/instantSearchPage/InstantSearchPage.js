import algoliasearch from 'algoliasearch/lite';
import {Hits, Index, InstantSearch, SearchBox} from 'react-instantsearch-hooks-web';
import Box from "@mui/material/Box";


const appId = '7CI3VTUHVV';
const apiKey = 'd7185cba8ed52d76b61e0a2a17deeade';

const searchClient = algoliasearch(appId, apiKey);

export function InstantSearchPage() {
    return (
        <InstantSearch searchClient={searchClient} indexName="photo_sharing_photo_dev">
            <Box display="none">
                <SearchBox />
            </Box>
            <Index indexName="photo_sharing_user_dev">
                <Hits/>
            </Index>

            <Index indexName="photo_sharing_photo_dev">
                <Hits/>
            </Index>

        </InstantSearch>
    )
}