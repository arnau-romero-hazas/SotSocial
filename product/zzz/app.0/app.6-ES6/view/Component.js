// FUNCION PARA CREAR COMPONENTES
class Component{
    constructor(tagName){
        this.container = document.createElement(tagName)
    }

    add(child){
        this.container.appendChild(child.container)
    }

    remove(child){
        this.container.removeChild(child.container)
    }
    addClickListener(listener){
        this.container.addEventListener('click', listener)
    }

    addSubmitListener(listener){
        this.container.addEventListener('submit',listener)
    }
}