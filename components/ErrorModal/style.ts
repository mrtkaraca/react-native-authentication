import { PixelRatio, StyleSheet } from "react-native";

export const ErrorModalStyle = StyleSheet.create({
    errorContainer:{
        backgroundColor:'#000000aa',
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
        justifyContent:'center',
        alignItems:"center",
    },
    errorInnerContainer:{
        maxWidth:'75%',
        backgroundColor:"white",
        alignItems:"center",
        borderRadius:12/PixelRatio.get(),
        padding:24/PixelRatio.get(),
        gap:24/PixelRatio.get()
    },
    errorTitle:{
        textAlign:"center",
        fontSize:48/PixelRatio.get()
    },
    errorDescription:{ 
        textAlign:"center",
        fontSize:36/PixelRatio.get()
    }

})