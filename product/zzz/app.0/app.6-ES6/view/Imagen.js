// FUNCION PARA CREAR IMAGENES
class Image extends Component{
    constructor(){
        super('img')
    }
    setUrl(url){
        this.container.src = url // Para a una imagen configurarle la propiedad de que venga de un ''url'' hay que hacerle un .src
    }
}
