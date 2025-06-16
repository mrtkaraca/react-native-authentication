import { Gesture } from "react-native-gesture-handler";
import { 
    runOnJS, 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming 
} from "react-native-reanimated";

import { TTextButtonHookProps } from "./type";


export const useTextButtonHook = (props:TTextButtonHookProps)=>{

    const {
        isButtonDisabled,
        handleOnPress
    } = props

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

    const gesture = Gesture.Pan()
    .enabled(isButtonDisabled ? !isButtonDisabled : true)
    .shouldCancelWhenOutside(true)
    .onBegin((e)=>{
        isButtonActive.value = true
    })
    .onFinalize((e)=>{
        isButtonActive.value = false
        if(e.state !== 3){
            if(handleOnPress){
                runOnJS(handleOnPress)()
            }
        }
    })

  
    return {
        gesture,
        buttonOpacityStyle,
    }
}