import { data } from "../data/index.js";
import { validate } from './validate.js'

import { NotFoundError } from "../errors.js";

export const getUserName = userId => {
    validate.id(userId, 'userId')
    //LLamamos a funcion para buscar Id
    const found = data.users.getById(userId)
    //Si no esta lanzamos error
    if (!found) throw new NotFoundError(' user not found ')
    //Si esta retornamos el nombre
    return found.name
}