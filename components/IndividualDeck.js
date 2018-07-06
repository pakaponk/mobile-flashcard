import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, black, white, purple } from '../utils/colors';


class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }
  
  render () {
    const { deck } = this.props

    //Add 's' when deck size != 1 
    const unitText = `card`

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.deckTitleText}>{deck.title}</Text>
          <Text style={styles.deckSizeText}>{`${deck.questions.length} ${unitText}`}</Text>
        </View>
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
  item: {
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitleText: {
    fontSize: 30
  },
  deckSizeText: {
    fontSize: 24,
    color: gray
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