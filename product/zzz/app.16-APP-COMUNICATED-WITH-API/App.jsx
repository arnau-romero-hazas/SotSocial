import { useState, useEffect } from 'react'

import { Landing } from './view/Landing.jsx'
import { Register } from './view/Register.jsx'
import { Login } from './view/Login.jsx'
import { Home } from './view/Home/index.jsx'

import { logic } from './logic/index.js'

import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify' // Importamos Toastify
import 'react-toastify/dist/ReactToastify.css' // Importamos los estilos

function App(){
    // Estado inicial del useState en landing.
    const [view, setView] = useState('landing')

    // useEffect para que, si el usuario está logueado, lo mantenga en Home al refrescar la página.
    useEffect(() => {
        try {
            // Llamamos a la función que nos dice si el usuario está logueado
            const loggedIn = logic.isUserLoggedIn()

            // Si está logueado, montamos la vista Home
            if (loggedIn) setView('home')
        } catch (error) {
            console.error(error)
            toast.error(`❌ ${error.message}`) // Mostramos el error con Toastify en lugar de alert()
        }
    }, []) 






    // Manejo de navegación entre vistas
    const handleRegisterClick = () => setView('register')
    const handleLoginClick = () => setView('login')
    const handleRegisterSubmit = () => setView('login')
    const handleLoginSubmit = () => setView('home')
    const handleLogoutClick = () => setView('login')

    console.debug('App -> render')

    return (
        <>
            {/* ToastContainer para gestionar las notificaciones */}
            <ToastContainer position="top-right" autoClose={2000} />
            <Toaster /> {/* Esto habilita los toasts en toda la app */}

            {view === 'landing' && <Landing onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />}
            {view === 'register' && <Register onLoginClick={handleLoginClick} onRegisterSubmit={handleRegisterSubmit} />}
            {view === 'login' && <Login onRegisterClick={handleRegisterClick} onLoginSubmit={handleLoginSubmit} />}
            {view === 'home' && <Home onLogoutClick={handleLogoutClick} />}
        </>
    )
}

export default App