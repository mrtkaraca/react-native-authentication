import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

import { orientationPositions } from 'constants/orientation';


export const useCustomScreenOrientation = ()=>{

    const [orientation,setOrientation] = useState<string | null>(null)

    useEffect(()=>{
        (async()=>{
            const currentOrientation = await ScreenOrientation.getOrientationAsync();
            setOrientation(orientationPositions[currentOrientation]);
        })()

        const event = ScreenOrientation.addOrientationChangeListener(e=>{
            setOrientation(orientationPositions[e.orientationInfo.orientation]);
        })

        return ()=>{
            ScreenOrientation.removeOrientationChangeListener(event)
        }
    },[])
   
    return{
        orientation
    }
}