export type TErrorApiResponseKeys = 'unknownError' | 'login' | 'register' | 'networkError'

export type TErrorApiResponseObject = {
    errorCode:number;
    errorTitleMessage:string;
    errorDescriptionMessage:string; 
}

export type TErrorApiNetworkErrorResponseData = {
    '0':TErrorApiResponseObject
}

export type TErrorApiLoginResponseData = {
    '400':TErrorApiResponseObject, 
    '401':TErrorApiResponseObject,
    '503':TErrorApiResponseObject,
    [key:number]:TErrorApiResponseObject
}

export type TErrorApiRegisterResponseData = {
    '400':TErrorApiResponseObject, 
    '401':TErrorApiResponseObject,
    '503':TErrorApiResponseObject,
    [key:number]:TErrorApiResponseObject
}

export type TErrorApiNetworkErrorResponse = {
    [key in Extract<TErrorApiResponseKeys,'networkError'>]:TErrorApiNetworkErrorResponseData
}

export type TErrorApiLoginResponse = {
    [key in Extract<TErrorApiResponseKeys,'login'>]:TErrorApiLoginResponseData
}

export type TErrorApiRegisterResponse = {
    [key in Extract<TErrorApiResponseKeys,'register'>]:TErrorApiRegisterResponseData
}

export type TErrorApiResponse = (
    TErrorApiNetworkErrorResponse & 
    TErrorApiLoginResponse & 
    TErrorApiRegisterResponse
)

export type TErrorResponseHandler = <
    T extends keyof TErrorApiResponse,
    K extends keyof TErrorApiResponse[T]
>({
    errorContent,
    errorCode
}:{
    errorContent:T,
    errorCode:K
})=> TErrorApiResponse[T][K] | TErrorApiResponseObject


