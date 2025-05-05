
function Login(){
    // GENERO EL DIV
    Div.call(this)

    // GENERO EL CABECERO
    var header = new Headers(1)
    header.setText('Login')
    this.add(header)
    
    // FORM
    var form = new Form()
    form.container.style.display = "flex";
    form.container.style.flexDirection = "column";
    form.container.style.gap = '15px'

    form.addSubmitListener(function(event){
        event.preventDefault()

        var username = inputUsername.getValue()
        var password = inputPassword.getValue()
        try{    
            logic.loginUser(username, password)
            console.log(username, password)
            
            form.clear()
            this.submitLoginListener()
        }catch(error){
            console.log(error)
            alert(error.message)
        }
    }.bind(this))
    this.add(form)
  
    // USERNAME
    var username = new Label()
    username.setText('Username: ')
    form.add(username)

    var inputUsername = new Input()
    form.add(inputUsername)

    // PASSWORD
    var password = new Label()
    password.setText('Password: ')
    form.add(password)

    var inputPassword = new Input()
    inputPassword.setType('password')
    form.add(inputPassword)
   
    //BUTTON LOGIN
    var loginButton = new Button()
    loginButton.setText('LOGIN')
    loginButton.setType('submit')
    form.add(loginButton)
    
    // REGISTER ANCHOR
    var registerAnchor = new Anchor()
    registerAnchor.setText('REGISTER')
    this.registerAnchor = registerAnchor
    this.add(registerAnchor)
    
}

Login.prototype = Object.create(Component.prototype)
Login.prototype.constructor = Login

Login.prototype.addAnchorListener = function(listener){
    this.registerAnchor.addClickListener(listener)
}

Login.prototype.addSubmitLoginListener = function(listener){
    this.submitLoginListener = listener
}