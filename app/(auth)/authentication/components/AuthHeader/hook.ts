import { useCallback } from "react";
import { TAuthHeaderHookProps } from "./type";
import { router } from "expo-router";

export const useAuthHeaderHook = (props:TAuthHeaderHookProps)=>{

    const handleBackButton = useCallback(()=>{
        if(router.canGoBack()){
            router.back()
        }
        else{
            router.navigate('/authentication/login')
        }
    },[])

    return{
        handleBackButton
    }
}