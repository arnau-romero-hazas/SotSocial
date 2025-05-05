import { useState, useEffect } from "react";
import { logic } from "../../logic/index.js";
import { toast } from "react-hot-toast";
import { addComment } from "../../logic/addAComment.js";
import { deleteComment } from "../../logic/deleteComments.js"
import { getComments } from "../../logic/getComments.js"

import { showConfirmToast } from "./ConfirmToast.jsx";
import { useNavigate } from "react-router";

export function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const [view, setView] = useState("")
    const [comments, setComments] = useState([]) // Estado para almacenar los comentarios
    const [comment, setComment] = useState("") // Estado para el input del comentario
    const [showComments, setShowComments] = useState(false)

    const navigate = useNavigate()

    const userId = logic.getUserId()

    //  Formatear comentarios y marcar los tuyos como propios
    const formatComments = (comments) => (
        comments.map(comment => ({  // Recorremos cada comentario recibido con un map
            ...comment,             // Copiamos todas las propiedades originales del comentario
            own: comment.author.id === userId // Añadimos una nueva propiedad: own = true si el id del autor coincide con el del usuario logueado
        }))
    )

    // Obtener comentarios cuando se monta el componente
    useEffect(() => {
        getComments(post.id) // Llamamos a la api para obtener todos loc omentarios
            .then(fetchedComments => setComments(formatComments(fetchedComments))) // Los formateamos con formatComments y los guardamos en el estado
            .catch(error => toast.error(`❌ ${error.message}`))
    }, [post.id])  // Solo se ejecuta cuando cambia post.id (es decir, cuando se carga un nuevo post)

    const handleToggleLikeClick = () => {
        logic.toggleLikePost(post.id)
            .then(() => onPostLikeToggled())
            .catch(error => toast.error(`❌ ${error.message}`))
    }

    const handleDeleteClick = () => {
        showConfirmToast("¿Eliminar este post?", () => {
            logic.deletePost(post.id)
                .then(() => onPostDeleted())
                .catch(error => toast.error(`❌ ${error.message}`))
        })
    }

    const handleEditTextSubmit = (event) => {
        event.preventDefault()
        const { text } = event.target

        logic.updatePostText(post.id, text.value)
            .then(() => {
                onPostTextEdited()
                setView("")
                toast.success(`Texto editado con éxito!`)
            })
            .catch(error => toast.error(`❌ ${error.message}`))
    }

    const handleUsernameClick = () => navigate(`/${post.author.username}`, { state: { userId: post.author.id } })

    const handleCommentSubmit = (event) => {
        event.preventDefault()
        if (!comment.trim()) return toast.error("❌ No puedes enviar un comentario vacío.") // Si el comentario está vacio o solo con espacios enviamos error

        addComment(userId, post.id, comment) // Llamamos a la API para añadir el comentario a la base de datos
            .then(() => {
                setComment("")               // Vaciamos el input del comentario para que esté limpio tras enviar

                return getComments(post.id) /// Llamamos otra vez a la API para obtener los comentarios actualizados
            })
            .then(updatedComments => setComments(formatComments(updatedComments))) //  Aplicamos formatComments y guardamos en el estado (volver a marcarlos con el own)
            .catch(error => toast.error(error.message))
    }

    const handleDeleteComment = (commentId) => {
        deleteComment(post.id, commentId) // Llamamos a la logica para borrar el comentario con su iD
            .then(() => {
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId)) // Quitas ese comentario del array actual en memoria, así no hace falta recargar todos.
                toast.success("🗑️ Comentario eliminado!")
            })
            .catch(error => toast.error(`❌ ${error.message}`))
    }


    return (
        <article className="post">
            <div className="headerPost">
                <h3 className="profileUserClick" onClick={handleUsernameClick}>{post.author.username} </h3>
                {post.own && view === "" && (
                    <button className="buttonConfig" onClick={() => setView("edit-post")}>⚙️</button>
                )}
                {view === "edit-post" && (
                    <div>
                        {post.own && <button className="buttonDelete" onClick={handleDeleteClick}>🗑️</button>}
                        {post.own && <button className="buttonEdit" onClick={() => setView("edit-text")}>✏️</button>}
                    </div>
                )}
            </div>
            <img src={post.image} alt="Post" />

            {view === "edit-text" && (
                <form onSubmit={handleEditTextSubmit}>
                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" defaultValue={post.text} />
                    <button type="button" className="secondary" onClick={() => setView("")}>Cancelar</button>
                    <button type="submit">Guardar</button>
                </form>
            )}

            <p>{post.text}</p>

            <div className="post-footer">
                <time className="post-date">
                    {new Date(post.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </time>
                <span className="showComments" onClick={() => setShowComments(prev => !prev)}>
                💬 ({comments.length})
                 </span>


                
                <button onClick={handleToggleLikeClick}>{`${post.liked ? "❤️" : "🤍"} (${post.likesCount})`}</button>
            </div>

            {showComments && (
                <div className="comentBox">
                <form onSubmit={handleCommentSubmit}>
                <textarea
                    name="comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            <button type="submit">Submit</button>
            </form>
            </div>
        )}

        {showComments && (
            <div className="commentsList">
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                    <p><strong>{comment.own ? "Tú" : comment.author.username}</strong>: {comment.text}</p>
                    {comment.own && (<button className="delete-comment" onClick={() => handleDeleteComment(comment.id)}>🗑️</button>)}
                    </div>
                 ))}
        </div>
)}

        </article>
)
}
