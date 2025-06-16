import { TLoginSignInUserApiResponse } from "@/api/login/type";
import { 
    TGlobalMMKVContext 
} from "@/contexts/globalMMKV/type";

export type TAuthenticationUserInfo = 'user' | 'userName' | 'userNickName' | 'userEmail' | 'userPassword'


type NonNullAuthenticationLoginProps = {
    [key in NonNullable<keyof Pick<TLoginSignInUserApiResponse,'authToken' | 'userNickName'>>]:NonNullable<TLoginSignInUserApiResponse[key]>
}

export type THandleAuthenticationLogin = (
    props:NonNullAuthenticationLoginProps
)=>void


export type TAuthContextProps = {
    isAuthProviderReady:boolean | null
    authentication:TGlobalMMKVContext['authentication']
    handleAuthenticationLogin:THandleAuthenticationLogin;
    handleAuthenticationLogout: () => void;
}


