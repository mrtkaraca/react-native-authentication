import { Slot } from "expo-router";

import { useCustomRoute } from '@/app/hooks';

import { UserMMKVProvider } from "@/contexts/userMMKV";

import { useCheckUserWithAuthToken } from "./hooks";

const StackLayout = () => {


    const {appNavigate} = useCustomRoute();

    useCheckUserWithAuthToken();
    appNavigate();


    return (
        <UserMMKVProvider>
            <Slot />
        </UserMMKVProvider>
    );
  
}

export default StackLayout