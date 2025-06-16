import { useEffect, useState } from "react";
import { ScaledSize, Dimensions, Platform } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export const useDimensionSize = ()=>{
    const dimension = useSharedValue<ScaledSize>(Dimensions.get(Platform.OS === 'android' ? 'window' : 'screen'));

    useEffect(()=>{
        const Event = Dimensions.addEventListener('change',({window,screen})=>{
            dimension.value = Platform.OS === 'android' ? window : screen
        })

        return()=>{
            Event.remove()
        }
    },[])

    return{
        dimension
    }
}
