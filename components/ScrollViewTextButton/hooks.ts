import { Gesture } from "react-native-gesture-handler";
import { 
    runOnJS, 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming 
} from "react-native-reanimated";

import { TTextButtonHookProps } from "./type";
import { useCallback, useState } from "react";
import { handleKeyboardDismiss } from "../helper";
import { Keyboard } from "react-native";


export const useTextButtonHook = (props:TTextButtonHookProps)=>{

    const {
        handleOnPress:hop
    } = props
    

    const [isScrollViewTextButtonLoading,setIsScrollViewTextButtonLoading] = useState(false)

    const isButtonActive = useSharedValue(false)

    const buttonOpacityStyle = useAnimatedStyle(()=>{
        return {
            opacity:withTiming(
                isButtonActive.value === true ? 1 : 0,
                {
                    duration:200
                }
            )
        }
    })

    const scrollViewTextButtonContainerAnimatedStyle = useAnimatedStyle(()=>{
        return{
            opacity:isScrollViewTextButtonLoading ? 0 : 1
        }
    })

    const handleOnPressIn = useCallback(()=>{
        isButtonActive.value = true
    },[])

    const handleOnPressOut = useCallback(()=>{
        isButtonActive.value = false
    },[])

    const handleOnPress = useCallback(async()=>{
        if(Keyboard.isVisible()){
            handleKeyboardDismiss()
        }
        setIsScrollViewTextButtonLoading(true)
        if(hop){
            await hop()
        }
        setIsScrollViewTextButtonLoading(false)
    },[hop])



    return {
        isScrollViewTextButtonLoading,
        buttonOpacityStyle,
        scrollViewTextButtonContainerAnimatedStyle,
        handleOnPressIn,
        handleOnPressOut,
        handleOnPress
    }
}