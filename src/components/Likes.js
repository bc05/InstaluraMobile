import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class Likes extends Component{

    carregaIcone = likeada => likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png');

    exibeLikes(foto){
        if(foto.likers.length <= 0)
            return;
        return(
            <Text style={styles.likes}>
                {foto.likers.length} {foto.likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        );
    }

    render(){
        const { foto, likeCallback } = this.props;
        
        return (
            <View>
                <TouchableOpacity onPress={() => likeCallback(foto.id)}>
                    <Image style={styles.botaoDeLike}
                        source={this.carregaIcone(foto.likeada)}
                    />
                </TouchableOpacity>

                {this.exibeLikes(foto)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    botaoDeLike: {
        marginBottom: 10,
        height: 40,
        width: 40,
    },
    likes: {
        fontWeight: 'bold',
    }
});