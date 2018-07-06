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
    this.props.navigation.navigate(
      'AddCard',
      { 
        deckId: deck.title,
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
            text="Start Quiz" />
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