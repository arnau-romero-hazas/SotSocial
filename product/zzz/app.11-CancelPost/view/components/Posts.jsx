const { useState, useEffect} = React 

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

    const handleToggleLikePostClick = postId => {
        try {
            logic.toggleLikePost(postId)

            const posts = logic.getPosts()

            setPosts(posts)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('Posts -> render')
    return <section>
    {posts.map(post => 
        <article className="post">
             <h3> {post.author.username} </h3>

            <img src = {post.image} />
            <p>{post.text}</p>
            <div className="post-footer">
            <time>{post.createdAt.toISOString()}</time>

            <button onClick={() => handleToggleLikePostClick(post.id)} > {`${post.liked ? '❤️':'🤍'} (${post.likesCount})`}</button>
            </div>
        </article>)}
                
    </section>
}

export default Posts