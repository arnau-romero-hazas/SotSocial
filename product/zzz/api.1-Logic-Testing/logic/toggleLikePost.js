import { data } from "../data/index.js";
import { validate } from "./validate.js";

import { NotFoundError} from '../errors.js'

export const toggleLikePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const foundPost = data.posts.findOne(post => post.id === postId)

    if (!foundPost) throw new NotFoundError('post not found')

    let userIdFound = false

    for (let i = 0; i < foundPost.likes.length && !userIdFound; i++) {
        const id = foundPost.likes[i]

        if (id === userId)
            userIdFound = true
    }
    if (!userIdFound)
        foundPost.likes[foundPost.likes.length] = userId
    else {
        const likes = []
        for (let i = 0; i < foundPost.likes.length; i++) {
            const id = foundPost.likes[i]

            if (id !== userId)
                likes[likes.length] = id
        }

        foundPost.likes = likes
    }
    data.posts.updateOne(post => post.id = postId, foundPost)
}