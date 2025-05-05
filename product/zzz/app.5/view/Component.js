// FUNCION PARA CREAR COMPONENTES
function Component(tagName){
    this.container = document.createElement(tagName)
}
// AL PROTOTYPE DE COMPONENTES LE AÑADO LA FUNCION .add QUE ES PARA HACER UN APPENCHILD 
Component.prototype.add = function(child){
    this.container.appendChild(child.container)
}

Component.prototype.remove = function(child){
    this.container.removeChild(child.container)
}
Component.prototype.addClickListener = function(listener){
    this.container.addEventListener('click', listener)
}

Component.prototype.addSubmitListener = function(listener){
    this.container.addEventListener('submit',listener)
}

Component.prototype.setText = function(myText){
    this.container.textContent = myText
}
