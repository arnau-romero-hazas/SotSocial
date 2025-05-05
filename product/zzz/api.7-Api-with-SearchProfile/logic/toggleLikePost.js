import { User, Post} from '../data/index.js'
import { validate, errors } from "com";

const { NotFoundError,  SystemError} = errors

export const toggleLikePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    
    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId).lean()
    ])
        .catch(error => {throw new NotFoundError(error.message)} )
        .then(([user , post]) => { 
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')
                       
            const { likes } = post // const likes = post.likes
                            
            const index = likes.findIndex(userObjectId => userObjectId.toString() === userId)

            if (index < 0)
                likes.push(userId)
            else
                likes.splice(index, 1)           
            return Post.updateOne({ _id : postId}, { $set: { likes } })
                .catch(error => { throw new SystemError(error.message)})
                .then(() => {})
        })
}
