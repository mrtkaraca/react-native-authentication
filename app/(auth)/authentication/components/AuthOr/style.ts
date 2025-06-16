import { PixelRatio, StyleSheet } from "react-native";

export const AuthOrStyle = StyleSheet.create({
    AuthOrContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:48/PixelRatio.get()
    },
    AuthOrBarContainer:{
        flex:1,
        height:2,
        backgroundColor:'#00000077'
    },
    AuthOrText:{
        fontSize:32/PixelRatio.get()
    }
})