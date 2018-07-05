import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { black, white } from '../utils/colors';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';
import { createEmptyDeck } from '../utils/helpers';

export default class DeckCreate extends Component {
  state = {
    title: ''
  }

  onChangeText = (title) => {
    this.setState({ title })
  }

  submit = () => {
    const { title } = this.state 
    const deck = createEmptyDeck(title)

    addDeck(deck)

    saveDeckTitle(title)
  }
  
  render() {
    const { title } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <TextInput 
          style={styles.input} 
          value={title} 
          placeholder="Deck title" 
          onChangeText={this.onChangeText} 
          onSubmitEditing={this.submit}
        />
        <TouchableOpacity style={styles.btn} onPress={this.submit}>
            <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    borderColor: black,
    borderWidth: 2,
    borderRadius: 8, 
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    fontSize: 24,
  },
  question: {
    marginTop: 75,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    textAlign: 'center'
  },
  btn: {
    borderRadius: 8,
    backgroundColor: black,
    margin: 30,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    alignSelf: 'center'
  },
  btnText: {
    color: white, 
    fontSize: 24
  }
})

