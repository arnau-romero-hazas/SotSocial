import {logic} from '../logic/index'

export function Login({ onRegisterClick, onLoginSubmit }){
    // creo el submit para el login
    const handleLoginSubmit = event =>{
        event.preventDefault()

        try{
            // * Estas variables estan creadeas de manera desestructurizada, habria que revisar bien este concepto.
            // * Creo el form
            const {target: form} = event

            // variables para el form
            const {
                username: {value: username},
                password: {value: password}
            } = form
            // llamo a la logica login user 
            logic.loginUser(username, password)
            // reseteo el form
            form.reset()
            //llamo a la funcion onLoginSubmit(listener)
            onLoginSubmit()
        }catch(error){
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('login -> render')

    return <div> 
        <h1>Login</h1>
        <form onSubmit = {handleLoginSubmit}>
            <label htmlFor = "username">Username</label>
            <input type="text" id = "username" placeholder="your username..."/>

            <label htmlFor = "password">Password</label>
            <input type="password" id="password" placeholder="your password..."/>

            <button type="submit">Login</button>
        </form>

        <a onClick={onRegisterClick}>Register</a>
    </div>
}