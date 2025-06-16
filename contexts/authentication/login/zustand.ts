import { create } from 'zustand'

import { 
    TAuthenticationLoginStore,
} from './type'


export const createAuthenticationLoginStore = () =>{

    return create<TAuthenticationLoginStore>()(
        (set,get)=>({
            
        }) 
    )
}



