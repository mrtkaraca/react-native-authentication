import { useCallback } from 'react';
import { 
    View,
    Text, 
    PixelRatio 
} from 'react-native'

import { useAuthentication } from '@/contexts/authentication';
import { TextButton } from '@/components/TextButton';

const Home = () => {

    const {authentication,handleAuthenticationLogout} = useAuthentication();

    const handleLogOut = useCallback(()=>{
        handleAuthenticationLogout()
    },[])


    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center",gap:36/PixelRatio.get()}}>
            <Text
                style={{
                    fontSize:28/PixelRatio.get()
                }}
            >
                Welcome!: {authentication?.userNickName}
            </Text>
            <TextButton
                textButtonTextLabel='Log out'
                textButtonOpacityColor='grey'
                textButtonBorderRadius={9999}
                handleOnPress={handleLogOut}
            />
        </View>
    )
}

export default Home