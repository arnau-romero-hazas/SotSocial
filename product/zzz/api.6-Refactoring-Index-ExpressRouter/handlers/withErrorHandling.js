// Función wrapper para manejar errores en funciones asíncronas de Express
export const withErrorHandling = callback => {
    return (req, res, next) => {
        try{
            callback(req, res)
                .catch(error => next(error));
        }catch(error){
            next(error)
        }
    }
}
