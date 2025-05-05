import { useState, useEffect} from 'react'

import  { Post } from './Post.jsx'

import  { logic } from '../../logic/index.js'

import { toast } from 'react-toastify' // Importamos react-toastify
import 'react-toastify/dist/ReactToastify.css' // Importamos los estilos

export function Posts({targetUserId}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
       console.debug('Post -> useEffect')

        loadPosts()
    }, [])


    const loadPosts = () => {
        try {
            (targetUserId ? logic.getUserPosts(targetUserId) : logic.getPosts())
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
    const handlePostLikeToggled = () => loadPosts()
   
    const handlePostDeleted = () => loadPosts()

    const handlePostTextEdited = () => loadPosts()


    console.debug('Posts -> render')


    return <section>
    {posts.map(post =><Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} onPostTextEdited={handlePostTextEdited} />)}           
    </section>
}
