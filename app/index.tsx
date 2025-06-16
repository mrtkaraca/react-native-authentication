import { useCustomRoute } from './hooks';
import { StatusBar } from 'expo-status-bar';

const index = () => {

    const { rootNavigate } = useCustomRoute();

    rootNavigate();
   

}

export default index