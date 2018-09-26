import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Post from './Post';
    
export default class Feed extends Component {
    constructor(){
        super();
        this.state = {
            fotos: []
        }
    }

    componentDidMount(){
        this.apiFetch();
    }

    async apiFetch(){
        const resposta = await fetch('http://instalura-api.herokuapp.com/api/public/fotos/rafael');
        const json = await resposta.json();
        this.setState({fotos: json});
    }
    
    buscarPorId = idFoto => {
        return this.state.fotos.find(foto => foto.id === idFoto)
    }

    atuaizaFotos = fotoAtualizada => {
        return this.state.fotos
        .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);
    }

    like = (idFoto) => {
        const foto = this.buscarPorId(idFoto);

        let novaLista = [];
        if(!foto.likeada){
            novaLista = [
                ...foto.likers,
                {login: 'meuUsuario'}
            ];
        }else{
            novaLista = foto.likers.filter(liker => {
                return liker.login !== 'meuUsuario'
            });
        }

        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        }

        const fotos = this.atuaizaFotos(fotoAtualizada);

        this.setState({ fotos });
    }

    adicionaComentario = (idFoto, valorComentario, inputComentario) => {
        if(!valorComentario){
            return;
        }

        const foto = this.buscarPorId(idFoto);

        const novaLista = [...foto.comentarios, {
            id: Date.now().valueOf(),
            login: 'meuUsuario',
            texto: valorComentario
        }];

        const fotoAtualizada = {
            ...foto,
            comentarios: novaLista,
        }
        
        const fotos = this.atuaizaFotos(fotoAtualizada);
        
        this.setState({ fotos });
        inputComentario.clear();
    }

    render(){
        return (
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