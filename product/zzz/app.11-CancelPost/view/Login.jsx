import logic from '../logic.js'
function Login({ onRegisterClick, onLoginSubmit }){
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
    
    // Chivato para saber que montamos login
    console.debug('login -> render')
    
    
    
    /*Creo el div
    Dentro monto el logo
    monto un form, dentro:
    {
    Etiqueta username
    Input typo texto para el username
    Etiqueta password
    Input typo texto para el password
    Boton tipo Submit para enviar los datos
    }

    Creo anchor con onClick=(addClickListener), le asigno el argumento onRegisterClick,
    este anchor llevara a la pagina de Register
    */
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

export default Login