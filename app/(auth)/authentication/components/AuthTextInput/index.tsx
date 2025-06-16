import { ActivityIndicator, PixelRatio, TextInput, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { Image } from "expo-image";

import { AuthenticatonColors } from "@/constants/color";

import { TAuthTextInputProps } from "./type";
import { AuthTextInputStyle } from "./style";
import { useAuthTextInputHook } from "./hook";
import { AuthenticationIcons } from "@/constants/icon";

export const AuthTextInput = (props:TAuthTextInputProps)=>{

    const {
        textInputName,
        textInputIcon,
        textInputProps,
        isTextInputValid,
        isTextInputLoading
    } = props


    const {
        isPasswordVisible,
        passwordGesture
    } = useAuthTextInputHook({
        
    })
    

    return (
        <View
            style={{
                borderRadius:16/PixelRatio.get(),
                borderWidth:1,
                borderColor:isTextInputValid === false ? (
                    AuthenticatonColors.AuthTextInput.textInputNotValid 
                )
                :
                (
                    'black'
                ),
                flexDirection:'row',
                alignItems:'center',
            }}
        >
            {textInputIcon && (
                <View 
                    style={AuthTextInputStyle.AuthTextInputIconContainer}
                >
                    <Image 
                        source={textInputIcon} 
                        style={[
                            AuthTextInputStyle.AuthTextInputIcon,
                            {
                                tintColor:isTextInputValid === false ? (
                                    AuthenticatonColors.AuthTextInput.textInputNotValid 
                                )
                                :
                                (
                                    AuthenticatonColors.AuthTextInput.textInputIconColor
                                )
                            }
                        ]}
                        contentFit="contain"
                    />
                </View>
            )}
            <View
                style={{
                    flex:1,
                    marginRight:(textInputName === 'userPassword' || textInputName === 'userNickName') ? (
                        64/PixelRatio.get() + (16/PixelRatio.get())*2
                    )
                    :
                    (
                        16/PixelRatio.get() 
                    )
                }}
            >
                <TextInput
                    style={{
                        flex:1,
                    }}
                    secureTextEntry={
                        textInputName === 'userPassword' ? (
                            !isPasswordVisible
                        )
                        :
                        undefined
                    }
                    
                    {...textInputProps}
                />
            </View>
            {
                (
                    textInputName === 'userNickName' || 
                    textInputName === 'userPassword'
                ) && (
                    <View
                        style={{
                            right:0,
                            position: "absolute",
                            zIndex:1,
                        }}
                    >
                        <View
                            style={{
                                marginRight:16/PixelRatio.get(),
                                height:64/PixelRatio.get(),
                                width:64/PixelRatio.get(),
                            }}
                        >
                            {textInputName === 'userPassword' && (
                                <GestureDetector
                                    gesture={passwordGesture}
                                >
                                    <View>
                                        <Image
                                            source={isPasswordVisible ? AuthenticationIcons.eyeOn : AuthenticationIcons.eyeOff}
                                            contentFit="contain"
                                            style={{
                                                tintColor:isTextInputValid === false ? (
                                                    AuthenticatonColors.AuthTextInput.textInputNotValid 
                                                )
                                                :
                                                (
                                                    AuthenticatonColors.AuthTextInput.textInputIconColor
                                                ),
                                                height:'100%',
                                                width:'100%'
                                            }}
                                        />
                                    </View>
                                </GestureDetector>
                            )}
                            {(
                                textInputName === 'userNickName'
                            ) && (
                                <View>
                                    {isTextInputLoading === true ? (
                                        <ActivityIndicator size={64/PixelRatio.get()} />
                                    )
                                    :
                                    (
                                        null
                                    )}
                                    {isTextInputValid === true || isTextInputValid === false ? (
                                        <Image
                                            source={isTextInputValid ? AuthenticationIcons.checkCircle : AuthenticationIcons.xCircle}
                                            contentFit="contain"
                                            style={{
                                                tintColor:isTextInputValid === false ? (
                                                    AuthenticatonColors.AuthTextInput.textInputNotValid 
                                                )
                                                :
                                                (
                                                    AuthenticatonColors.AuthTextInput.textInputValid
                                                ),
                                                height:'100%',
                                                width:'100%'
                                            }}
                                        />
                                    ) 
                                    : 
                                    (
                                        null
                                    )}
                                </View>
                            )}
                        </View>
                    </View>
                )
            }
        </View>
    )
}