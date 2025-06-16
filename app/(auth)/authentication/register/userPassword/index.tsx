import { PixelRatio, View } from "react-native"

import { AuthScreenContainer } from "../../components/AuthScreenContainer"
import { AuthScrollView } from "../../components/AuthScrollView"
import { AuthTextInput } from "../../components/AuthTextInput"
import {AuthError} from "../../components/AuthError"

import { AuthenticationIcons } from "@/constants/icon"
import { ScrollViewTextButton } from "@/components/ScrollViewTextButton"
import { useUserPasswordHook } from "./hook"
import { AuthTextInputLabel } from "../../components/AuthTextInputLabel"


const UserPassword = ()=>{


    const {
        isTextInputEditable,
        minPasswordLength,
        userPasswordValidationErrors,
        handleOnChangeText,
        handleNext
    } = useUserPasswordHook({

    })

    return(
        <AuthScreenContainer>
            <AuthScrollView >
                <View 
                    style={{
                        gap:24/PixelRatio.get(),
                    }}
                >
                    <View
                        style={{
                            gap:16/PixelRatio.get()
                        }}
                    >
                        <AuthTextInputLabel
                            title="Create your password."
                            description={`Minimum length of password should be ${minPasswordLength} character.`}
                        />
                    </View>
                    <View
                        style={{
                            gap:16/PixelRatio.get()
                        }}
                    >
                        <AuthTextInput
                            textInputName="userPassword"
                            isTextInputValid={
                                userPasswordValidationErrors?.userPassword ? 
                                false
                                :
                                true
                            }
                            textInputIcon={AuthenticationIcons.lock}
                            textInputProps={
                                {
                                    editable:isTextInputEditable,
                                    placeholder:'Enter your password.',
                                    onChangeText:((text)=>{
                                        handleOnChangeText('userPassword',text)
                                    })
                                }
                            }
                        />
                        <AuthError
                            isValid={
                                userPasswordValidationErrors?.userPassword ? 
                                false
                                :
                                true
                            }
                            authErrorMessage={userPasswordValidationErrors?.userPassword?.[0]}
                        />
                    </View>
                    <View
                        style={{
                            gap:12/PixelRatio.get(),
                        }}
                    >
                        <ScrollViewTextButton
                            textButtonTextLabel="Next"
                            textButtonOpacityColor="grey"
                            textButtonBorderRadius={9999}
                            handleOnPress={handleNext}
                        />
                    </View>
                </View>
            </AuthScrollView>
        </AuthScreenContainer>
            
    )
}

export default UserPassword