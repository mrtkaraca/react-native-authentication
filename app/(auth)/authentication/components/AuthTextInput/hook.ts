import { Gesture } from "react-native-gesture-handler"
import { TAuthTextInputHookProps } from "./type"
import { useCallback, useEffect, useState } from "react"
import { runOnJS } from "react-native-reanimated"
import { Keyboard, NativeSyntheticEvent, TextInput, TextInputFocusEventData } from "react-native"

export const useAuthTextInputHook = (props:TAuthTextInputHookProps)=>{

    const {
        
    } = props

    const [isPasswordVisible,setIsPasswordVisible] = useState(false)

    const passwordGesture = Gesture.Tap()
    .onEnd(()=>{
       runOnJS(setIsPasswordVisible)(!isPasswordVisible)
    })




    return{
        isPasswordVisible,
        passwordGesture
    }
}