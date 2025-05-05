export const data = {
    get userId(){
        const id = JSON.parse(sessionStorage.userId || 'null')

        return id
    },
    set userId(id){
        const json = JSON.stringify(id)

        sessionStorage.userId = json
    },
}