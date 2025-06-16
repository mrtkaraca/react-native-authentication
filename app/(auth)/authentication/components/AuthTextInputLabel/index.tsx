import { 
    View,
    Text
} from "react-native"

import { TAuthTextInputLabelProps } from "./type"
import { AuthTextInputLabelStyle } from "./style"

export const AuthTextInputLabel = (props:TAuthTextInputLabelProps)=>{
    
    const {
        title,
        description
    } = props

    return(
        <View
            style={AuthTextInputLabelStyle.AuthTextInputLabelContainer}
        >
            {title ? (
                <View
                    style={AuthTextInputLabelStyle.AuthTextInputLabelTitleContainer}
                >
                    <Text
                        style={AuthTextInputLabelStyle.AuthTextInputLabelTitle}
                    >
                        {title}
                    </Text>
                </View>
            )
            :
            (
               null 
            )}
            {description ? (
                <View
                    style={AuthTextInputLabelStyle.AuthTextInputLabelDescriptionContainer}
                >
                    <Text
                        style={AuthTextInputLabelStyle.AuthTextInputLabelDescription}
                    >
                        {description}
                    </Text>
                </View>
            )
            :
            (
                null
            )}
        </View>
    )
}