// FUNCION PARA CREAR ANCHOR

function Anchor(){
    Component.call(this, 'a')
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor =  Anchor

