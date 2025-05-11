export default {
    SUCCESS : `The operation has been successful`,
    SOMETHING_WENT_WRONG: `Something went wrong!`,
    NOT_FOUND : (entity : string)  => `${entity} not found`,
    BAD_REQUEST : (entity : string) => `${entity} is required`,
    UNAUTHORIZED : (entity : string) => `Unauthorized access to ${entity}`,
    FORBIDDEN : (entity : string) => `Access to ${entity} is forbidden`,
    ALREADY_EXISTS : (entity : string) => `${entity} already exists`,
}