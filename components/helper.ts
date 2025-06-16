import { 
    Platform ,
    Keyboard
} from "react-native";

export const handleKeyboardDismiss= ()=>{
    if(Platform.OS !='web'){
        Keyboard.dismiss();
    }
}
