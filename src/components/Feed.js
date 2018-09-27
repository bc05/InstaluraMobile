import React, { Component } from 'react';
import { AsyncStorage, Button, FlatList, StyleSheet, View } from "react-native";
import Post from './Post';
import InstaluraFetchService from "../services/InstaluraFetchService";
    
export default class Feed extends Component {
    constructor(){
        super();
        this.state = {
            fotos: []
        }
    }


    componentDidMount() {
        InstaluraFetchService.get('/fotos')
            .then(json => this.setState({ fotos: json }))
    }
    
    buscarPorId = idFoto => {
        return this.state.fotos.find(foto => foto.id === idFoto)
    }

    atualizaFotos = fotoAtualizada => {
        return this.state.fotos
        .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);
    }

    like = (idFoto) => {
        const foto = this.buscarPorId(idFoto);
        
        AsyncStorage.getItem("usuario")
          .then(usuarioLogado => {

            let novaLista = [];
            if (!foto.likeada) {
              novaLista = [...foto.likers, { login: usuarioLogado }];
            } else {
              novaLista = foto.likers.filter(liker => {
                return liker.login !== usuarioLogado;
              });
            }

            return novaLista;
          })
          .then(novaLista => {
            const fotoAtualizada = { ...foto, likeada: !foto.likeada, likers: novaLista };
            const fotos = this.atualizaFotos(fotoAtualizada);
            this.setState({fotos});
          });
            
        const uri = `http://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`;

        AsyncStorage.getItem('token')
            .then(token => {
                return {
                    method: 'POST',
                    headers: new Headers({
                        "X-AUTH-TOKEN": token
                    })
                };
            })
            .then(requestInfo => fetch(uri, requestInfo))            
    } 

    adicionaComentario = (idFoto, valorComentario, inputComentario) => {
        if(!valorComentario){
            return;
        }

        const foto = this.buscarPorId(idFoto);
        const uri = `http://instalura-api.herokuapp.com/api/fotos/${idFoto}/comment`;

        AsyncStorage.getItem('token')
        .then(token => {
            return {
                method: 'POST',
                body: JSON.stringify({texto: valorComentario}),
                headers: new Headers({ "Content-type": "application/json", "X-AUTH-TOKEN": token})
            };
        })
        .then(requestInfo => fetch(uri, requestInfo))
        .then(resposta => resposta.json())
        .then(comentario => [...foto.comentarios, comentario])
        .then(novaLista => {
            const fotoAtualizada = {
                ...foto,
                comentarios: novaLista
            }

            const fotos = this.atualizaFotos(fotoAtualizada);
            this.setState({ fotos });

            inputComentario.clear();
        })
    }

    render(){
        console.log('passando');
        return (
            <View>
                <Button
                    title="modal"
                    onPress={() => {this.props.navigator.showModal({
                        screen: 'AluraLingua',
                        title: 'AluraLingua',
                    });
                    }}
                />

                <FlatList style={ styles.container }
                    data={ this.state.fotos }
                    extraData={ this.state }
                    keyExtractor={ item => String(item.id) }
                    renderItem={ ({ item }) =>
                        <Post foto={ item }
                            likeCallback={ this.like }
                            comentarioCallback={ this.adicionaComentario }
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ddd'
    },
    titulo: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    tituloAtivo: {
        color: 'red',
    },
});