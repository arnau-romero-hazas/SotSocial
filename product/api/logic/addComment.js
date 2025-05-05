import { User, Post, Comment } from '../data/index.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export const addComment = (userId, postId, text) => {
    validate.id(postId, 'postId');
    validate.id(userId, 'userId');
    validate.text(text);

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId)
    ])
    .then(([user, post]) => {
        if (!user) throw new NotFoundError('User not found');
        if (!post) throw new NotFoundError('Post not found');

        // Crear comentario y agregarlo al post
        const comment =({
            author: userId,
            text,
            createdAt: new Date() 
        })

        post.comments.push(comment);

        // Guardar post actualizado en la base de datos
        return post.save();
    })
    .then(updatedPost => {
        // Retornar el post actualizado con el nuevo comentario
        return { 
            message: 'Comment added successfully', 
            comment: updatedPost.comments[updatedPost.comments.length - 1] // Último comentario agregado
        };
    })
    .catch(error => {
        console.error(error);
        throw new SystemError(error.message);
    });
};


// export default (userId, postId, text) => {
//     validate.id(postId, 'postId')
//     validate.id(userId, 'userId')
//     validate.text(text)

//     return Promise.all([
//         User.findById(userId).lean(),
//         Post.findById(postId)
//     ])
//         .catch((error) => { throw new SystemError(error.message) })
//         .then(([user, post]) => {
//             if (!user) throw new NotFoundError('user not found')
//             if (!post) throw new NotFoundError('post not found')

//             const comment = ({
//                 author: userId,
//                 text
//             })

//             return Comment.create(comment)
//                 .catch(error => { throw new SystemError(error.message) })

//             return post.save().catch((error) => { throw new SystemError(error.message) })
//         })
//         .then(() => { })
// }

