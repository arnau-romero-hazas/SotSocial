import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { logic } from '../../logic/index.js'

export function CreatePost({ onPostCreateSubmit, onCancelClick }) {
    const handleCreatePostSubmit = event => {
        event.preventDefault()

        try {
            const { target: form } = event
            const { image: { value: image }, text: { value: text } } = form

            logic.createPost(image, text)
                .then(() =>{ 
                    onPostCreateSubmit() 
                    form.reset()
                    toast.success('✅ Post creado con éxito!')
                })
            
                .catch(error => {
                    console.error(error)

                    toast.error(`❌ Error: ${error.message}`)
                })

          

        } catch (error) {
            console.error(error)
            toast.error(`❌ Error: ${error.message}`)
        }
    }

    const handleCancelClick = () => onCancelClick()

    console.debug('CreatePost -> render')

    return (
        <section>
            <form onSubmit={handleCreatePostSubmit}>
                <label htmlFor="image">Image</label>
                <input type="url" id="image" required />

                <label htmlFor="text">Text</label>
                <input type="text" id="text" required />

                <button type="submit">Create</button>
            </form>

            <a onClick={handleCancelClick}>Cancel</a>
        </section>
    )
}
