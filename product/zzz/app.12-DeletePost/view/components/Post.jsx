import logic from '../../logic.js'

function Post({ post, onPostLikeToggled, onPostDeleted}){
    const handleToggleLikePostClick = () => {
        try {
            logic.toggleLikePost(post.id)

            onPostLikeToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteClick = () => {
        if(confirm('Delete post?'))
            try {
                logic.deletePost(post.id)

                onPostDeleted()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    console.debug('Post -> render')

    return <article className="post">
        <div className='headerPost'>
        <h3>{post.author.username} </h3>

            {post.own && <button className= 'buttonCancel'onClick={handleDeleteClick}>❌</button>}
        </div>
        <img src={post.image}/>

        <p>{post.text}</p>
        
        <div className="post-footer">
            <time>{post.createdAt.toISOString()}</time>

            <button onClick={() => handleToggleLikePostClick(post.id)} > {`${post.liked ? '❤️':'🤍'} (${post.likesCount})`}</button>
        </div>

        </article>

}

export default Post