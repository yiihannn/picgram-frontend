import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

export function ProductItem({ hit, components }) {
    return (
        <Box className="aa-ItemLink" component="a" href={"/user/" + hit.global_id}
             sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}
        >
            <Avatar sx={{ width: 28, height: 28, mr: 0.5 }} alt="" src={`${hit.avatar_url}`}/>
            <div className="aa-ItemContent">
                <div className="aa-ItemTitle">
                    <components.Highlight hit={hit} attribute="first_name"/>
                    <span> </span>
                    <components.Highlight hit={hit} attribute="last_name"/>
                </div>
            </div>
        </Box>
    );
}
