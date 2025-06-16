import { createContext, useContext } from "react"
import { useMMKV, useMMKVObject } from "react-native-mmkv"
import { TUserMMKVContext,TUserMMKVProviderProps } from "./type"
import { useGlobalMMKVContext } from "@/contexts/globalMMKV"
import { UserMMKVKeys } from "./helper"


const UserMMKVContext = createContext({} as TUserMMKVContext)

export const useUserMMKVContext = () =>{
    return useContext(UserMMKVContext)
}

export const UserMMKVProvider = (props:TUserMMKVProviderProps)=>{

    const { authentication } = useGlobalMMKVContext();

    const userMMKVStorage = useMMKV({id:`${authentication?.userNickName}.storage`});
       
    const value = {
        userMMKVStorage,
    }

    return(
        <UserMMKVContext.Provider value={value}>
            {props.children}
        </UserMMKVContext.Provider>
    )
}