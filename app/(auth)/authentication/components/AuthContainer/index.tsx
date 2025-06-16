import { 
    View, 
} from "react-native"

import { TAuthContainerProps } from "./type"
import { AuthContainerStyle } from "./style";


export const AuthContainer = (props:TAuthContainerProps)=>{

    const {
        children
    } = props


    return(
        <View
            style={AuthContainerStyle.AuthContainerContainer}
        >
            {children}
        </View>
    )
}