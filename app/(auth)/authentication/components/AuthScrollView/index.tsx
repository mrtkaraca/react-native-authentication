import { 
    GestureDetector,
    ScrollView 
} from "react-native-gesture-handler";
import { 
    TouchableWithoutFeedback, 
} from "react-native"

import { 
    KeyboardAwareScrollView
} from 'react-native-keyboard-controller'

import { handleKeyboardDismiss } from "@/components/helper"

import { TAuthScrollViewProps } from "./type"


export const AuthScrollView = (props:TAuthScrollViewProps)=>{

    const {
        children
    } = props


    return(
        <TouchableWithoutFeedback
            onPress={handleKeyboardDismiss}
        >
            <KeyboardAwareScrollView
                ScrollViewComponent={ScrollView}
                contentContainerStyle={{
                    flexGrow:1,
                    justifyContent:'center'
                }}
                keyboardShouldPersistTaps={'handled'}
                bottomOffset={1}
            >
                {children}
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    )
}