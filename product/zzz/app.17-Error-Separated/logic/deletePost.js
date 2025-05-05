import {data} from "../data/index.js";
import { validate, errors } from 'com'

const { SystemError } = errors

export const deletePost = postId => {
   validate.id(postId, 'postId')

    const { userId } = data

    return fetch(`http://localhost:8080/posts/${postId}`,{
        method: 'DELETE',
        headers:{
            Authorization:`Basic ${userId}`
        }
    })
        .catch(error => {throw new Error(error.message)})
        .then(response => {
            console.log(response.status)

            if (response.status === 204)
                return
            return response.json()
                .catch(error => {throw new Error(error.message)})
                .then(body => {
                    const {error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}