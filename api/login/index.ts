import axios, 
{ 
    AxiosError 
} from "axios";

import { 
    TErrorApiResponseObject, 
    TErrorResponseHandler 
} from "../type";

import { 
    TLoginSignInUserApiData,
    TLoginSignInUserApiResponse,
    TLoginSignInWithAuthTokenApitResponse
} from './type';


const url = process.env.EXPO_PUBLIC_API_URL
const authApiKey = process.env.EXPO_PUBLIC_AUTHORIZATION_API_KEY


export const signInUser = async(
    userInfo:TLoginSignInUserApiData,
    signal:AbortSignal,
    errorResponseHandler:TErrorResponseHandler
):Promise<[TLoginSignInUserApiResponse | null,TErrorApiResponseObject | null]>=>{


    try{
        const data = await axios.post(`${url}/login/signIn`,userInfo,{
            headers: {
                'Accept': 'application/json',
                "Authorization": authApiKey
            },
            signal
        })
        return [data.data,null];
    }
    catch(err){
        console.log(err);
        if(err instanceof AxiosError){
            return err.response?.status ? ([
                    null,
                    errorResponseHandler({
                        errorContent:'login',
                        errorCode:err.response.status
                    })
                ] 
            )
            : 
            (
                [
                    null,
                    errorResponseHandler({
                        errorContent:'login',
                        errorCode:'503'
                    })
                ]
            ) 
        }

        return [
            null,
            errorResponseHandler({
                errorContent:'login',
                errorCode:'503'
            })
        ]
    }
}

export const signInWithAuthToken = async(
    signal:AbortSignal,
    errorResponseHandler:TErrorResponseHandler
):Promise<TLoginSignInWithAuthTokenApitResponse>=>{

    try{
        const data = await axios.post(`${url}/login/signInWithAuthToken`,{
            headers: {
                'Accept': 'application/json'
            },
            signal
        })
        return [data.data,null];
    }
    catch(err){
        if(err instanceof AxiosError){
            return err.response?.status ? ([
                null,
                errorResponseHandler({
                    errorContent:'login',
                    errorCode:err.response.status
                })
            ]) 
            : 
            (
                [
                    null,
                    errorResponseHandler({
                        errorContent:'login',
                        errorCode:'503'
                    })
                ] 
            )
        }

        return [
            null,
            errorResponseHandler({
                errorContent:'login',
                errorCode:'503'
            })
        ] 
    }
}
