import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Feed from './src/components/Feed';
import Login from './src/screens/Login';
import AluraLingua from './src/screens/AluraLingua';

//registra as telas de visualização do sistema
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);
Navigation.registerComponent('AluraLingua', () => AluraLingua);

AsyncStorage.getItem('token')
.then(token => {
    if(token){
        return {
            screen: 'Feed',
            title: 'Instalura',
        };
    }

    return {
        screen: 'Login',
        title: 'Login',
    }
})
.then(screen => Navigation.startSingleScreenApp({screen}));
