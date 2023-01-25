import {useSearchBox} from "react-instantsearch-hooks-web";
import Box from "@mui/material/Box";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export function SearchBox() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query')
    const {refine} = useSearchBox();
    useEffect(() => {
        refine(query ?? "");
    }, [query, refine]);
    return (
        <Box display="none"/>
    )
}