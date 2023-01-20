import Box from "@mui/material/Box";

export const RecentSearchItem = ({params, source}) => {
    return (
        <Box className="aa-ItemLink" component="a"
             sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}
        >
            {source.templates.item(params).props.children}
        </Box>
    )
}