import { data } from "../data/index.js";
import { validate } from "./validate.js"

import { NotFoundError, OwnershipError} from '../errors.js'

export const updatePostText = (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text, 'text')

    const foundPost = data.posts.findOne(post => post.id === postId)

    if (!foundPost) throw new NotFoundError('post not found')

    if (foundPost.author !== userId) throw new OwnershipError('user is not author of post')

    foundPost.text = text
    foundPost.modifiedAt = new Date()

    data.posts.updateOne(post => post.id = postId, foundPost)
}
