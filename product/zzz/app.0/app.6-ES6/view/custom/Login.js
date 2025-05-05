
class Login extends Component{
    // GENERO EL DIV
        constructor(){
            super('div')

        // GENERO EL CABECERO
        const header = new Headers(1)
        header.setText('Login')
        this.add(header)
        
        // FORM
        const form = new Form()
        form.container.style.display = "flex";
        form.container.style.flexDirection = "column";
        form.container.style.gap = '15px'

        form.addSubmitListener(function(event){
            event.preventDefault()

            const username = inputUsername.getValue()
            const password = inputPassword.getValue()
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
        const username = new Label()
        username.setText('Username: ')
        form.add(username)

        const inputUsername = new Input()
        form.add(inputUsername)

        // PASSWORD
        const password = new Label()
        password.setText('Password: ')
        form.add(password)

        const inputPassword = new Input()
        inputPassword.setType('password')
        form.add(inputPassword)
    
        //BUTTON LOGIN
        const loginButton = new Button()
        loginButton.setText('LOGIN')
        loginButton.setType('submit')
        form.add(loginButton)
        
        // REGISTER ANCHOR
        const registerAnchor = new Anchor()
        registerAnchor.setText('REGISTER')
        this.registerAnchor = registerAnchor
        this.add(registerAnchor)
        
    }

    addAnchorListener(listener){
        this.registerAnchor.addClickListener(listener)
    }

    addSubmitLoginListener(listener){
        this.submitLoginListener = listener
    }
}