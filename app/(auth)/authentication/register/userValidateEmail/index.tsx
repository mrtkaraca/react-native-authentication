import { ActivityIndicator, PixelRatio, View } from "react-native"

import { AuthScreenContainer } from "../../components/AuthScreenContainer"
import { AuthScrollView } from "../../components/AuthScrollView"
import { AuthTextInput } from "../../components/AuthTextInput"
import {AuthError} from "../../components/AuthError"

import { AuthenticationIcons } from "@/constants/icon"
import { ScrollViewTextButton } from "@/components/ScrollViewTextButton"
import { useUserValidateEmaildHook } from "./hook"
import { AuthTextInputLabel } from "../../components/AuthTextInputLabel"
import { Fragment } from "react"


const UserValidateEmail = ()=>{


    const {
        authError,
        isTextButtonDisabled,
        textButtonLabel,
        isPending,
        authenticationLabel,
        handleResendVerificationEmailOnPress
    } = useUserValidateEmaildHook({

    })

    return(
        <AuthScreenContainer>
            <AuthScrollView >
                <View 
                    style={{
                        gap:24/PixelRatio.get(),
                    }}
                >
                    {isPending ? (
                        <ActivityIndicator size={64/PixelRatio.get()} />
                    )
                    :
                    (
                        <Fragment>
                            <View
                                style={{
                                    gap:16/PixelRatio.get()
                                }}
                            >
                                <AuthTextInputLabel
                                    title={authenticationLabel.title}
                                    description={authenticationLabel.description}
                                />
                                <AuthError
                                    isValid={authError.isValid}
                                    authErrorMessage={authError.authErrorMessage}
                                />
                            </View>
                            <View
                                style={{
                                    gap:16/PixelRatio.get()
                                }}
                            >
                                <ScrollViewTextButton
                                    textButtonTextLabel={textButtonLabel}
                                    textButtonOpacityColor="grey"
                                    disabled={isTextButtonDisabled}
                                    textButtonBorderRadius={9999}
                                    style={{
                                        color:isTextButtonDisabled ? 'grey' :'blue'
                                    }}
                                    handleOnPress={handleResendVerificationEmailOnPress}
                                />
                            </View>
                        </Fragment>
                    )}
                </View>
            </AuthScrollView>
        </AuthScreenContainer>
            
    )
}

export default UserValidateEmail