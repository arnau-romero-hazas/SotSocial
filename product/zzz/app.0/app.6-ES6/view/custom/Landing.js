// LANDING
class Landing extends Component{
        constructor(){
        // CREO UN DIV PARA LANDING 
         super('div')
    
        const header = new Headers(1)
        header.setText('LANDING')
        this.add(header)

        // CREO ANCHOR PARA REGISTER
        const registerAnchor = new Anchor()
        registerAnchor.setText('Register')
        this.registerAnchor = registerAnchor
        this.add(registerAnchor)
        
        const orText = document.createTextNode(' or ')
        this.container.appendChild(orText)

        // ANCHOR PARA LOGIN
        const loginAnchor = new Anchor()
        loginAnchor.setText('Login')
        this.loginAnchor = loginAnchor
        this.add(loginAnchor)
    }

    addLandingRegisterAnchor(listener){
        this.registerAnchor.addClickListener(listener)
    }

    addLandingLoginAnchor(listener){
        this.loginAnchor.addClickListener(listener)
    }
}