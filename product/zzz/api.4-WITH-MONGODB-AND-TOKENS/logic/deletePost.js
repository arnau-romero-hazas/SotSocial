import { data } from '../data/index.js'
import { validate, errors } from 'com'

const { ObjectId } = data
const { SystemError, NotFoundError, OwnershipError } = errors

export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    // Buscamos al usuario
    return data.users.findOne({ _id: new ObjectId(userId)})
        .catch(error => { throw new SystemError(error.message)})
        .then(user=> {
            if(!user) throw new NotFoundError('user not found')
            // Buscamos el post
            return data.posts.findOne({ _id: new ObjectId(postId)})
                .catch(error => { throw new SystemError(error.message)})
                .then(post=> {
                        if(!post) throw new NotFoundError('post not found')
                    
                        if(post.author.toString() !== userId) throw new OwnershipError('user is not author of post')
                    
                        return data.posts.deleteOne({ _id: new ObjectId(postId)})
                            .catch(error => { throw new SystemError(message.error)})
                })
                .then(() => { })
        })
}