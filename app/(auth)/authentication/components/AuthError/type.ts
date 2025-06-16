import { TAuthTextInputProps } from "../AuthTextInput/type"

export type TAuthError = {
    isValid:TAuthTextInputProps['isTextInputValid']
    authErrorMessage?:string
}