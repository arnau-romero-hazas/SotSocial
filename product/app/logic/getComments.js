import { data } from '../data/index'
import { errors, validate } from 'com'

const { SystemError } = errors

export const getComments = (postId) => {
    validate.id(postId, 'postId')
    

    return fetch(`http://localhost:8080/posts/${postId}/comments`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${data.token}`,
            'Content-Type': 'application/json',
        }
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
        if (response.status === 200)
            return response.json()

        return response.json()
            .catch(error => { throw new SystemError(error.message) })
            .then(body => {
                const { error, message } = body
                
                throw new SystemError(message)
            })
    })
}
