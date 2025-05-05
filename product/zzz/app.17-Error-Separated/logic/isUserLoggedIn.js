import { data } from '../data/index.js'

// Funcion para revisar si el usuario esta loggeado
export const isUserLoggedIn = () =>{ return !!data.userId }