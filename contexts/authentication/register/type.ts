import { TAuthenticationUserInfo } from "../type";


export type TAuthenticationRegisterUserInfo = Exclude<TAuthenticationUserInfo,
    'user'
>

export type TAuthenticationRegisterUserInfoObject = {
    [key in TAuthenticationRegisterUserInfo]?:string | null
}

export type TAuthenticationRegisterStore = {
    userRegisterObject:TAuthenticationRegisterUserInfoObject
    setUserRegisterObject:(
        props:TAuthenticationRegisterStore['userRegisterObject']
    )=>void
}




