

class HttpError extends Error {
    constructor(message, status) {
        super(message)// addd message
        this.code = status
    }
}

module.exports = HttpError;