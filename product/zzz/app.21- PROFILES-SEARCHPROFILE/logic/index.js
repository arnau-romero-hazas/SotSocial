import { registerUser } from './registerUser'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { getUserUsername } from './getUserUsername'
import { getUserId } from './getUserId'

import { createPost } from './createPost'
import { getPosts } from './getPosts'
import { deletePost } from './deletePost'
import { updatePostText } from './updatePostText'
import { toggleLikePost } from './toggleLikePost'
import { getUserPosts } from './getUserPosts'


export const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserUsername,
    getUserId,

    createPost,
    getPosts,
    deletePost,
    updatePostText,
    toggleLikePost,
    getUserPosts,
}