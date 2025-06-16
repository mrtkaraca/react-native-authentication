import { useEffect, useLayoutEffect } from "react";
import { useNavigation, useSegments } from "expo-router"
import { CommonActions } from "@react-navigation/native"

import { useAuthentication } from "@/contexts/authentication";

export const useCustomRoute = ()=>{
    const navigation = useNavigation();
    const {isAuthProviderReady,authentication } = useAuthentication();
    const segment = useSegments();

    const resetAndNavigate = (screenName:string)=>{
        return navigation.dispatch(CommonActions.reset({
            routes: [{name:screenName}],
        }))
    };

    const rootNavigate = ()=>{
        useLayoutEffect(()=>{
            if(authentication?.authToken && isAuthProviderReady){
                return resetAndNavigate('(app)')
            }
            if(!authentication?.authToken && isAuthProviderReady){
                return resetAndNavigate("(auth)")
            } 
        },[isAuthProviderReady,authentication])
    }

    const authNavigate = ()=>{
        useLayoutEffect(()=>{
            if(authentication?.authToken && segment[0] !== "(app)"){
                return resetAndNavigate("(app)")
            }
        },[authentication,segment])
    }

    const appNavigate = ()=>{
        useLayoutEffect(()=>{
            if(!authentication?.authToken && segment[0] !== "(auth)"){
                return resetAndNavigate("(auth)")
            }
        },[authentication,segment])
    }

    return {
        resetAndNavigate,
        rootNavigate,
        authNavigate,
        appNavigate
    }
}

