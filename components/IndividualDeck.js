import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors';
import DeckCard from './DeckCard'
import Button from './Button'

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }

  toAddCard = () => {
    const { deck } = this.props

    this.props.navigation.navigate(
      'AddCard',
      { 
        deckId: deck.title,
      }
    )
  }

  toQuiz = () => {
    const { deck } = this.props

    if (deck.questions.length === 0) {
      return alert('Deck requires at least one card to start a quiz.')
    }

    this.props.navigation.navigate(
      'Quiz',
      { 
        deckId: deck.title
      }
    )
  }
  
  render () {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        <DeckCard deck={deck} />
        <View>
          <Button 
            style={{backgroundColor: white, borderColor: purple, borderWidth: 1}}
            textColor={purple}
            text="Add Card"
            onPress={this.toAddCard}
          />    
          <Button 
            text="Start Quiz" 
            onPress={this.toQuiz}
          />
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
  }
})