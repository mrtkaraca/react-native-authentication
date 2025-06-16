import React,
{
    useState,
    createContext, 
    useContext 
} from 'react'

import { createAuthenticationLoginStore } from './zustand';
import { TAuthenticationLoginStore } from './type';
import { useStore } from 'zustand';

const AuthenticationLoginContext = createContext({} as ReturnType<typeof createAuthenticationLoginStore>);

export const useAuthenticationLoginContextStore = <U,>(selector: (state:TAuthenticationLoginStore ) => U)=>{
    const store = useContext(AuthenticationLoginContext)

    if(store === null){
        throw new Error(
            'useAuthenticationLoginContextStore must be used within AuthenticationLoginProvider',
        )
    }

    return useStore(store,selector)
}

export const useAuthenticationLoginContext = ()=>{
    return useContext(AuthenticationLoginContext);
}

export const AuthenticationLoginProvider = ({children}:React.PropsWithChildren) => {

    const [value] = useState(()=>createAuthenticationLoginStore());

    return(
        <AuthenticationLoginContext.Provider value={value}>
            {children}
        </AuthenticationLoginContext.Provider>
    )
}

