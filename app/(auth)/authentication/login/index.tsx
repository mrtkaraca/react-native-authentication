import {
    PixelRatio,
    View,
    Text
} from "react-native";

import { AuthError } from "../components/AuthError";
import { AuthScrollView } from "../components/AuthScrollView";
import { AuthTextInput } from "../components/AuthTextInput";
import { AuthOr } from "../components/AuthOr";

import { ScrollViewTextButton } from "@/components/ScrollViewTextButton";
import { AuthenticationIcons } from "@/constants/icon";
import { AuthScreenContainer } from "../components/AuthScreenContainer";
import { useLoginHook } from "./hook";


const Login = ()=>{

    const {
        userLoginValidationErrors,
        handleOnChangeText,
        handleOnLogin,
        handleOnRegister
    } = useLoginHook({

    })

    return (
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
                        <AuthTextInput
                            textInputName="user"
                            isTextInputValid={
                                userLoginValidationErrors?.user ? 
                                false 
                                : 
                                true
                            }
                            textInputIcon={AuthenticationIcons.email}
                            textInputProps={
                                {
                                    placeholder:'Email or nickname',
                                    onChangeText:((text)=>{
                                        handleOnChangeText('user',text)
                                    })
                                }
                            }
                        />
                        <AuthError
                            isValid={
                                userLoginValidationErrors?.user ? 
                                false 
                                : 
                                true
                            }
                            authErrorMessage={userLoginValidationErrors?.user?.[0]}
                        />
                    </View>
                    <View
                        style={{
                            gap:12/PixelRatio.get()
                        }}
                    >
                        <AuthTextInput
                            textInputName="userPassword"
                             isTextInputValid={
                                userLoginValidationErrors?.userPassword ? 
                                false 
                                : 
                                true
                            }
                            textInputIcon={AuthenticationIcons.lock}
                            textInputProps={
                                {
                                    placeholder:'Password',
                                     onChangeText:((text)=>{
                                        handleOnChangeText('userPassword',text)
                                    })
                                }
                            }
                        />
                        <AuthError
                            isValid={
                                userLoginValidationErrors?.userPassword ? 
                                false 
                                : 
                                true
                            }
                            authErrorMessage={userLoginValidationErrors?.userPassword?.[0]}
                        />
                    </View>
                    <View
                        style={{
                            gap:12/PixelRatio.get(),
                        }}
                    >
                        <ScrollViewTextButton
                            textButtonTextLabel="Login"
                            textButtonOpacityColor="grey"
                            textButtonBorderRadius={9999}
                            handleOnPress={handleOnLogin}
                        />
                        <AuthOr/>
                        <ScrollViewTextButton
                            textButtonTextLabel="Sign up"
                            textButtonOpacityColor="grey"
                            textButtonBorderRadius={9999}
                            handleOnPress={handleOnRegister}
                        />
                    </View>
                </View>
            </AuthScrollView>
        </AuthScreenContainer>
    )
}


export default Login;

