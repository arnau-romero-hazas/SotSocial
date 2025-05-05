import { data } from "../data/index.js";

import { validate, errors } from "com";

const { SystemError } = errors 

export const getUserName = () => {

    const {userId} = data // const users = data.users
    console.log("userId:", userId);
    return fetch('http://localhost:8080/users/self/name',{
        method: 'GET',
        headers: {
            Authorization: `Basic ${userId}`
        }
    })
        .catch(error => { throw new Error(error.message) })
        .then(response => {
            console.log(response.status)

            if(response.status === 200)
                return response.json()
                    .catch(error => { throw new Error(error.message) })
                    .then(body => {
                        const { name } = body

                        return name
                    })
            return response.json()
                .catch(error => { throw new Error(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}