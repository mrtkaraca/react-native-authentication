import { 
    View, 
} from "react-native"

import { TAuthScreenContainerProps } from "./type"
import { AuthScreenContainerStyle } from "./style"


export const AuthScreenContainer = (props:TAuthScreenContainerProps)=>{

    const {
        children
    } = props


    return(
        <View
            style={AuthScreenContainerStyle.AuthScreenContainerContainer}
        >
            {children}
        </View>
    )
}