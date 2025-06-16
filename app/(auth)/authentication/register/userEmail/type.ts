import { 
    StringSchema, 
} from "yup"

import { TAuthenticationRegisterUserInfo } from "@/contexts/authentication/register/type"

import { TAuthTextInputProps } from "../../components/AuthTextInput/type"

export type TAuthenticationRegisterUserEmailInfo = Extract<TAuthenticationRegisterUserInfo,'userEmail'>

export type TAuthenticationRegisterUserEmailInfoObject = {
    [key in TAuthenticationRegisterUserEmailInfo]:string | null
}


export type TAuthenticationRegisterUserEmailSchema = {
    [key in TAuthenticationRegisterUserEmailInfo]:StringSchema<string | null | undefined>
}

export type THandleOnChangeText = (
    userInfo:TAuthenticationRegisterUserEmailInfo,
    ...onChangeTextArguments:Parameters<NonNullable<TAuthTextInputProps['textInputProps']['onChangeText']>>
) =>void


export type TUserEmailYupUserErrors = {
    [key in TAuthenticationRegisterUserEmailInfo]?:Array<string>
} | null


export type TUserEmailHookProps = {
    
}


