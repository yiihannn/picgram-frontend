import {gql} from "@apollo/client";

export const GET_USER_INFO = gql`
    query userInfo($userId: ID!){
        user(id: $userId) {
            username
            firstName
            lastName
            profile{
                location
                description
                occupation
            }
            userPhotos(orderBy: "-date_time"){
                edges {
                    node {
                        id
                        fileName
                        dateTime
                        commentSet{
                            edges {
                                node {
                                    comment
                                    dateTime
                                    user{
                                        username
                                        id
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
                firstName
                lastName
            }
            fileName
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
                            username
                            firstName
                            lastName
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
                    fileName
                }
            }
        }
    }
`

export const GET_FOLLOWING_LIST = gql`
    query followingList($userId: ID!){
        user(id: $userId){
            followedByUser{
                edges{
                    node{
                        user{
                            id
                            username
                            firstName
                            lastName
                            lastLogin
                        }
                    }
                }
            }
        }
    }
`

export const GET_FOLLOWING_PHOTOS = gql`
    query followingPhotos($followingUserIds: String) {
        getPhotos(userIn: $followingUserIds, orderBy: "-date_time") {
            edges {
                node {
                    id
                    fileName
                    dateTime
                    likedCount
                    isLikedByCurr
                    caption
                    location
                    user{
                        username
                        firstName
                        lastName
                    }
                    commentSet{
                        edges {
                            node {
                                comment
                                user {
                                    username
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
                    name
                    photoCount
                }
            }
        }
    }
`
