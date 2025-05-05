    // Importamos el módulo de manejo de errores (parece que "com" no es un módulo válido, ¿quizás es un error tipográfico?)
import { errors } from 'com';
import jwt from 'jsonwebtoken'
        
// Extraemos clases de error personalizadas desde el módulo de errores
const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError, AuthorizationError } = errors;
const { JsonWebTokenError, TokenExpiredError } = jwt

        // Middleware para manejar errores
 export const errorHandler = (error, req, res, next) => {
    console.error(error)
    let status = 500
    let errorName = SystemError.name
    let { message} = error
    
    if (error instanceof DuplicityError) {
        status = 409;
        errorName = error.constructor.name;
    } else if (error instanceof ValidationError) {
        status = 400;
        errorName = error.constructor.name;
    } else if (error instanceof CredentialsError) {
        status = 401;
        errorName = error.constructor.name;
    } else if (error instanceof NotFoundError) {
        status = 404;
        errorName = error.constructor.name;
    } else if (error instanceof OwnershipError) {
        status = 403;
        errorName = error.constructor.name;
    }else if (error instanceof TokenExpiredError) {
        status = 401
        errorName = AuthorizationError.name
        message = 'expired JWT'
    } else if (error instanceof JsonWebTokenError) {
        status = 401
        errorName = AuthorizationError.name
        message = 'invalid JWT'
    }

    res.status(status).json({ error: errorName, message});
 }