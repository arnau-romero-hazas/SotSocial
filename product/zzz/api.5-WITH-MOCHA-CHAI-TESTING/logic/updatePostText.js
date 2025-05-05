import { data } from "../data/index.js";
import { validate, errors } from "com"


const { ObjectId } = data
const {SystemError,  NotFoundError, OwnershipError } = errors

export const updatePostText = (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text,)

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([User, Post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            if (post.author.toString() !== userId ) throw new OwnershipError('user is not author of post')
            
            return Post.updateOne({ _id: postId }, {
                $set: {
                    text,
                    modifiedAt: new Date
                }
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}
