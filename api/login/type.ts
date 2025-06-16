import { TErrorApiResponseObject } from "../type";

export type TLoginSignInUserApiData = {
    user:string | null,
    userPassword:string | null
}

export type TLoginSignInUserApiResponse = {
    isUser:false | null;
    isCorrectPassword:false | null;
    authToken?:never
    userNickName?:never
} | {
    isUser:true;
    isCorrectPassword:true;
    authToken:string;
    userNickName:string
}

export type TLoginSignInWithAuthTokenResponse = {
    isValidAuthToken:boolean;
}

export type TLoginSignInWithAuthTokenApitResponse = [
    TLoginSignInWithAuthTokenResponse,
    null
] | [
    null,
    TErrorApiResponseObject
]