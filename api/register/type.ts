import { TAuthenticationUserInfo } from "@/contexts/authentication/type";
import { TErrorApiResponseObject } from "../type";
import { TAuthenticationRegisterStore, TAuthenticationRegisterUserInfoObject } from "@/contexts/authentication/register/type";

export type TRegisterCheckUserApiData = {
    user:string | null
}

export type TRegisterCheckUserResponse = {
    isUser:boolean;
}

export type TRegisterCheckUserApiResponse = [
    TRegisterCheckUserResponse,
    null
] | [
    null,
    TErrorApiResponseObject
]

export type TRegisterSendVerificationMailApiData = {
    userEmail:TAuthenticationRegisterUserInfoObject['userEmail']
}

export type TRegisterSendVerificationMailResponse = {
    isMailSent: true;
    userToken: string ;
} | {
    isMailSent: false;
    userToken: null ;
} 

export type TRegisterSendVerificationMailApiResponse = [
    TRegisterSendVerificationMailResponse,
    null
] | [
    null,
    TErrorApiResponseObject
]

export type TRegisterValidateVerificationEmailApiData = {
    userToken:string | null
}

export type TRegisterValidateVerificatioonEmailResponse = {
    isActive:boolean | null;
} 

export type TRegisterValidateVerificatioonEmailApiResponse = [
    TRegisterValidateVerificatioonEmailResponse,
    null
] | [
    null,
    TErrorApiResponseObject
]

export type TRegisterCreateUserApiData = TAuthenticationRegisterStore['userRegisterObject']

export type TRegisterCreateUserResponse = {
    isCreated:true;
    authToken:string;
    userNickName:string
} 

export type TRegisterCreateUserApiResponse = [
    TRegisterCreateUserResponse,
    null
] | [
    null,
    TErrorApiResponseObject
]
