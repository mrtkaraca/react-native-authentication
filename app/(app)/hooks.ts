import { useCallback, useLayoutEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

import { signInWithAuthToken } from '@/api/login';

import { useAuthentication } from "@/contexts/authentication";
import { useErrorModal } from "@/contexts/errorModal";
import { useApiErrorHandler } from "@/api/hook";



export const useCheckUserWithAuthToken = async()=>{
    const {
        authentication,
        handleAuthenticationLogout
    } = useAuthentication();

    const {
        isConnected
    } = useNetInfo();

    const {
        errorResponseHandler
    } = useApiErrorHandler()


    const {
        setErrorModalProps
    } = useErrorModal()

    
    const handleSignInWithAuthToken = useCallback(async()=>{
        if(authentication?.authToken && isConnected){
            const abortControl = new AbortController()
            const [res,err] = await signInWithAuthToken(
                abortControl.signal,
                errorResponseHandler
            )

            if(res && !res.isValidAuthToken){
                setErrorModalProps({
                        isErrorModalVisible:true,
                        errorModalData:{
                            errorCode:0,
                            errorTitleMessage:'Login token is expired!',
                            errorDescriptionMessage:'Please relogin to use app.'
                        },
                        textButtonProps:{
                            textButtonTextLabel:'Okay',
                            textButtonOpacityColor:'grey',
                            textButtonBorderRadius:9999,
                            handleOnPress:()=>{
                                setErrorModalProps(null)
                                handleAuthenticationLogout()
                            }
                        }
                    })
            }
            else{
                if(err && err.errorCode < 500){
                    setErrorModalProps({
                        isErrorModalVisible:true,
                        errorModalData:err,
                        textButtonProps:{
                            textButtonTextLabel:'Okay',
                            textButtonOpacityColor:'grey',
                            textButtonBorderRadius:9999,
                            handleOnPress:()=>{
                                setErrorModalProps(null)
                                handleAuthenticationLogout()
                            }
                        }
                    })
                }
            }
        }
    },[isConnected,authentication])

    useLayoutEffect(()=>{
        handleSignInWithAuthToken()
    },[handleSignInWithAuthToken])
  
}