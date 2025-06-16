import { PixelRatio, View } from "react-native"

import { AuthScreenContainer } from "../../components/AuthScreenContainer"
import { AuthScrollView } from "../../components/AuthScrollView"
import { AuthTextInput } from "../../components/AuthTextInput"
import {AuthError} from "../../components/AuthError"

import { AuthenticationIcons } from "@/constants/icon"
import { ScrollViewTextButton } from "@/components/ScrollViewTextButton"
import { useUserNameHook } from "./hook"
import { AuthTextInputLabel } from "../../components/AuthTextInputLabel"


const UserName = ()=>{


    const {
        isTextInputEditable,
        userNameValidationErrors,
        handleOnChangeText,
        handleNext
    } = useUserNameHook({

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
                            title="Whats your name ?"
                        />
                    </View>
                    <View
                        style={{
                            gap:16/PixelRatio.get()
                        }}
                    >
                        <AuthTextInput
                            textInputName="userName"
                            isTextInputValid={
                                userNameValidationErrors?.userName ? 
                                false
                                :
                                true
                            }
                            textInputIcon={AuthenticationIcons.person}
                            textInputProps={
                                {
                                    editable:isTextInputEditable,
                                    placeholder:'Enter your name.(Not required)',
                                    onChangeText:((text)=>{
                                        handleOnChangeText('userName',text)
                                    })
                                }
                            }
                        />
                        <AuthError
                            isValid={
                                userNameValidationErrors?.userName ? 
                                false
                                :
                                true
                            }
                            authErrorMessage={userNameValidationErrors?.userName?.[0]}
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

export default UserName