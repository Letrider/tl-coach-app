export enum HttpStatus {
    // 200+
    Success = 200,
    Created = 201,

    // 400+
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    MethodNotAllowed = 405,

    // 500+
    InternalServerError = 500,
}