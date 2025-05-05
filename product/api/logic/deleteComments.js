import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, SystemError, OwnershipError } = errors

export const deleteComments = (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    return Promise.all([User.findById(userId).lean(), Post.findById(postId)])

        .catch((error) => { throw new SystemError(error.message) })

        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const comment = post.comments.id(commentId)

            if (!comment) throw new NotFoundError('comment not found')

            if (!comment.author.equals(userId))
                throw new OwnershipError('You are not the owner of this comment')

            comment.deleteOne({ _id: commentId })

            return post.save().catch((error) => {
                throw new SystemError(error.message)
            })
        })
        .then(_ => { })
}