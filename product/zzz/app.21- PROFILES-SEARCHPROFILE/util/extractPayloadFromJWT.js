export const extractPayloadFromJWT = token => {
    const fromIndex = token.indexOf('.') + 1  // Encuentra el inicio del payload
    const toIndex = token.lastIndexOf('.')    // Encuentra el final del payload
    const payloadB64 = token.slice(fromIndex, toIndex)  // Extrae la parte del payload en Base64
    const payloadJSON = atob(payloadB64)   // Decodifica el Base64 a JSON
    const payload = JSON.parse(payloadJSON)  // Convierte la cadena JSON en un objeto JavaScript

    return payload  // Devuelve el payload como un objeto JavaScript
}