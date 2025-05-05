import { data } from '../data/index'

export const logoutUser = () => {
    // Poner el userId a null cuando hagamos logOut
    data.userId = null
}