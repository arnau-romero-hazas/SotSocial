// FUNCION PARA CREAR HEADERS

function Headers(level){
    Component.call(this, 'h'+ level)
}

Headers.prototype = Object.create(Component.prototype)
Headers.prototype.constructor =  Headers
