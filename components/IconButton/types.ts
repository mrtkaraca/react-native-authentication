import { ImageSource } from "expo-image"
import { GestureStateChangeEvent, PanGestureHandlerEventPayload } from "react-native-gesture-handler";
import { MeasuredDimensions } from "react-native-reanimated";

export type TIconButtonProps = {
    icon:string | number | string[] | ImageSource | ImageSource[] | null | undefined;
    buttonSize:number | undefined;
    handleOnPress:(
        event:GestureStateChangeEvent<PanGestureHandlerEventPayload>,
        measure:MeasuredDimensions | null
    )=>void;
    isButtonUseable?:boolean;
    iconColor:string;
    buttonOpacityColor:string
}

export type TIconButtonHookProps = Pick<TIconButtonProps,
    'handleOnPress' |
    'isButtonUseable'
>