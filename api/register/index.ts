import axios, { 
    AxiosError 
} from "axios";

import {
    TErrorResponseHandler 
} from "../type";

import { 
    TRegisterCheckUserApiData, 
    TRegisterCheckUserApiResponse, 
    TRegisterCreateUserApiData, 
    TRegisterCreateUserApiResponse, 
    TRegisterSendVerificationMailApiData, 
    TRegisterSendVerificationMailApiResponse,
    TRegisterValidateVerificationEmailApiData,
    TRegisterValidateVerificatioonEmailApiResponse
} from "./type";


const url = process.env.EXPO_PUBLIC_API_URL
const authApiKey = process.env.EXPO_PUBLIC_AUTHORIZATION_API_KEY

export const checkUser = async(
    user:TRegisterCheckUserApiData,
    signal:AbortSignal,
    errorResponseHandler:TErrorResponseHandler
):Promise<TRegisterCheckUserApiResponse>=>{
    
    try{
        const data = await axios.post(`${url}/register/checkUser`,user,{
            headers: {
                'Accept': 'application/json',
                "Authorization": authApiKey
            },
            signal
        })
        return [data.data,null];
    }
    catch(err){
        if(err instanceof AxiosError){
            return err.response?.status ? [
                null,
                errorResponseHandler({
                    errorContent:'register',
                    errorCode:err.response.status
                })
            ] 
            : 
            [
                null,
                errorResponseHandler({
                    errorContent:'register',
                    errorCode:'503'
                })
            ] 
        }

        return [
            null,
            errorResponseHandler({
                errorContent:'register',
                errorCode:'503'
            })
        ]
    }
}

export const sendVerificationEmail = async(
    user:TRegisterSendVerificationMailApiData,
    signal:AbortSignal,
    errorResponseHandler:TErrorResponseHandler
):Promise<TRegisterSendVerificationMailApiResponse>=>{

    try{
        const data = await axios.post(`${url}/register/sendVerificationMail`,user,{
            headers: {
                'Accept': 'application/json',
                "Authorization": authApiKey
            },
            signal
        })
        return [data.data,null];
    }
    catch(err){
        if(err instanceof AxiosError){
            return err.response?.status ? [
                null,
                errorResponseHandler({
                    errorContent:'register',
                    errorCode:err.response.status
                })
            ] 
            : 
            [
                null,
                errorResponseHandler({
                    errorContent:'register',
                    errorCode:'503'
                })
            ] 
        }

        return [
            null,
            errorResponseHandler({
                errorContent:'register',
                errorCode:'503'
            })
        ] 
        
    }
}

export const validateVerificationEmail = async(
    userToken:TRegisterValidateVerificationEmailApiData,
    signal:AbortSignal,
    errorResponseHandler:TErrorResponseHandler
):Promise<TRegisterValidateVerificatioonEmailApiResponse>=>{

    try{
        const data = await axios.post(`${url}/register/checkVerifyTokenActivity`,userToken,{
            headers: {
                'Accept': 'application/json',
                "Authorization": authApiKey
            },
            signal
        })
        return [data.data,null];
    }
    catch(err){
        if(err instanceof AxiosError){
            return err.response?.status ? [
                null,
                errorResponseHandler({
                    errorContent:'register',
                    errorCode:err.response.status
                })
            ] 
            : 
            [
                null,
                errorResponseHandler({
                    errorContent:'register',
                    errorCode:'503'
                })
            ] 
        }

        return [
            null,
            errorResponseHandler({
                errorContent:'register',
                errorCode:'503'
            })
        ] 
    }
}

export const createUser = async(
    userCreateInfos:TRegisterCreateUserApiData,
    signal:AbortSignal,
    errorResponseHandler:TErrorResponseHandler
):Promise<TRegisterCreateUserApiResponse>=>{

    try{
        const data = await axios.post(`${url}/register/createUser`,userCreateInfos,{
            headers: {
                'Accept': 'application/json',
                "Authorization": authApiKey
            }
        })
        return [data.data,null];
    }
    catch(err){
        if(err instanceof AxiosError){
            return err.response?.status ? [
                null,
                errorResponseHandler({
                    errorContent:'register',
                    errorCode:err.response.status
                })
            ] 
            : 
            [
                null,
                errorResponseHandler({
                    errorContent:'register',
                    errorCode:'503'
                })
            ] 
        }

        return [
            null,
            errorResponseHandler({
                errorContent:'register',
                errorCode:'503'
            })
        ] 
    }
}

