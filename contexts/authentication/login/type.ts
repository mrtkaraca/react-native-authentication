import { TAuthenticationUserInfo } from "../type"

export type TAuthenticationLoginStore = {
    
}

export type TAuthenticationLoginUserInfo = Extract<TAuthenticationUserInfo,
    'user' |
    'userPassword'
>