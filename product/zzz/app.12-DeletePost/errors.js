class DuplicityError extends Error{
    constructor(message){
        super(message)
    }
}

class CredentialsError extends Error{
    constructor(message){
        super(message)
    }
}

class NotFoundError extends Error{
    constructor(message){
        super(message)
    }
}

class OwnershipError extends Error {
    constructor(message) {
        super(message)
    }
}

export {
    DuplicityError,
    CredentialsError,
    NotFoundError,
    OwnershipError
}