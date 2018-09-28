import { AlertIOS } from 'react-native';

export default class Notificacao {

    static exibe(mensagem) {
        AlertIOS.alert("Ocorreu um erro!", mensagem);
    }
}