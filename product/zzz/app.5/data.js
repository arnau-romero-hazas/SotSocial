var data = {
    uuid: function(){ // Funcion para generar id aleatorias y assignarlas cuando se registre un usuario.
        return (Date.now() + Math.random()).toString(36).replace('.', '') 
    },
    users: [{
        id: 'm71tm7l3l5l',
        name: 'arnau',
        email: 'james@hook.com',
        username: 'arnau_sots',
        password: '123123123',
        createdAt: new Date(2024, 0, 10),
        modifiedAt: null
    },], // Array para almacenar los usuarios que se registren
    posts:[ /* TODO id, author, image, text, createdAt, modifiedAt*/
        {
            id: 'm737z98ciyt' ,
            author: 'Naruto! Datte bayo',
            image: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDg1NXlmZGFnZXF1YWVwazFvbjZwdzlpa2Z5ZHdmc3FudHB2d2k5YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eemPC4yhITcTm/giphy.gif',
            text: 'Trying to calm after debugging.',
            createdAt: new Date(2025, 1, 10),
            modifiedAt: null,
            likes: []
        },
        {
            id: 'm737zabzix8' ,
            author: 'Rock lee! Youngest power!',
            image: 'https://media.giphy.com/media/t0bSJQ3Qoc9ag/giphy.gif?cid=ecf05e47w0k529igtferfkbad9hidieowa5ob82vxiwex0fc&ep=v1_gifs_related&rid=giphy.gif&ct=g',
            text: "When I don't find the problem in te program. ",
            createdAt: new Date(2025, 1, 10),
            modifiedAt: null,
            likes: [] // array para guardar la id de los usuarios que hayan dado like.
        },
        {
            id: 'Publicity-Loreal' ,
            author: 'Publicity-Loreal',
            image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGMyaGF5dWJsZ3Y2azFrZWoxeTY4c25hNHNzbXBzMzF1aGw1Zm81dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pUALqgQzdc3Vm/giphy.gif',
            text: "The best for you! ",
            createdAt: new Date(2025, 1, 10),
            modifiedAt: null,
            likes: []
        },
        {
            id: 'm737zabzix8' ,
            author: 'Kakashi the copycat ninja!',
            image: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHNieGJsZ2N0cGVkajZzOGFxcmUweXIya200ams3cHIwMDhzOWZzeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dVaAhVMJhVoqI/giphy.gif',
            text: "Me and my bro when he say that Python is better than JavaScript ",
            createdAt: new Date(2025, 1, 10),
            modifiedAt: null,
            likes: []
        },
        {
            id: 'm737zabzix8' ,
            author: 'Obito!! i  miss rin...  ',
            image: 'https://media.giphy.com/media/MtJwM5N4fuMgw/giphy.gif?cid=ecf05e47d2cil89t65q6dnuuyp8xfuosnf1ducz22neo8enp&ep=v1_gifs_related&rid=giphy.gif&ct=g',
            text: "Manu when you say artifical intelligence is better than doing it yourself. ",
            createdAt: new Date(2025, 1, 10),
            modifiedAt: null,
            likes: []
        },
    ],
    
    userId: null // Variable para vigilar si el usuario esta online

}