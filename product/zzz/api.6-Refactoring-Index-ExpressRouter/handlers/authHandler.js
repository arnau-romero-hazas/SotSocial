import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

export const authHandler = (req, res , next) => {
    try{
        const { authorization } = req.headers
        const token = authorization.slice(7) // Extraemos el token quitando "Bearer "
        const { sub: userId } = jwt.verify(token, JWT_SECRET) // Verificamos el token y extraemos el userId

        req.userId = userId 

        next()
    }catch(error){
        next(error)
    }
}