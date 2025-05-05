import { data } from "../data/index.js";
import { validate, errors } from "com"


const { ObjectId } = data
const {SystemError,  NotFoundError, OwnershipError } = errors

export const updatePostText = (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text, 'text')

    const postObjectid = new ObjectId(postId)
    return data.posts.findOne({ _id: postObjectid})
        .catch(error => {throw new SystemError(error.message) })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')  
            const authorObjectId = new ObjectId(post.author)
            if (authorObjectId.toString() !== userId) throw new OwnershipError('user is not author of post')

            return data.posts.updateOne({ _id: postObjectid}, { $set: { text :text , modifiedAt : new Date() }, })
                .catch(error => { throw new SystemError})
                .then(() => {})
        })
}
