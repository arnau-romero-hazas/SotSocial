// Importa el módulo 'data', que parece contener información o usuarios almacenados.
import { data } from '../data/index'

// Importa el módulo de validación para verificar las credenciales de entrada.
import { validate } from './validate'

// Importa dos clases de error personalizadas para manejar casos específicos.
import { CredentialsError, NotFoundError } from '../errors'

// Declara una función de autenticación que verifica el usuario y contraseña dados.
export const authenticateUser = (username, password) => {
    // Valida el nombre de usuario usando un método de validación definido en 'validate'.
    validate.username = (username, 'username')

    // Valida la contraseña usando un método de validación definido en 'validate'.
    validate.password = (password, 'password')

    // Busca al usuario en la colección de datos por su nombre de usuario.
    const found = data.users.findOne(user => user.username === username)

    // Si no se encuentra el usuario, lanza un error indicando que no existe.
    if (!found) throw new NotFoundError('User does not exist')

    // Si la contraseña no coincide con la registrada, lanza un error de credenciales.
    if (found.password !== password) throw new CredentialsError('Passwords do not match')

    // Si todo es correcto, retorna el identificador único del usuario autenticado.
    return found.id
}
