import {ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import {useQuery} from "@apollo/client";
import {GET_CURR_USER} from "../../graphql/Queries";
import {Loading} from "../others/Loading";
import {QueryError} from "../others/QueryError";

export const FollowingList = ({users}) => {
    const {loading, error, data} = useQuery(GET_CURR_USER)

    if (loading) return <Loading/>
    if (error) return <QueryError errorMessage={error}/>

    return (
        (data &&
            <List sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', width: "260px"
            }}>
                <ListItem key="currUser">
                    <ListItemAvatar>
                        <Avatar alt="" src={`${data.currentUser.profile.avatarUrl}`}/>
                    </ListItemAvatar>
                    <ListItemText primary={data.currentUser.username} secondary={data.currentUser.firstName + " " +
                        data.currentUser.lastName}
                                  primaryTypographyProps={{
                                      fontFamily: 'Arial',
                                      fontWeight: 'bold',
                                      variant: 'body1',
                                  }}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary={"Following"}
                                  primaryTypographyProps={{
                                      fontFamily: 'Arial',
                                      variant: 'body1',
                                      color: "#8e8e8e"
                                  }}/>
                </ListItem>
                {users.map((user, index) => (
                    <ListItem key={index} sx={{p: 0, pl: 2}}>
                        <ListItemAvatar>
                            <Avatar alt="" src={`${user.profile.avatarUrl}`}/>
                        </ListItemAvatar>
                        <ListItemText primary={user.username} secondary={user.firstName + " " + user.lastName}
                                      primaryTypographyProps={{
                                          fontFamily: 'Arial',
                                          fontWeight: 'medium',
                                          variant: 'body2',
                                      }}/>
                    </ListItem>))}
            </List>)
    )
}