import {data} from "../data/index.js";
import { validate, errors } from 'com'

const { SystemError } = errors

export const deleteComment = (postId, commentId) => {
     validate.id(postId, 'postId')
     validate.id(commentId, 'commentId')

    
    const { token } = data
    return fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
        if (response.status === 204)
            return

        return response.json()
            .catch(error => { throw new SystemError(error.message) })
            .then(body => {
                const { error, message } = body
                throw new errors[error](message)
            })
    })
}
