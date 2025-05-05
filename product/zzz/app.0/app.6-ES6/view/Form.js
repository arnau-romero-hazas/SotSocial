// FUNCION PARA CREAR FORMULARIOS
class Form extends Component{
    constructor(){
        super('form')
    }

    addSubmitListener(callback){
        this.container.addEventListener('submit', callback)
    }

    clear(){
        this.container.reset()
    }
}