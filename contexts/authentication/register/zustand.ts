import { create } from 'zustand'

import { MMKV } from 'react-native-mmkv'

import { 
    TAuthenticationRegisterStore,
} from './type'


export const createAuthenticationRegisterStore = () =>{

    return create<TAuthenticationRegisterStore>()(
        (set,get)=>({
            userRegisterObject:{
                userName:null,
                userNickName:null,
                userEmail:null,
                userPassword:null
            },
            setUserRegisterObject:(
                props
            )=>set((state)=>({
                userRegisterObject:{
                    ...state.userRegisterObject,
                    ...props
                }
            }))
        })
        
    )
}



