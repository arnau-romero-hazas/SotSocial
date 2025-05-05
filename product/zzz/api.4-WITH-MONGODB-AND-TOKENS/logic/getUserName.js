import { data } from "../data/index.js";
import { validate, errors } from 'com';

const { ObjectId } = data
const { SystemError, NotFoundError } = errors

export const getUserName = userId => {
    validate.id(userId, 'userId')
    
    return data.users.findOne({ _id: new ObjectId(userId)})
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user.name
        })
}