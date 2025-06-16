import {
    ActivityIndicator, 
    PixelRatio, 
    Pressable, 
    Text, 
    View 
} from "react-native";

import Animated from "react-native-reanimated";

import { useTextButtonHook } from "./hooks";
import { TScrollViewTextButtonProps } from "./type";
import { TextButtonStyle } from "./style";

export const ScrollViewTextButton = (props:TScrollViewTextButtonProps)=>{

    const { 
        textButtonBorderRadius,
        textButtonColor,
        textButtonOpacityColor,
        textButtonTextLabel, 
        disabled,
        handleOnPress:hop,
        style,
        ...textProps
    } = props;

    const {
        isScrollViewTextButtonLoading,
        scrollViewTextButtonContainerAnimatedStyle,
        buttonOpacityStyle,
        handleOnPressIn,
        handleOnPressOut,
        handleOnPress,
    } = useTextButtonHook({
        handleOnPress:hop
    });


    return(
        <Pressable
            disabled={disabled}
            onPress={handleOnPress}
            onPressIn={handleOnPressIn}
            onPressOut={handleOnPressOut}
            pointerEvents="box-none"
            unstable_pressDelay={100}
            pressRetentionOffset={{
                bottom:0,
                left:0,
                right:0,
                top:0
            }}
        >
            <Animated.View
                style={
                    [
                        TextButtonStyle.TextButtonStyleInnerContainer,
                        {
                            borderRadius:textButtonBorderRadius,
                            backgroundColor:textButtonColor,
                        }
                    ]
                }
            >
                <View
                    style={TextButtonStyle.TextButtonStyleInnerContainerDefaultTextContainer}
                >
                    <Animated.View
                        style={scrollViewTextButtonContainerAnimatedStyle}
                    >
                        <Text
                            style={[
                                TextButtonStyle.TextButtonStyleInnerContainerDefaultText,
                                style
                            ]}
                            {...textProps}
                        >
                            {textButtonTextLabel}
                        </Text>
                    </Animated.View>            
                    {isScrollViewTextButtonLoading && (
                        <ActivityIndicator
                            size={32/PixelRatio.get()}
                            style={{
                                position:'absolute',
                                top:0,
                                right:0,
                                bottom:0,
                                left:0,
                                justifyContent:'center'
                            }}
                        />
                    )}
                </View>
                <Animated.View
                    style={
                        [
                            buttonOpacityStyle,
                            TextButtonStyle.TextButtonStyleInnerContainerOpacity,
                            {
                                backgroundColor:textButtonOpacityColor
                            }
                        ]
                    }
                />
            </Animated.View>
        </Pressable>
    )
}
