import Button from "@mui/material/Button";
import {useContext} from "react";
import {AppContext} from "../../App";
import {useMutation} from "@apollo/client";
import {FOLLOW_USER} from "../../graphql/Mutations";
import {GET_USER_FOLLOWING} from "../../graphql/Queries";

export const FollowButton = ({targetUser}) => {
    const {currUser} = useContext(AppContext);

    const [followUser] = useMutation(FOLLOW_USER, {
        update(cache, {data: {followUser: {currUser, targetUser}}}) {
            cache.modify({
                id: cache.identify(currUser.profile),
                fields: {
                    followingCount() {
                        return currUser.profile.followingCount;
                    }
                }
            })
            cache.modify({
                id: cache.identify(targetUser.profile),
                fields: {
                    followingCount() {
                        return targetUser.profile.followingCount;
                    },
                    isFollowedByCurr() {
                        return targetUser.isFollowedByCurr;
                    }
                }
            })
        },
        refetchQueries: [{query: GET_USER_FOLLOWING, variables: {userId: currUser.userId}}]
    });

    const handleClickFollow = (userId) => {
        followUser({variables: {userInput: {userId: userId}}});
    }

    return (
        <Button
            onClick={() => handleClickFollow(targetUser.id)}
            sx={{
                width: "130px", height: "40px",
                display: "inline-flex", textTransform: "none", fontSize: 16,
                backgroundColor: targetUser.isFollowedByCurr ? "#cecec8" : "#d30c0c",
                color: targetUser.isFollowedByCurr ? "black" : "white",
                pl: 2, pr: 2, borderRadius: 10, "&:hover": {
                    backgroundColor: targetUser.isFollowedByCurr ? "#e0e0d8" : "#a90909",
                }
            }}>
            {targetUser.isFollowedByCurr ? "Following" : "Follow"}
        </Button>)
}