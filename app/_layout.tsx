import {
    Slot,
    useSegments
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthenticationProvider } from '@/contexts/authentication';
import { ErrorModalProvider } from '@/contexts/errorModal';
import { GlobalMMKVProvider } from '@/contexts/globalMMKV';
import { UserMMKVProvider } from '@/contexts/userMMKV';

import { ErrorModal } from '@/components/ErrorModal';
import { KeyboardProvider } from 'react-native-keyboard-controller';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const segment = useSegments();

    useEffect(()=>{
        if(segment.length){
            SplashScreen.hideAsync();
        }
    },[segment])

    return (
        <SafeAreaView
            edges={['bottom','right','left']}
            style={{
                flex:1,
                backgroundColor:'black'
            }}
        >
            <GlobalMMKVProvider>
                <UserMMKVProvider>
                    <KeyboardProvider>
                        <AuthenticationProvider>
                            <ErrorModalProvider>
                                <GestureHandlerRootView>
                                    <StatusBar style='auto' />
                                    <Slot/>
                                    <ErrorModal/>
                                </GestureHandlerRootView>
                            </ErrorModalProvider>
                        </AuthenticationProvider>
                    </KeyboardProvider>
                </UserMMKVProvider>
            </GlobalMMKVProvider>
        </SafeAreaView>
    )
 
}

export default RootLayout