import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';
import { createEmptyDeck } from '../utils/helpers';
import Button from './Button'

class DeckCreate extends Component {
  state = {
    title: ''
  }

  onChangeText = (title) => {
    this.setState({ title })
  }

  submit = () => {
    const { title } = this.state 

    if (title.trim().length === 0) {
      return alert('Pleast fill the title of the deck.')
    } else {
      const deck = createEmptyDeck(title)
  
      this.props.dispatch(addDeck(deck))
  
      saveDeckTitle(title)
  
      this.setState({
        title: ''
      })

      this.props.navigation.navigate(
        'IndividualDeck',
        { 
          deckId: title
        }
      )
    }

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
        />
        <Button text="Create Deck" onPress={this.submit} />
      </View>
    )
  }
}

export default connect()(DeckCreate)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  input: {
    borderColor: purple,
    borderWidth: 2,
    borderRadius: 8, 
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    fontSize: 24,
    marginBottom: 30
  },
  question: {
    color: purple,
    marginTop: 75,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    textAlign: 'center'
  }
})

