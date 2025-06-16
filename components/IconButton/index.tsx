import { GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Image } from "expo-image";


import { useIconButtonHook } from "./hooks";
import { IconButtonStyle } from "./style";
import { TIconButtonProps } from "./types";
import { View } from "react-native";

export const IconButton = (props:TIconButtonProps)=>{

    const {
        buttonRef,
        gesture,
        buttonOpacityStyle,
    } = useIconButtonHook({
        isButtonUseable:props.isButtonUseable,
        handleOnPress:props.handleOnPress
    });

    return(
        <Animated.View
            ref={buttonRef}
            pointerEvents={'box-none'}
            style={
                [
                    {
                        height:props.buttonSize ? props.buttonSize : '100%',
                        width:props.buttonSize ? props.buttonSize : '100%',
                        borderRadius:props.buttonSize ? props.buttonSize/2 : undefined,
                        
                    },
                    IconButtonStyle.IconButtonInnerContainer
                ]
            }
        >
            <GestureDetector gesture={gesture}>
                <View style={{width:'100%',height:'100%'}}>
                    <Image
                        source={props.icon}
                        style={{
                            tintColor:props.iconColor,
                            height:'100%',
                            width:'100%',
                        }}
                        contentFit='fill'
                    />
                    <Animated.View
                        style={
                            [
                                buttonOpacityStyle,
                                IconButtonStyle.IconButtonInnerContainerOpacity,
                                {
                                    backgroundColor:props.buttonOpacityColor
                                }
                            ]
                        }
                    />
                </View>
            </GestureDetector>
        </Animated.View>
    )
}