import { 
    StringSchema, 
} from "yup"

import { TAuthenticationRegisterUserInfo } from "@/contexts/authentication/register/type"

import { TAuthTextInputProps } from "../../components/AuthTextInput/type"

export type TAuthenticationRegisterUserNickNameInfo = Extract<TAuthenticationRegisterUserInfo,'userNickName'>

export type TAuthenticationRegisterUserNickNameInfoObject = {
    [key in TAuthenticationRegisterUserNickNameInfo]:string | null
}


export type TAuthenticationRegisterUserNickNameSchema = {
    [key in TAuthenticationRegisterUserNickNameInfo]:StringSchema
}

export type THandleOnChangeText = (
    userInfo:TAuthenticationRegisterUserNickNameInfo,
    ...onChangeTextArguments:Parameters<NonNullable<TAuthTextInputProps['textInputProps']['onChangeText']>>
) =>void


export type TUserNickNameYupUserErrors = {
    [key in TAuthenticationRegisterUserNickNameInfo]?:Array<string>
} | null


export type TUserNickNameHookProps ={
    
}

export type TAuthTextInputValidation = {
    [key in keyof Pick<TAuthTextInputProps,'isTextInputLoading' | 'isTextInputValid'>]-?:TAuthTextInputProps[key]
}

