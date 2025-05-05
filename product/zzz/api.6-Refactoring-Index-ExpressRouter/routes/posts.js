import { logic } from '../logic/index.js';
import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'
import { Router } from 'express'

export const posts = Router()

    // Endpoint para crear un post     
 posts.post('/',authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    
    const { image, text} = req.body
    return logic.createPost(userId, image, text)
        .then(() => res.status(201).send())
}))

// Endpoint para obtener los post del usuario autenticado
posts.get('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getPosts(userId)
        .then(posts => res.json(posts))
}))

// Endpoint para eliminar un post
posts.delete('/:postId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { postId } = req.params
    
    return logic.deletePost(userId, postId)
        .then(() => res.status(204).send())
}))

// Endpoint para dar like
posts.patch('/:postId/likes', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { postId } = req.params

    return logic.toggleLikePost(userId, postId)
        .then(() => res.status(204).send())
}))

// Endpoint para dar o quitar like a un post
posts.patch('/:postId/text', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { postId } = req.params
    const { text } = req.body
    return logic.updatePostText(userId, postId, text)
        .then(() => res.status(204).send())
}))

