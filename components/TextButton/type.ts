import { ScrollView, TextProps } from "react-native";

export type TTextButtonProps = {
    textButtonBorderRadius?:number
    textButtonTextLabel?:string
    textButtonColor?:string
    textButtonOpacityColor?:string
    handleOnPress?:()=>void;
} & TextProps

export type TTextButtonHookProps = {
    isButtonDisabled:boolean | undefined,
} & Pick<TTextButtonProps,
    'handleOnPress'
>