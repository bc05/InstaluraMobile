import React, { Component } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default class InputComentario extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            valorComentario: '',
        }
    }
    render() {
        const { comentarioCallback, idFoto } = this.props;
        return(
            <View style={styles.novoComentario}>
                <TextInput style={styles.input}
                    placeholder='Adicione um comentário...'
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({valorComentario: texto})}
                    underlineColorAndroid="transparent"
                />

                <TouchableOpacity onPress={
                    () => {
                        comentarioCallback(idFoto, this.state.valorComentario, this.inputComentario);
                        this.setState({ valorComentario: '' });
                }}>
                    <Image style={styles.icone}
                        source={require('../../resources/img/send.png')}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    novoComentario: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    input: {
        flex: 1,
        height: 40,
    },
    icone: {
        height: 30,
        width: 30,
    },
});