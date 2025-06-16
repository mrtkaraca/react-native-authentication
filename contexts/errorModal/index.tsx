import {
    useState,createContext, 
    useContext 
} from 'react'

import { 
    TErrorModalContextProps, 
    TErrorModalProviderProps 
} from './types';

const ErrorModalContext = createContext({} as TErrorModalContextProps);

export const useErrorModal = ()=>{
    return useContext(ErrorModalContext);
}

export const ErrorModalProvider = (props:TErrorModalProviderProps) => {

    const [errorModalProps,setErrorModalProps] = useState<TErrorModalContextProps['errorModalProps']>(null)

    const value = {
        errorModalProps,
        setErrorModalProps
    }

    return(
        <ErrorModalContext.Provider value={value}>
            {props.children}
        </ErrorModalContext.Provider>
    )
}

