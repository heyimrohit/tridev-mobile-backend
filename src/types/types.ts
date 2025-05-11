type ThttpResponse = {
    success : boolean,
    statusCode : number,
    request : {
        ip? : string | null,
        method : string,
        url : string
    },
    message : string,
    data : unknown
}

type THttpError = {
    success : boolean,
    statusCode : number,
    request : {
        ip? : string | null,
        method : string,
        url : string
    },
    message : string,
    data : unknown,
    trace? : object | null
}

export {
    ThttpResponse,
    THttpError
}