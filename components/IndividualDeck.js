import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors';
import DeckCard from './DeckCard'

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }
  
  render () {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        <DeckCard deck={deck} />
        <View>
          <TouchableOpacity 
            style={[styles.btn, {backgroundColor: white, borderColor: purple, borderWidth: 1}]}
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { 
                deckId: deck.title,
              }
            )}
          >
            <Text style={[styles.btnText, {color: purple}]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
} 

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(IndividualDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-around'
  },
  btn: {
    borderRadius: 8,
    backgroundColor: purple,
    marginBottom: 15,
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