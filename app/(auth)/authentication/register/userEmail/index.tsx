import { PixelRatio, View } from "react-native"

import { AuthScreenContainer } from "../../components/AuthScreenContainer"
import { AuthScrollView } from "../../components/AuthScrollView"
import { AuthTextInput } from "../../components/AuthTextInput"
import {AuthError} from "../../components/AuthError"

import { AuthenticationIcons } from "@/constants/icon"
import { ScrollViewTextButton } from "@/components/ScrollViewTextButton"
import { useUserEmailHook } from "./hook"
import { AuthTextInputLabel } from "../../components/AuthTextInputLabel"


const UserEmail = ()=>{


    const {
        isTextInputEditable,
        userEmailValidationErrors,
        handleOnChangeText,
        handleNext
    } = useUserEmailHook({

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
                            title="Enter your email."
                        />
                    </View>
                    <View
                        style={{
                            gap:16/PixelRatio.get()
                        }}
                    >
                        <AuthTextInput
                            textInputName="userEmail"
                            isTextInputValid={
                                userEmailValidationErrors?.userEmail ? 
                                false
                                :
                                true
                            }
                            textInputIcon={AuthenticationIcons.email}
                            textInputProps={
                                {
                                    editable:isTextInputEditable,
                                    placeholder:'Enter your email.',
                                    inputMode:'email',
                                    autoCapitalize:'none',
                                    onChangeText:((text)=>{
                                        handleOnChangeText('userEmail',text)
                                    })
                                }
                            }
                        />
                        <AuthError
                            isValid={
                                userEmailValidationErrors?.userEmail ? 
                                false
                                :
                                true
                            }
                            authErrorMessage={userEmailValidationErrors?.userEmail?.[0]}
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

export default UserEmail