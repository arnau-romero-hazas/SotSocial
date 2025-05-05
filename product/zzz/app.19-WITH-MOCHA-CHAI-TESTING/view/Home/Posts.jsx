import { useState, useEffect} from 'react'

import  { Post } from './Post.jsx'

import  { logic } from '../../logic/index.js'

import { toast } from 'react-toastify' // Importamos react-toastify
import 'react-toastify/dist/ReactToastify.css' // Importamos los estilos

export function Posts() {
    const[posts, setPosts] = useState([])
    useEffect(() => {
        try{
            logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)
                    toast.error(`❌ ${error.message}`)
                })
            setPosts(posts)
        }catch(error){
            console.error(error)
    
            toast.error(`❌ ${error.message}`)
        }

    }, [])

    const handlePostLikeToggled = () => {
        try {
            logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    consoler.error(error)

                    toast.error(`❌ ${error.message}`) 
                })

            setPosts(posts)
        } catch (error) {
            consoler.error(error)

            toast.error(`❌ ${error.message}`)
        }
    }
   
    const handlePostDeleted = () => {
        try {
            logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    toast.error(`❌ ${error.message}`)
                })

          
        } catch (error) {
            console.error(error)

            toast.error(`❌ ${error.message}`)
        }
    }

    const handlePostTextEdited = () => {
        try {
            logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    toast.error(`❌ ${error.message}`)
                })

        } catch (error) {
            console.error(error)

            toast.error(`❌ ${error.message}`)
        }
    }

    console.debug('Posts -> render')


    return <section>
    {posts.map(post =><Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onPostTextEdited={handlePostTextEdited} />)}           
    </section>
}
