import { createContext, useContext } from "react"
import { useMMKV, useMMKVObject } from "react-native-mmkv"
import { TGlobalMMKVContext, TGlobalMMKVProviderProps } from "./type"
import { globalMMKVKeys } from "./helper"


const GlobalMMKVContext = createContext({} as TGlobalMMKVContext)

export const useGlobalMMKVContext = () =>{
    return useContext(GlobalMMKVContext)
}

export const GlobalMMKVProvider = (props:TGlobalMMKVProviderProps)=>{

    const globalMMKVStorage = useMMKV();

    const [authentication,setAuthentication] = useMMKVObject<TGlobalMMKVContext['authentication']>(globalMMKVKeys.authentication,globalMMKVStorage)

    const value = {
        globalMMKVStorage,
        authentication,setAuthentication
    }

    return(
        <GlobalMMKVContext.Provider value={value}>
            {props.children}
        </GlobalMMKVContext.Provider>
    )
}