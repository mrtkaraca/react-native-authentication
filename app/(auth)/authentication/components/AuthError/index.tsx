import { 
    PixelRatio, 
    View,
    Text
} from "react-native"
import { Image } from "expo-image"

import { TAuthError } from "./type"
import { AuthenticationIcons } from "@/constants/icon"

export const AuthError = (props:TAuthError)=>{

    const {
        isValid,
        authErrorMessage,
    } = props   

    return(
        <View>
            {isValid=== false && (
                <View 
                    style={{
                        flexDirection:"row",
                        alignItems:"center",
                        gap:12/PixelRatio.get()
                    }}
                >
                    <View
                        style={{
                            width:32/PixelRatio.get(),
                            height:32/PixelRatio.get()
                        }}
                    >
                        <Image 
                            source={AuthenticationIcons.error} 
                            style={{
                                tintColor:'red',
                                height:'100%',
                                width:'100%'
                            }}
                        />
                    </View>
                    <Text 
                        style={{
                            color:'red',
                            fontSize:24/PixelRatio.get()
                        }}
                    >
                        {authErrorMessage}
                    </Text>
                </View>
            )}
        </View>
    )
}

  export default {
    AuthError
  }