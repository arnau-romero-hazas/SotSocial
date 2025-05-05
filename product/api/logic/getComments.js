import { User, Post } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export const getComments = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([
        User.exists({ _id: userId }), // Verifica que el usuario existe, esto no devuelve el documento, solo true o false.
        Post.findById(postId).populate('comments.author', 'username').lean() // Buscamos el post por su Id, usamos populate para traer el nombre de usuario del autor de cada comentario, .lean para obtener un objeto de JavaScript plano
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([userExists, post]) => {
            if (!userExists) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            comments.forEach(comment => {
                comment.id = comment._id.toString()
                delete comment._id

                const { author } = comment

                if (author._id) {
                    author.id = author._id.toString()
                    delete author._id
                }

            })
            
            return comments
        })

}