import React ,
{
    useState,
    createContext, 
    useContext 
} from 'react'
import { useStore } from 'zustand';

import { createAuthenticationRegisterStore } from './zustand';

import { TAuthenticationRegisterStore } from './type';

const AuthenticationRegisterContext = createContext({} as ReturnType<typeof createAuthenticationRegisterStore>);

export const useAuthenticationRegisterContextStore = <U,>(selector: (state:TAuthenticationRegisterStore ) => U)=>{
    const store = useContext(AuthenticationRegisterContext)

    if(store === null){
        throw new Error(
            'AuthenticationRegisterContext must be used within AuthenticationRegisterContext',
        )
    }

    return useStore(store,selector)
}


export const AuthenticationRegisterProvider = ({children}:React.PropsWithChildren) => {

    const [value] = useState(()=>createAuthenticationRegisterStore());

    return(
        <AuthenticationRegisterContext.Provider value={value}>
            {children}
        </AuthenticationRegisterContext.Provider>
    )
}

