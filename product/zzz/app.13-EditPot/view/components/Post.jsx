const { useState } = React
import logic from '../../logic.js'

function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited}){
    const [view, setView] = useState('')
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

    const handleEditPost= () => setView('edit-post')

    const handleEditTextClick = () => setView('edit-text')

    const handleEditTextCancelClick = () => setView('')

    const handleEditTextSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event
            const { text: { value: text } } = form

            logic.updatePostText(post.id, text)

            onPostTextEdited()

            setView('')
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
    console.debug('Post -> render')

    return <article className="post">
        <div className='headerPost'>
        <h3>{post.author.username} </h3>

            {post.own && view === '' && <button className= 'buttonConfig' onClick={handleEditPost}>⚙️</button>}

            {view === 'edit-post' && <div>
            {post.own && <button className= 'buttonDelete' onClick={handleDeleteClick}>❌</button>}
            {post.own && <button className= 'buttonEdit' onClick={handleEditTextClick}>✏️</button>}
            </div>}
        </div>
        <img src={post.image}/>

        

        {view === 'edit-text' && <form onSubmit={handleEditTextSubmit}>
            <label htmlFor="text">Text</label>
            <input type="text" id="text" defaultValue={post.text} />

            <button type="button" className="secondary" onClick={handleEditTextCancelClick}>Cancel</button>
            <button type="submit">Save</button>
        </form>}

        <p>{post.text}</p>
        
        <div className="post-footer">
            <time>{post.createdAt.toISOString()}</time>

            <button onClick={() => handleToggleLikePostClick(post.id)} > {`${post.liked ? '❤️':'🤍'} (${post.likesCount})`}</button>


        </div>

        </article>

}

export default Post