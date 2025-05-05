const { useState, useEffect} = React 

import Post from './Post.jsx'

import logic from '../../logic.js'

function Posts() {
    const[posts, setPosts] = useState([])
    useEffect(() => {
        try{
            const posts = logic.getPosts()

            setPosts(posts)
        }catch(error){
            console.error(error)
    
            alert(error.message)
        }

    }, [])

    const handlePostLikeToggled = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            consoler.error(error)

            alert(error.message)
        }
    }
   
    const handlePostDeleted = () => {
        try {
            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
    console.debug('Posts -> render')

    return <section>
    {posts.map(post =><Post key={post.id} post={post} onPostLikeToggled={handlePostLikeToggled} onPostDeleted={handlePostDeleted} />)}           
    </section>
}

export default Posts