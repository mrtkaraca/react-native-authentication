import { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";

import { useErrorModal } from "@/contexts/errorModal";

import { handleKeyboardDismiss } from "../helper";

import { TErrorModalHookProps } from "./type";

export const useErrorModalHook = (props:TErrorModalHookProps)=>{
    const { errorModalProps,setErrorModalProps } = useErrorModal();
    
    const enteringDuration = 250;
    const existingDuration = 250;

    useEffect(()=>{
        if(errorModalProps?.isErrorModalVisible){
            handleKeyboardDismiss();
        }
    },[errorModalProps?.isErrorModalVisible])

    useEffect(()=>{
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            ()=>{
                if(errorModalProps?.isErrorModalVisible){
                    setErrorModalProps(null);
                    return true
                }
                return false
            },
        );

        return () => backHandler.remove();

    },[errorModalProps?.isErrorModalVisible])

    const handleCloseErrorModal = useCallback(()=>{
        if(errorModalProps?.textButtonProps.handleOnPress){
            errorModalProps.textButtonProps.handleOnPress()
        }
        setErrorModalProps(null)
    },[errorModalProps])

    return {
        enteringDuration,
        existingDuration,
        errorModalProps,
        handleCloseErrorModal
    }
}