import { PixelRatio, View } from "react-native"

import { IconButton } from "@/components/IconButton"

import { useAuthHeaderHook } from "./hook"
import { TAuthHeaderProps } from "./type"
import { AuthenticationIcons } from "@/constants/icon"


export const AuthHeader = (props:TAuthHeaderProps)=>{


    const {

    } = props

    const {
        handleBackButton
    } =useAuthHeaderHook({

    })

    return(
        <View
            style={{
                padding:12/PixelRatio.get()
            }}
        >
            <IconButton
                icon={AuthenticationIcons.back}
                iconColor="black"
                buttonSize={64/PixelRatio.get()}
                buttonOpacityColor="grey"
                handleOnPress={handleBackButton}
            />
        </View>
    )
}