import { data } from '../data/index.js'
import { validate, errors } from 'com'

const { NotFoundError, OwnershipError } = errors

export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const foundPost = data.posts.findOne(post => post.id === postId)

    if(!foundPost) throw new NotFoundError('post not found')

    if(foundPost.author !== userId) throw new OwnershipError('user is not author of post')

    data.posts.deleteOne(post => post.id === postId)
}