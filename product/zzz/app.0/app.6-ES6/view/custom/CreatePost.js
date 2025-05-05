class CreatePost extends Section{
    constructor(){
        super()
        const form = new Form()
        form.addSubmitListener(function(event){
            event.preventDefault()
            try{
                // recogemos datos del formulario
                const image = imageInput.getValue()
                const text = textInput.getValue()

                
                logic.createPost(image, text)
                form.clear()

                this.createPostSumbitListener()
            }catch(error){
                console.log(error)
                alert(error.message)
            }
            }.bind(this))
            this.add(form)

            const imageLabel = new Label()
            imageLabel.setText('Image')
            form.add(imageLabel)

            const imageInput = new Input()
            imageInput.setType('url')
            form.add(imageInput)

            const textLabel = new Label()
            textLabel.setText('text')
            form.add(textLabel)

            const textInput = new Input()
            textInput.setType('text')
            form.add(textInput)

            const submitButton = new Button()
            submitButton.setText('Create')
            submitButton.setType('submit')
            form.add(submitButton)
            
            const cancelAnchor = new Anchor()
            cancelAnchor.setText('Cancel')
            cancelAnchor.addClickListener(function () {
                form.clear()

                this.cancelClickListener()
            }.bind(this))
            this.add(cancelAnchor)
        }

        addCreatePostSubmitListener(listener){
            this.createPostSumbitListener = listener
        }

        addCancelClickListener(listener){
            this.cancelClickListener = listener
        }
    }