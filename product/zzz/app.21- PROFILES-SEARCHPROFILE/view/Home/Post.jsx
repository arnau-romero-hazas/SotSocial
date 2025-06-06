import { useState } from "react";
import { logic } from "../../logic/index.js";
import { toast } from "react-hot-toast";

import { showConfirmToast } from "./confirmToast.jsx";
import {useNavigate} from 'react-router'


export function Post({ post, onPostLikeToggled, onPostDeleted, onPostTextEdited }) {
    const [view, setView] = useState("");

    const navigate = useNavigate()

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    console.error(error);
                    toast.error(`❌ ${error.message}`);
                });
        } catch (error) {
            console.error(error);
            toast.error(`❌ ${error.message}`);
        }
    };

    const handleDeleteClick = () => {
        showConfirmToast("¿Eliminar este post?", () => {
            try {
                logic.deletePost(post.id)
                    .then(() => onPostDeleted())
                    .catch(error => {
                        console.error(error);
                        toast.error(`❌ ${error.message}`);
                    });
            } catch (error) {
                console.error(error);
                toast.error(`❌ ${error.message}`);
            }
        });
    };

    const handleEditPost = () => setView("edit-post");

    const handleEditTextClick = () => setView("edit-text");

    const handleEditTextCancelClick = () => setView("");

    const handleEditTextSubmit = (event) => {
        event.preventDefault();

        try {
            const { target: form } = event;
            const {
                text: { value: text },
            } = form;

            logic.updatePostText(post.id, text)
                .then(() => {
                    onPostTextEdited();
                    setView("");
                    toast.success(`Texto editado con éxito!`);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error(`❌ ${error.message}`);
                });
        } catch (error) {
            console.error(error);
            toast.error(`❌ ${error.message}`);
        }
    };

    const handleUsernameClick = () => navigate(`/${post.author.username}`, { state: { userId: post.author.id } });
    console.debug("Post -> render");

    return (
        <article className="post">
            <div className="headerPost">
                <h3 onClick={handleUsernameClick}>{post.author.username} </h3>

                {post.own && view === "" && (
                    <button className="buttonConfig" onClick={handleEditPost}>
                        ⚙️
                    </button>
                )}

                {view === "edit-post" && (
                    <div>
                        {post.own && (
                            <button className="buttonDelete" onClick={handleDeleteClick}>
                                ☠️
                            </button>
                        )}
                        {post.own && (
                            <button className="buttonEdit" onClick={handleEditTextClick}>
                                ✏️
                            </button>
                        )}
                    </div>
                )}
            </div>
            <img src={post.image} />

            {view === "edit-text" && (
                <form onSubmit={handleEditTextSubmit}>
                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" defaultValue={post.text} />

                    <button type="button" className="secondary" onClick={handleEditTextCancelClick}>
                        Cancelar
                    </button>
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

                <button onClick ={handleToggleLikeClick}>{`${post.liked ? "❤️" : "🤍"} (${post.likesCount})`}</button>
            </div>
        </article>
    );
}