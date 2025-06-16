import { StyleSheet,PixelRatio } from "react-native";

export const TextButtonStyle = StyleSheet.create({
    TextButtonStyleContainer:{
        alignSelf:'center',
        alignItems:'center',
    },
    TextButtonStyleInnerContainer:{
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
    },
    TextButtonStyleInnerContainerDefaultTextContainer:{
        paddingHorizontal:24/PixelRatio.get(),
        paddingVertical:16/PixelRatio.get(),
    },
    TextButtonStyleInnerContainerDefaultText:{
        color:'blue',
        textAlign:'center',
        alignSelf:'center',
        fontSize:32/PixelRatio.get(),
    },
    TextButtonStyleInnerContainerOpacity:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute',
        zIndex:-1
    }

})
