import { User } from "../data/index.js";
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors

export const getUserName = userId => {
    validate.id(userId, 'userId')
    
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user.name
        })
}