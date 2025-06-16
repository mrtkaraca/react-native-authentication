import { 
    StringSchema, 
} from "yup"

import { TAuthenticationRegisterUserInfo } from "@/contexts/authentication/register/type"

import { TAuthTextInputProps } from "../../components/AuthTextInput/type"

export type TAuthenticationRegisterUserPasswordInfo = Extract<TAuthenticationRegisterUserInfo,'userPassword'>

export type TAuthenticationRegisterUserPasswordInfoObject = {
    [key in TAuthenticationRegisterUserPasswordInfo]:string | null
}


export type TAuthenticationRegisterUserPasswordSchema = {
    [key in TAuthenticationRegisterUserPasswordInfo]:StringSchema<string | null | undefined>
}

export type THandleOnChangeText = (
    userInfo:TAuthenticationRegisterUserPasswordInfo,
    ...onChangeTextArguments:Parameters<NonNullable<TAuthTextInputProps['textInputProps']['onChangeText']>>
) =>void


export type TUserPasswordYupUserErrors = {
    [key in TAuthenticationRegisterUserPasswordInfo]?:Array<string>
} | null


export type TUserPasswordHookProps ={
    
}


