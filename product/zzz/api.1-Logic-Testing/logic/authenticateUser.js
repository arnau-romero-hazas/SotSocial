import { errors, validate } from 'com'
// Importamos data
import { validate } from './validate.js' // Importamos validaciones

import { CredentialsError, NotFoundError} from '../errors.js' // Importamos CredentialsError y NotFoundError

// Función de autenticación que verifica el usuario y contraseña
export const authenticateUser = (username, password) => {
    validate.username = (username, 'username') // Validamos nombre de usuario usando su método de validación
    validate.password = (password, 'password') // Validamos contraseña

    const found = data.users.findOne(user => user.username === username) // Buscamos en data.users si se encuentra el username del usuario introducido.

    if (!found) throw new NotFoundError('User does not exist')  // Si no se encuentra lanzamos error

    if (found.password !== password) throw new CredentialsError('Passwords do not match') // Comprobamos si la contraseña de este usuario coincide con la contraseña introducida, si no coincide lanzamos error.

    return found.id // Si todo va bien retornamos su id a la funcion.
}