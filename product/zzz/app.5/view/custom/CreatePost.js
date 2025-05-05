function CreatePost(){
    Section.call(this)

    var form = new Form()
    form.addSubmitListener(function(event){
        event.preventDefault()
        try{
            // recogemos datos del formulario
            var image = imageInput.getValue()
            var text = textInput.getValue()

            
            logic.createPost(image, text)
            form.clear()

            this.createPostSumbitListener()
        }catch(error){
            console.log(error)
            alert(error.message)
        }
    }.bind(this))
    this.add(form)

    var imageLabel = new Label()
    imageLabel.setText('Image')
    form.add(imageLabel)

    var imageInput = new Input()
    imageInput.setType('url')
    form.add(imageInput)

    var textLabel = new Label()
    textLabel.setText('text')
    form.add(textLabel)

    var textInput = new Input()
    textInput.setType('text')
    form.add(textInput)

    var submitButton = new Button()
    submitButton.setText('Create')
    submitButton.setType('submit')
    form.add(submitButton)
    
    var cancelAnchor = new Anchor()
    cancelAnchor.setText('Cancel')
    cancelAnchor.addClickListener(function () {
        form.clear()

        this.cancelClickListener()
    }.bind(this))
    this.add(cancelAnchor)
}

CreatePost.prototype = Object.create(Section.prototype)
CreatePost.prototype.constructor = CreatePost

CreatePost.prototype.addCreatePostSubmitListener = function(listener){
    this.createPostSumbitListener = listener
}

CreatePost.prototype.addCancelClickListener = function(listener){
    this.cancelClickListener = listener
}