import { 
    StringSchema, 
} from "yup"

import { TAuthenticationRegisterUserInfo } from "@/contexts/authentication/register/type"

import { TAuthTextInputProps } from "../../components/AuthTextInput/type"

export type TAuthenticationRegisterUserNameInfo = Extract<TAuthenticationRegisterUserInfo,'userName'>

export type TAuthenticationRegisterUserNameInfoObject = {
    [key in TAuthenticationRegisterUserNameInfo]:string | null
}


export type TAuthenticationRegisterUserNameSchema = {
    [key in TAuthenticationRegisterUserNameInfo]:StringSchema<string | null | undefined>
}

export type THandleOnChangeText = (
    userInfo:TAuthenticationRegisterUserNameInfo,
    ...onChangeTextArguments:Parameters<NonNullable<TAuthTextInputProps['textInputProps']['onChangeText']>>
) =>void


export type TUserNameYupUserErrors = {
    [key in TAuthenticationRegisterUserNameInfo]?:Array<string>
} | null


export type TUserNameHookProps ={
    
}


