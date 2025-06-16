import { 
    Text, 
    TouchableWithoutFeedback, 
    View 
} from 'react-native'
import Animated, 
{ 
    FadeIn, 
    FadeOut 
} from "react-native-reanimated"

import { ErrorModalStyle } from './style'
import { TErrorModalProps } from './type'
import { useErrorModalHook } from './hook'
import { TextButton } from '../TextButton'
import { Fragment } from 'react'


export const ErrorModal = (props:TErrorModalProps) => {

    const {
        enteringDuration,
        existingDuration,
        errorModalProps,
        handleCloseErrorModal
    } = useErrorModalHook({

    })
  

    return (
        <Fragment>
            {errorModalProps && errorModalProps?.isErrorModalVisible && (
                <TouchableWithoutFeedback 
                    onPress={handleCloseErrorModal}
                >
                    <View
                        style={ErrorModalStyle.errorContainer} 
                    >
                        <Animated.View 
                            style={ErrorModalStyle.errorInnerContainer}
                            onStartShouldSetResponder={() => true}
                            entering={FadeIn.duration(enteringDuration)} 
                            exiting={FadeOut.duration(existingDuration)}
                        >
                            <Text 
                                style={ErrorModalStyle.errorTitle}
                            >
                                {errorModalProps.errorModalData?.errorTitleMessage}
                            </Text>
                            <Text 
                                style={ErrorModalStyle.errorDescription}
                            >
                                {errorModalProps.errorModalData?.errorDescriptionMessage}
                            </Text>
                            <TextButton
                                {...errorModalProps.textButtonProps}
                            />
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </Fragment>
    )
}