import {useQuery} from "@apollo/client";
import {SEARCH_USER} from "../../graphql/Queries";
import {Loading} from "../others/Loading";
import {QueryError} from "../others/QueryError";
import {FollowButton} from "./FollowButton";

export const FollowButtonUseId = ({targetUserId}) => {
    const {loading, error, data} = useQuery(SEARCH_USER, {variables: {userId: targetUserId}});
    if (loading) return <Loading/>;
    if (error) return <QueryError errorMessage={error}/>;
    return (
        (data?.user && <FollowButton targetUser={data.user}/>)
    )
}