import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Posts } from './Posts.jsx'
import { CreatePost } from './CreatePost.jsx'

import { logic } from '../../logic/index.js'

export function Home({ onLogoutClick}) {
    const[view, setView] = useState('posts')
    const[userName, setUserName] = useState('')

    // Funcion flecha para generar el saludo al entrar en home
    useEffect(() => {
        console.debug('Index -> useEffect')

        try{
           logic.getUserName()
                .then(name => setUserName(name))
                .catch(error => {
                    console.error(error)

                    toast.error(`❌ ${error.message}`)
                })
                
        }catch(error){
            console.error(error)

            toast.error(`❌ ${error.message}`)
        }
    }, [])

    // funcion para cuando le demos click a logout
    const handleLogoutClick = () => {
        try{
            logic.logoutUser()

            onLogoutClick()

            toast.success('Bye, See You soon!!')
        } catch(error) {
            console.error(error)

            toast.error(`❌ ${error.message}`)
        }
    }

    // Funcion cuando hagamos click en el boton de crear post.
    const handleAddPostClick = () => setView('create-post')

    // Funcion cuando hagamos submit en el form de create-post

   const handlePostCreateSubmit = () => setView('posts')
   
   const handleCancelClick = () => setView('posts')
    console.debug('Index -> render')

    return <div className='Home'>
        <header>
            <h1>HOME</h1>

            <h2>Hello, {userName}!</h2>

            <button type = "button" onClick={handleLogoutClick}>Logout</button>
        </header>
        
        <main>
            {view === 'posts' && <Posts />}

            {view === 'create-post' && <CreatePost onPostCreateSubmit = {handlePostCreateSubmit} onCancelClick={handleCancelClick}/>}
        </main>

    <footer>
        {view === 'posts' && <button onClick={handleAddPostClick}>ADD A POST !</button>}
    </footer>
    
    </div>     
}