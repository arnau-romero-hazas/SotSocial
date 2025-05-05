class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class CredentialsError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class OwnershipError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class SystemError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export {
    DuplicityError,
    CredentialsError,
    NotFoundError,
    OwnershipError,
    SystemError,
    ValidationError
}

const errors ={
    DuplicityError,
    CredentialsError,
    NotFoundError,
    OwnershipError,
    SystemError,
    ValidationError
}

export default errors