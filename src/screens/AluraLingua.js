import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AluraLingua extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.modal}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#fff"
    }
});
