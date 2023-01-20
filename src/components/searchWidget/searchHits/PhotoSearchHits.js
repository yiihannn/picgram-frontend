import {useHits} from "react-instantsearch-hooks-web";
import Box from "@mui/material/Box";

export const PhotoSearchHits = () => {
    const { hits, results, sendEvent } = useHits();
    console.log("hits:", hits)
    console.log("results:", results);
    console.log("sendEvent:", sendEvent);
    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            hits
        </Box>
    )
}