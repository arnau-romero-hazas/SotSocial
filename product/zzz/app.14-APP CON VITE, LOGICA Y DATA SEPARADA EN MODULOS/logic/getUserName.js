import { data } from "../data/index";
import { NotFoundError } from "../errors";

export const getUserName = () => {
    const users =  data.users.getAll()

    const {userId} = data // const users = data.users

    //LLamamos a funcion para buscar Id
    const found = data.users.getById(userId)
    //Si no esta lanzamos error
    if (!found) throw new NotFoundError(' user not found ')
    //Si esta retornamos el nombre
    return found.name
}