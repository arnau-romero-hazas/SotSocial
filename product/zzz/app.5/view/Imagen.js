// FUNCION PARA CREAR IMAGENES

function Image(){
    Component.call(this, 'img')
}

Image.prototype = Object.create(Component.prototype)
Image.prototype.constructor = Image

// Funcion para poder darle la propiedar .src a nuestras imagenes
Image.prototype.setUrl = function(url){
    this.container.src = url // Para a una imagen configurarle la propiedad de que venga de un ''url'' hay que hacerle un .src
}
