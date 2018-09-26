
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';

const {height, width} = Dimensions.get('screen');

export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            foto: this.props.foto,
        }
    }

    render(){
        const { foto, likeCallback, comentarioCallback } = this.props;

        return (
            <View>
                <View style={styles.cabecalho}>
                    <Image source={{uri: foto.urlPerfil}} 
                        style={styles.fotoDePerfil}/>
                    <Text>{ foto.loginUsuario }</Text>
                </View>
                <Image source={{uri: foto.urlFoto}} 
                    style={styles.foto}
                />
                <View style={styles.rodape}>
                    <Likes foto={foto} likeCallback={likeCallback}/>
                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario =>
                        <View style={styles.comentario} key={comentario.id}> 
                            <Text style={styles.tituloComentario}>{ comentario.login }</Text>
                            <Text>{ comentario.texto }</Text>
                        </View>
                    )}

                    <InputComentario idFoto={ foto.id }
                        comentarioCallback={comentarioCallback}
                    />

                </View>
            </View>
        );
    }   

    exibeLegenda(foto){
        if(foto.comentario === '')
            return;
        return (
            <View style={styles.comentario}>
                <Text style={styles.tituloComentario}>{ foto.loginUsuario }</Text>
                <Text>{ foto.comentario }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cabecalho: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fotoDePerfil: {
        marginRight: 10,
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    foto: {
        width: width,
        height: height,
    },
    rodape: {
        margin: 10,
    },
    comentario: {
        flexDirection: 'row',
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    containerInfoPost: {
        paddingLeft: 15,
        paddingRight: 15,
    }
});