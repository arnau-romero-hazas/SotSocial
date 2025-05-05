import { errors, validate } from 'com'  // Importamos data y validaciones
import { data } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { SystemError, NotFoundError, CredentialsError } = errors

// Función de autenticación que verifica el usuario y contraseña
export const authenticateUser = (username, password) => {
    validate.username = (username, 'username') // Validamos nombre de usuario usando su método de validación
    validate.password = (password, 'password') // Validamos contraseña

    return data.users.findOne({ username }) // Buscamos usuario en la base de datos por 'username'
        .catch(error => { throw new SystemError(error.message)}) // si hay un error en la base de datos lo capturamos 
                                                                    // Ojo este mensaje no es correcto, ya que lo que capturamos aqui es un error del servidor, no que falte el usuario.                           
        .then(user =>{ // Si no hay error en la consulta entramos en el then.                                  
            if(!user) throw new NotFoundError('user not found') // Si no encontramos al usuario lanzamos error 'user not found'

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message)})
                .then(match => {
                    if (!match) throw new CredentialsError('wrong credentials')

                    return user._id.toString()
                })
           
        })
}