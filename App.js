import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

export class PrimeiraScreen extends Component {
  navegar = () => {
    this.props.navigator.push({
      screen: 'instalura.SegundaScreen',
      title: 'Tela Secundária'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Bem-vindo ao curso de React Native da Caelum!
        </Text>

        <Button title="Navegar" onPress={this.navegar}/>
      </View>
    );
  }
}

export class SegundaScreen extends Component {
  voltar = () => {
    this.props.navigator.pop();
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Navigation
        </Text>

        <Button title="Voltar" onPress={this.voltar}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});