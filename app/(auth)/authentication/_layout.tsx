import { Stack } from "expo-router";
import { AuthContainer } from "./components/AuthContainer";


const StackLayout = () => {

    return (
        <AuthContainer>
            <Stack 
                initialRouteName="login"
                screenOptions={{
                    headerShown:false,
                    animation:'slide_from_right',
                    contentStyle:{
                        backgroundColor:"transparent"
                    },
                }}
            >
                <Stack.Screen name="login"/>
                <Stack.Screen name="register"/>
            </Stack>
        </AuthContainer>
    )
}

export default StackLayout