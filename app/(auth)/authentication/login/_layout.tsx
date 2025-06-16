import { AuthenticationLoginProvider } from "@/contexts/authentication/login";
import { Stack } from "expo-router";


const StackLayout = () => {

    return (
        <AuthenticationLoginProvider>
            <Stack 
                initialRouteName="index"
                screenOptions={{
                    headerShown:false,
                    contentStyle:{
                        backgroundColor:"transparent"
                    },
                }}
            >
                <Stack.Screen name="index"/>
            </Stack>
        </AuthenticationLoginProvider>
    )
}

export default StackLayout