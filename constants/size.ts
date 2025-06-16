import  Constants  from "expo-constants";
import { Dimensions, PixelRatio } from "react-native";

export const StatusBarHeight = Constants.statusBarHeight;

export const {height:ScreenHeight,width:ScreenWidth} = Dimensions.get("window");


export const Sizes = {
    TarotEvent:{
        IconButtons:{
            buttonSize:64 / PixelRatio.get(),
        }
    }
}


export const TarotGameSizes={
    IconButtons:{
        buttonSize:64 / PixelRatio.get(),
    }
}