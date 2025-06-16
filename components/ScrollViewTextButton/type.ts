import { ScrollView, TextProps } from "react-native";

export type TScrollViewTextButtonProps = {
    textButtonBorderRadius:number | undefined
    textButtonTextLabel?:string
    textButtonColor?:string
    textButtonOpacityColor?:string
    handleOnPress?:()=>void | Promise<void>;
} & TextProps

export type TTextButtonHookProps = Pick<TScrollViewTextButtonProps,
    'handleOnPress'
>