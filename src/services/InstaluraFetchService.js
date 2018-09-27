import { AsyncStorage } from 'react-native';

export default class InstaluraFetchService {
    static get(recurso){
        const uri = 'http://instalura-api.herokuapp.com/api' + recurso;

        const jsonPromisse = AsyncStorage.getItem('token')
        .then(token => {
            return {
                headers: new Headers({
                    "X-AUTH-TOKEN": token
                })
            }
        })
        .then(requestInfo => fetch(uri, requestInfo))
        .then(resposta => resposta.json());

        return jsonPromisse;
    }

    static post(recurso, dados){
        const uri = 'http://instalura-api.herokuapp.com/api' + recurso;
        
        return AsyncStorage.getItem('token')
        .then(token => {
            return {
                method: 'POST',
                body: JSON.stringify(dados),
                headers: new Headers({
                    "Content-type": "application/json",
                    "X-AUTH-TOKEN": token})
            };
        })
        .then(requestInfo => fetch(uri, requestInfo))
        .then(resposta => resposta.json())
    }
}

