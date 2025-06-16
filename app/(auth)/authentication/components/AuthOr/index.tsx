import {
    View,
    Text
} from "react-native"
import { AuthOrStyle } from "./style"
import { useAuthOrHook } from "./hook"

export const AuthOr = ()=>{

    const {
        orText
    } = useAuthOrHook()

    return(
        <View
            style={AuthOrStyle.AuthOrContainer}
        >
            <View
                style={AuthOrStyle.AuthOrBarContainer}
            />
            <Text
                style={AuthOrStyle.AuthOrText}
            >
                {orText}
            </Text>
            <View
                style={AuthOrStyle.AuthOrBarContainer}
            />
        </View>
    )
}