import { PixelRatio, StyleSheet } from "react-native"

export const IconButtonStyle = StyleSheet.create({
    IconButtonContainer:{
        justifyContent:'center'
    },
    IconButtonInnerContainer:{
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
    },
    IconButtonInnerContainerOpacity:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute',
        zIndex:-1,
    }
})