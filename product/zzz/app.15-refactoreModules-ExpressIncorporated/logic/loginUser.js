import { data } from "../data/index"
import { validate } from "./validate"

import { CredentialsError } from "../errors"


export const loginUser = (username, password) =>{
    validate.username(username, 'username') // validamos username
    validate.password(password, 'password') // validamos password

    const found = data.users.findOne(user => user.username === username)

    if (!found || found.password !== password) throw new CredentialsError('Wrong credentials')
    data.userId = found.id
}