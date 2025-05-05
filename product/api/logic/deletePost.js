import { User, Post } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    // Camino optimista, comprobamos al mismo tiempo que el usuario existe y que es el propietario del post
    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId).lean()
    ])
        .catch(error => { throw new SystemError(error.message)})
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            if(post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

            return Post.deleteOne({ _id: postId})
                .catch(error => { throw new SystemError(error.message)})
        })
        .then(() => { })








    // Camino pesimista, si el usuario existe ira luego a comprobar que sea el propietario del Post
    /* return User.findById(userId)
        .catch(error => { throw new SystemError(error.message)})
        .then(user=> {
            if(!user) throw new NotFoundError('user not found')
            // Buscamos el post
            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message)})
                .then(post=> {
                        if(!post) throw new NotFoundError('post not found')
                    
                        if(post.author.toString() !== userId) throw new OwnershipError('user is not author of post')
                    
                        return Post.deleteOne(postId)
                            .catch(error => { throw new SystemError(message.error)})
                })
                .then(() => { })
        })
        */
}