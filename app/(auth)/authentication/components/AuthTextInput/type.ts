import { ImageSource } from "expo-image";
import { ScrollView, TextInputProps } from "react-native"

export type TAuthTextInputName = 'user' | 'userNickName' | 'userEmail' | 'userPassword' | 'userName'

export type TAuthTextInputProps = ({
    textInputName:Extract<TAuthTextInputName,'userNickName'>
    isTextInputLoading:boolean | null
} | {
    textInputName:Exclude<TAuthTextInputName,'userNickName'>
    isTextInputLoading?:never
}) & {
    isTextInputValid:boolean | null
    textInputIcon:string | number | string[] | ImageSource | ImageSource[] | null | undefined;
    textInputProps:TextInputProps
}

export type TAuthTextInputHookProps = {
    
}

export default {

}