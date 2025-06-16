import { PixelRatio, StyleSheet } from "react-native";

export const AuthTextInputStyle = StyleSheet.create({
    AuthTextInputIconContainer:{
        margin:16/PixelRatio.get(),
        height:64/PixelRatio.get(),
        width:64/PixelRatio.get(),
    },
    AuthTextInputIcon:{
        height:'100%',
        width:'100%'
    }
})