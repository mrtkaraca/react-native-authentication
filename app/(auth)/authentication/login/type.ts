import { 
    StringSchema, 
    ValidationError 
} from "yup"
import { 
    TAuthTextInputProps 
} from "../components/AuthTextInput/type"

import { TAuthenticationLoginUserInfo } from "@/contexts/authentication/login/type"

export type TLoginUserInfo = TAuthenticationLoginUserInfo

export type TLoginUserInfoObject = {
    [key in TLoginUserInfo]:string | null
}


export type TLoginUserSchema = {
    [key in TLoginUserInfo]:StringSchema
}

export type THandleOnChangeText = (
    userInfo:TLoginUserInfo,
    ...onChangeTextArguments:Parameters<NonNullable<TAuthTextInputProps['textInputProps']['onChangeText']>>
) =>void


export type TLoginYupUserErrors = {
    [key in TLoginUserInfo]?:Array<string>
} | null

export type TLoginHookProps = {
  
}



