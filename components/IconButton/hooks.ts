import { Gesture } from "react-native-gesture-handler";
import { measure, runOnJS, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { TIconButtonHookProps } from "./types";

export const useIconButtonHook = (props:TIconButtonHookProps)=>{
    const buttonOpacity = useSharedValue(0);

    const buttonRef = useAnimatedRef()

    const buttonOpacityStyle = useAnimatedStyle(()=>{
        return {
            opacity:buttonOpacity.value
        }
    })

    const gesture = Gesture.Pan()
    .enabled(props.isButtonUseable !== undefined ? props.isButtonUseable : true)
    .shouldCancelWhenOutside(true)
    .onBegin(()=>{
        buttonOpacity.value = withTiming(1,{duration:100})
    })
    .onFinalize((e)=>{
        buttonOpacity.value = withTiming(0,{duration:100})
        if(e.state !== 3){
            const mes = measure(buttonRef)
    
            runOnJS(props.handleOnPress)(e,mes)
        }
    })


    return {
        buttonRef,
        gesture,
        buttonOpacityStyle,
    }
}