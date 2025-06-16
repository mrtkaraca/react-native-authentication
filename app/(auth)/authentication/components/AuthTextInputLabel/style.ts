import { PixelRatio, StyleSheet } from "react-native";

export const AuthTextInputLabelStyle = StyleSheet.create({
    AuthTextInputLabelContainer:{
        padding:12/PixelRatio.get(),
        gap:16/PixelRatio.get()
    },
    AuthTextInputLabelTitleContainer:{
        
    },
    AuthTextInputLabelTitle:{
        fontSize:32/PixelRatio.get(),
        fontWeight:'500'
    },
    AuthTextInputLabelDescriptionContainer:{
        
    },
    AuthTextInputLabelDescription:{
        fontSize:28/PixelRatio.get()
    }
})