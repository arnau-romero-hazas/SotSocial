import { constant } from './constant.js';

import { ValidationError } from './errors.js';

export const validate = {

    string(string, explain) {
        if (typeof string != 'string') throw new ValidationError(`invalid ${explain} type`) // Si el tipo de dato no es un string enviamos un error
    },
    text(text, explain = 'text') {
        this.string(text, explain) // Traemos la funcion de arriba
        //Accedemos a la reGex para verificar que en el text, no haya espacios en blanco o no hayan escrito nada.
        if (constant.EMPTY_OR_BLANK_REGEX.test(text)) throw new ValidationError(`invalid ${explain} type`)
    },
    name(name,  explain = 'name'){
        this.text(name, explain)
        if(!constant.NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain} type`)
    },
    email(email, explain = 'email') {
        this.string(email, explain) //llamamos a la funcion string pasandole los parametros introducidos para comprobar que es una string
        if (!constant.EMAIL_REGEX.test(email)) throw new ValidationError(`invalid ${explain} type`) // Comprobamos que el email coincida con la reGex que verifica mail
        this.maxLength(email, 30, explain) // Llamamos a la funcion maxLength para comprobar que el email no supere 30 caracteres
    },
    maxLength(value, maxLength, explain) { // Funcion para comprobar que no sobrepase el maximo de caracteres
        if (value.length > maxLength) throw new ValidationError(` invalid ${explain} value`)
    },
    minLength(value, minLength, explain) { // Funcion para comprobar que sobrepase el mínimo de caracteres
        if (value.length < minLength) throw new ValidationError(` invalid ${explain} value`)
    },
    username(username, explain = 'username') {
        this.string(username, explain) // Funcion para comprobar que es una string
        this.maxLength(username, 20, explain) // Llamamos funcion para comprobar que no sobrepasemos límite de caracteres.
        this.minLength(username, 1, explain) // Llamamos funcion para comprobar el límite de caracteres.
        if(!constant.USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    password(password, explain = 'password') {
        this.string(password, explain) // Funcion para comprobar que es una string
        this.maxLength(password, 20, explain) // Llamamos funcion para comprobar que no sobrepasemos límite de caracteres.
        this.minLength(password, 8, explain) // Llamamos funcion para comprobar el límite de caracteres.
    },
    url(url, explain = 'url') {
        this.string(url, explain)
        if (!constant.URL_REGEX.test(url)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    id(id, explain) {
        this.text(id, explain)
        if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
    }
}