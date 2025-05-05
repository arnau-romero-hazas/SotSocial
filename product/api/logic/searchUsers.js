import { User } from '../data/index.js' // Importamos el modelo de Usuario

export const searchUsers = (query) => {
    // Buscamos usuarios cuyo 'username' contenga el texto introducido en el query

    return User.find({ username: { $regex: query, $options: 'i' } }) // 'i' para que sea insensible a mayúsculas/minúsculas
        .select('username') // Solo seleccionamos el campo 'username'
        .lean() // Para devolver un objeto simple (sin métodos de Mongoose)
        .then(users => {
            if (users.length === 0) {
                throw new NotFoundError('No users found')
            }
            return users // Devolvemos los usuarios encontrados
        })
};

/*
Ahora vamos a agregar la lógica para realizar la búsqueda de usuarios. Esta lógica consultará la base de datos y buscará coincidencias con el username.
En esta función searchUsers, estamos utilizando una búsqueda con expresión regular ($regex) para hacer una búsqueda insensible a mayúsculas/minúsculas. 
Esto permitirá sugerir nombres de usuarios que coincidan con el query introducido.
*/