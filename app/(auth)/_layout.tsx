import { Slot } from "expo-router";

import { useCustomRoute } from '@/app/hooks';


const StackLayout = () => {

  const {authNavigate} = useCustomRoute();

  authNavigate();


  return (

    <Slot/>

  )
}

export default StackLayout