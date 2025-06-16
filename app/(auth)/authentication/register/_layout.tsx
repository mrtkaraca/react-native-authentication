import { Stack} from "expo-router";
import { Fragment } from "react";
import { AuthHeader } from "../components/AuthHeader";
import { AuthenticationRegisterProvider } from "@/contexts/authentication/register";

const StackLayout =() =>{


    return (
        <AuthenticationRegisterProvider>
            <AuthHeader/>
            <Stack
                initialRouteName="userName"
                screenOptions={{
                    headerShown:false,
                    contentStyle:{
                        backgroundColor:'transparent'
                    },
                    animation:"slide_from_right",
                }}
            >
                <Stack.Screen name="userName"/>
                <Stack.Screen name="userNickName"/>
                <Stack.Screen name="userPassword"/>
                <Stack.Screen name="userEmail"/>
                <Stack.Screen name="userValidateEmail"/>
            </Stack>
        </AuthenticationRegisterProvider>
    )
}


export default StackLayout