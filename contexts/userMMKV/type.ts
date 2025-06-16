import { MMKV } from "react-native-mmkv"


export type TUserMMKVProviderProps = {
    children:React.ReactNode
}

export type TUserMMKVKeys = {
    
}

export type TUserMMKVContext = {
    userMMKVStorage:MMKV;
}