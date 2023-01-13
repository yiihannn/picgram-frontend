import {gql} from "@apollo/client";

export const LOG_IN = gql`
    mutation userLogIn($userData: LogInInput!) {
        logIn(input: $userData) {
            user{
                id
                username
                firstName
                lastName
            }
        }
        
    }
`

export const SIGN_UP = gql`
    mutation userSignUp($userData: SignUpInput!) {
        signUp(input: $userData) {
            user {
                id
            }
        }
    }
`

export const LOG_OUT = gql`
    mutation userLogOut($userData: LogOutInput!) {
        logOut(input: $userData) {
            code
            msg
        }
    }
`

export const LIKE_PHOTO = gql`
    mutation likePhoto($photoInput: LikePhotoInput!) {
        likePhoto(input: $photoInput) {
            code
            msg
        }
    }
`

export const MAKE_COMMENT = gql`
    mutation makeComment($commentInput: MakeCommentInput!) {
        makeComment(input: $commentInput) {
            code
            msg
        }
    }
`

export const UPLOAD_PHOTO = gql`
    mutation uploadPhoto($uploadInput: UploadPhotoInput!) {
        uploadPhoto(input: $uploadInput) {
            code
            msg
        }
    }
`

export const FOLLOW_USER = gql`
    mutation followUser($userInput: FollowUserInput!) {
        followUser(input: $userInput) {
            code
            msg
        }
    }
`

export const EDIT_PROFILE = gql`
    mutation editProfile($profileInput: EditProfileInput!) {
        editProfile(input: $profileInput) {
            user {
                id
                firstName
                lastName
                profile {
                    id
                    description
                }
            }
        }
    }
`

export const CHANGE_AVATAR = gql`
    mutation changeAvatar($avatarInput: ChangeAvatarInput!) {
        changeAvatar(input: $avatarInput) {
            profile {
                id
                avatarUrl
            }
        }
    }
`