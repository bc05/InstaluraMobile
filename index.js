import { Navigation } from 'react-native-navigation';
import { PrimeiraScreen, SegundaScreen } from './App';

Navigation.registerComponent('instalura.PrimeiraScreen', () => PrimeiraScreen);
Navigation.registerComponent('instalura.SegundaScreen', () => SegundaScreen);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'instalura.PrimeiraScreen',
        title: 'Tela Principal'
    }
});