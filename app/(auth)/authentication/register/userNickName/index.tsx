import { 
    PixelRatio, 
    View 
} from "react-native"

import { AuthenticationIcons } from "@/constants/icon"
import { ScrollViewTextButton } from "@/components/ScrollViewTextButton"

import { AuthScreenContainer } from "../../components/AuthScreenContainer"
import { AuthScrollView } from "../../components/AuthScrollView"
import { AuthTextInput } from "../../components/AuthTextInput"
import { AuthError } from "../../components/AuthError"
import { AuthTextInputLabel } from "../../components/AuthTextInputLabel"


import { useUserNickNameHook } from "./hook"


const UserNickName = ()=>{


    const {
        isTextInputEditable,
        textInputValidation,
        userNickNameValidationErrors,
        handleOnChangeText,
        handleNext
    } = useUserNickNameHook({

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
                            gap:12/PixelRatio.get()
                        }}
                    >
                        <AuthTextInputLabel
                            title={'Create your nickname.'}
                            description={'Your user nickname can only consist of numbers, letters and dot.'}
                        />
                    </View>
                    <View
                        style={{
                            gap:16/PixelRatio.get()
                        }}
                    >
                        <AuthTextInput
                            textInputName="userNickName"
                            isTextInputLoading={textInputValidation.isTextInputLoading}
                            isTextInputValid={textInputValidation.isTextInputValid}
                            textInputIcon={AuthenticationIcons.atSign}
                            textInputProps={
                                {
                                    editable:isTextInputEditable,
                                    placeholder:'Enter your nickname.',
                                    onChangeText:((text)=>{
                                        handleOnChangeText('userNickName',text)
                                    })
                                }
                            }
                        />
                        <AuthError
                            isValid={textInputValidation?.isTextInputValid}
                            authErrorMessage={userNickNameValidationErrors?.userNickName?.[0]}
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

export default UserNickName