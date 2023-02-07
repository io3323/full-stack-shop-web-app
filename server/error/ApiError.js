class ApiError extends Error {
  constructor (status, message) {
    super()
    this.status = status
    this.message = message
  }

  badRequest (message) {
    return new ApiError(404, message)
  }

  internal (message) {
    return new ApiError(500, message)
  }

  forbidden (message) {
    return new ApiError(403, message)
  }
}

export default new ApiError()
