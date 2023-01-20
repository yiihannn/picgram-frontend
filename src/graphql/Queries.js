import {gql} from "@apollo/client";

export const GET_CURR_USER = gql`
    query currUser {
        currentUser{
            id
            username
            firstName
            lastName
            profile{
                id
                avatarUrl
            }
        }
    }
`

export const GET_USER_INFO = gql`
    query userInfo($userId: ID!){
        user(id: $userId) {
            id
            username
            firstName
            lastName
            profile{
                id
                avatarUrl
                location
                description
                occupation
                followerCount
                followingCount
            }
            isFollowedByCurr
            userPhotos(orderBy: "-date_time"){
                edges {
                    node {
                        id
                        photoUrl
                        dateTime
                        commentSet{
                            edges {
                                node {
                                    id
                                    comment
                                    dateTime
                                    user{
                                        id
                                        username
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_PHOTO_DETAILS = gql`
    query photoDetails($photoId: ID!) {
        photo(id: $photoId) {
            id
            user{
                id
                username
                isFollowedByCurr
                profile {
                    id
                    avatarUrl
                }
            }
            photoUrl
            dateTime
            likedCount
            isLikedByCurr
            commentSet{
                edges{
                    node{
                        id
                        comment
                        dateTime
                        user{
                            id
                            username
                            profile {
                                id
                                avatarUrl
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_ALL_PHOTOS = gql`
    query allPhotos{
        getPhotos(orderBy: "-date_time"){
            edges {
                node {
                    id
                    photoUrl
                }
            }
        }
    }
`

export const GET_FOLLOWING_LIST = gql`
    query followingList($userId: ID!){
        user(id: $userId){
            id
            followingUser{
                edges{
                    node{
                        user{
                            id
                            username
                            firstName
                            lastName
                            lastLogin
                            profile {
                                id
                                avatarUrl
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_FOLLOWING_PHOTOS = gql`
    query followingPhotos($userId: ID!) {
        user(id: $userId) {
            id
            followingPhotos{
                edges {
                    node {
                        id
                        photoUrl
                        dateTime
                        likedCount
                        isLikedByCurr
                        caption
                        location
                        user{
                            id
                            username
                            firstName
                            lastName
                            profile {
                                id
                                avatarUrl
                            }
                        }
                        commentSet{
                            edges {
                                node {
                                    id
                                    comment
                                    user {
                                        id
                                        username
                                        profile {
                                            id
                                            avatarUrl
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_ALL_TAGS = gql`
    query allTags{
        getTags(orderBy: "name"){
            edges {
                node {
                    id
                    name
                    photoCount
                }
            }
        }
    }
`

export const SEARCH_PHOTOS = gql`
    query searchPhotos($keywords: String){
        getPhotos(tagsContain: $keywords){
            edges {
                node{
                    id
                    photoUrl
                }
            }
        }
    }
`

export const SEARCH_USERS = gql`
    query searchUsers($keywords: String){
        getUsers(nameContain: $keywords){
            edges {
                node {
                    id
                    username
                    firstName
                    lastName
                }
            }
        }
    }
`

export const GET_USER_FOLLOWER = gql`
    query userFollower($userId: ID!){
        user(id: $userId){
            followedByUser{
                edges {
                    node {
                        user {
                            id
                            username
                            firstName
                            lastName
                            isFollowedByCurr
                            profile {
                                id
                                avatarUrl
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_USER_FOLLOWING = gql`
    query userFollowing($userId: ID!){
        user(id: $userId){
            followingUser{
                edges {
                    node {
                        user {
                            id
                            username
                            firstName
                            lastName
                            isFollowedByCurr
                            profile {
                                id
                                avatarUrl
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_USER_PROFILE = gql`
    query userProfile($userId: ID!){
        user(id: $userId){
            id
            firstName
            lastName
            profile {
                id
                avatarUrl
                description
            }
        }
    }
`

export const SEARCH_USER = gql`
    query searchUser($userId: ID!) {
        user(id: $userId){
            id
            isFollowedByCurr
        }
    }
`