import { User, Post } from "../data/index.js"
import { validate, errors } from 'com'
import { SystemError } from "com/errors.js"

const { NotFoundError } = errors

export const getUserPosts = (userId, targetUserId) => { // Crear funcion para obtener los posts de data, la llamaremos desde main
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return Promise.all([ // Usar Promise.all para ejecutar ambas consultas a la base de datos en paralelo
        User.findById(userId).lean(), // Usamos Promise.all para ejecutar ambas consultas a la base de datos en paralelo
        User.findById(targetUserId).lean(), // Buscamos que el targetUserId exista en la base de datos
        Post.find({ author: targetUserId }) // Buscamos los posts del targetUserId
            .select('-__v') // Excluimos el campo __v, que es un metadato de Mongoose
            .sort('-createdAt') // Ordenamos los posts en orden descendente por fecha de creación
            .populate('author', 'username') // Rellenamos el campo author con el username del usuario
            .lean() // Convertimos el resultado a un objeto plano
    ])
        .catch(error => { throw new SystemError(error.message)})
        .then(([user, targetUser, posts]) => { // Procesamos los resultados de la promesas
            if (!user) throw new NotFoundError('User not found')
            if (!targetUser) throw new NotFoundError('targetUser not found')

            posts.forEach(post => { // Iteramos sobre cada post para hacer algunas modificaciones.
                post.id = post._id.toString() // Convertimos _id a un string y lo asignamos a id
                delete post._id // Eliminamos _id del objeto

                if (post.author._id){   // Si el post tiene el author con _id
                    post.author.id = post.author._id.toString() // Lo convertimso a string y lo asignamos a id
                    delete post.author._id // Eliminamos _id
                }

                post.liked = post.likes.some(userObjectId => userObjectId.toString() === userId) // Com el metodo some, verificamos si el usuario actual le ha dado like al post.
                post.likesCount = post.likes.length // Contamos el numero total de like mediante la propiedad length
                delete post.likes // Eliminamos el array de likes del post para reducir la carga de datos, ya que nos quedaremos con likesCount

                post.own = post.author.id === userId // Verificamos si el post pertenece al usario actual, si lo es ponemos a true post.own
            })

            return posts // Retornamos la lista de posts ya procesados.
        })
}