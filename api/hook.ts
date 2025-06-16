import { 
    TErrorApiResponse,
    TErrorResponseHandler
} from "./type";

export const useApiErrorHandler = ()=>{

    const errorDataConfig:TErrorApiResponse={
        networkError:{
            '0':{
                errorCode:0,
                errorTitleMessage:'No Connection!',
                errorDescriptionMessage:'Reconnect to net!'
            }
        },
        login:{
            '400':{
                errorCode:400,
                errorTitleMessage:"Hmm...",
                errorDescriptionMessage:"Bad request to server!"
            },
            '401':{
                errorCode:401,
                errorTitleMessage:"Oh no...",
                errorDescriptionMessage:"My middleware dont like you!"
            },
            '503':{
                errorCode:503,
                errorTitleMessage:"Ups...",
                errorDescriptionMessage:"Something really wrong. Try Later!"
            }
        },
        register:{
            '400':{
                errorCode:400,
                errorTitleMessage:"Hmm...",
                errorDescriptionMessage:"Bad request to server!"
            },
            '401':{
                errorCode:401,
                errorTitleMessage:"Oh no...",
                errorDescriptionMessage:"My middleware dont like you!"
            },
            '503':{
                errorCode:503,
                errorTitleMessage:"Ups...",
                errorDescriptionMessage:"Something really wrong. Try Later!"
            }
        }
    }
        
    const errorResponseHandler:TErrorResponseHandler =(
        {
            errorContent,
            errorCode
        }
    )=>{
        if(typeof errorCode === 'number'){
            let check = errorDataConfig[errorContent][errorCode] ? true : false
            if(check){
                return errorDataConfig[errorContent][errorCode]
            }
            else{
                return {
                    errorCode:errorCode,
                    errorTitleMessage:'Unexpected error code!',
                    errorDescriptionMessage:'Error was unexpected, try later!'
                }
            }
        }
        return errorDataConfig[errorContent][errorCode]
    }

    return{
        errorResponseHandler
    }
}