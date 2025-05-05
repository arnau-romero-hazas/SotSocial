// LANDING

function Landing(){
    // CREO UN DIV PARA LANDING 
    Div.call(this)
   
    var header = new Headers(1)
    header.setText('LANDING')
    this.add(header)

    // CREO ANCHOR PARA REGISTER
    var registerAnchor = new Anchor()
    registerAnchor.setText('Register')
    this.registerAnchor = registerAnchor
    this.add(registerAnchor)
    
    var orText = document.createTextNode(' or ')
    this.container.appendChild(orText)

    // ANCHOR PARA LOGIN
    var loginAnchor = new Anchor()
    loginAnchor.setText('Login')
    this.loginAnchor = loginAnchor
    this.add(loginAnchor)
}

Landing.prototype = Object.create(Component.prototype)
Landing.prototype.constructor = Landing

Landing.prototype.addLandingRegisterAnchor = function(listener){
    this.registerAnchor.addClickListener(listener)
}

Landing.prototype.addLandingLoginAnchor = function(listener){
    this.loginAnchor.addClickListener(listener)
}
