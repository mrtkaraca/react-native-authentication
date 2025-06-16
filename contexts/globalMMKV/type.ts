import { MMKV } from "react-native-mmkv"

export type TGlobalMMKVProviderProps = {
    children:React.ReactNode
}

export type TGlobalMMKVKeys = {
    authentication:string
}

export type TGlobalMMKVContext = {
    globalMMKVStorage: MMKV;
    authentication:{
        authToken:string;
        userNickName:string
    } | undefined;
    setAuthentication:(
        value: TGlobalMMKVContext['authentication'] | 
        ((prevValue: TGlobalMMKVContext['authentication'] | undefined) => TGlobalMMKVContext['authentication'] | undefined) | 
        undefined
    ) => void
}