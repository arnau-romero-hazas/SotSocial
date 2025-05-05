import { registerUser } from './registerUser.js'
import { authenticateUser } from './authenticateUser.js'
import { getUserUsername } from './getUserUsername.js'
import { getUserIdByUsername } from './getUserIdByUsername.js'

import { createPost } from './createPost.js'
import { getPosts } from './getPosts.js'
import { deletePost } from './deletePost.js'
import { updatePostText } from './updatePostText.js'
import { toggleLikePost } from './toggleLikePost.js'
import { getUserPosts } from './getUserPosts.js'
import { searchUsers } from './searchUsers.js'

import { getComments } from './getComments.js'
import { deleteComments } from './deleteComments.js'
import { addComment } from './addComment.js'

export const logic ={
    registerUser,
    authenticateUser,
    getUserUsername,
    searchUsers,
    getUserIdByUsername,

    getComments,
    deleteComments,
    addComment,

    createPost,
    getPosts,
    deletePost,
    updatePostText,
    toggleLikePost,
    getUserPosts
}