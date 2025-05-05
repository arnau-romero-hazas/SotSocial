import { useState, useEffect } from 'react'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Home } from './view/Home/index'

import { logic } from './logic/index'

function App(){
    // Estado inicial del usestate en landing.
    const [view, setView] = useState('landing')
    //useEffect para que cuando estemos loggin nos mantenga en home al referescar la pagina
    useEffect(() => {
        try{
            //llamamos a la funcion que nos devuelve un true si el usuario esta loggeado
            const loggedIn = logic.isUserLoggedIn()

            // si esta loggeado montamos la view Index.
            loggedIn && setView('home')
        } catch(error){
            console.error(error)
            alert(error.message)
        }
    }, []) // Si ponemos el array vacio, haremos que este useEffect se revise cada vez que actualicemos pagina.
    // Si clickamos en el register anchor de landing cambiamos el setView a register.
    const handleRegisterClick = () => setView('register')
    // Si clickamos en el login anchor de landing cambiamos el setView a login.
    const handleLoginClick = () => setView('login')
    // Si clickamos en el boton register de login cambiamos el setView a login.
    const handleRegisterSubmit = () => setView('login')

    const handleLoginSubmit = () => setView('home')

    const handleLogoutClick = () => setView('login')

    console.debug('App -> render')

    return <>
        {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick}/>}

        {view === 'register' && <Register onLoginClick = {handleLoginClick} onRegisterSubmit = {handleRegisterSubmit}/>}

        {view === 'login' && <Login onRegisterClick= {handleRegisterClick} onLoginSubmit={handleLoginSubmit }/>}

        {view === 'home' && <Home onLogoutClick = {handleLogoutClick} />}
     
    </>
}

export default App