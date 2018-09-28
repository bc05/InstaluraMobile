import { ToastAndroid } from "react-native";

export default class Notificacao {

    static exibe(mensagem) {
        ToastAndroid.show(mensagem, ToastAndroid.SHORT);
    }
}
