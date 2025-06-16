import React ,{useEffect,useState,createContext, useContext } from 'react'
import axios from 'axios';

import { useGlobalMMKVContext } from '@/contexts/globalMMKV';
import { TAuthContextProps,THandleAuthenticationLogin } from './type';

const AuthenticationContext = createContext({} as TAuthContextProps);

export const useAuthentication = ()=>{
    return useContext(AuthenticationContext);
}


export const AuthenticationProvider = ({children}:React.PropsWithChildren) => {

    const { 
        authentication,
        setAuthentication 
    } = useGlobalMMKVContext();

    const [isAuthProviderReady,setIsAuthProviderReady] = useState<boolean | null>(null)


    const handleAuthenticationLogin:THandleAuthenticationLogin = (props)=>{
        axios.defaults.headers.common['Authorization'] = props.authToken;
        setAuthentication({
            authToken:props.authToken,
            userNickName:props.userNickName
        })
    }

    const handleAuthenticationLogout = ()=>{
        setAuthentication(undefined)
    }


    const value = {
        isAuthProviderReady,
        authentication,
        handleAuthenticationLogin,
        handleAuthenticationLogout,
    }

    
    useEffect(()=>{
        if(authentication?.authToken){
            axios.defaults.headers.common['Authorization'] = authentication.authToken
        }
        setIsAuthProviderReady(true)
    },[])

    return(
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    )
}

