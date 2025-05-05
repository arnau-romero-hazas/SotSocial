import { extractPayloadFromJWT } from '../util'

export const getUserId = () => {
    if (!sessionStorage.token) return null

    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return userId
}