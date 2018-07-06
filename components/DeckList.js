import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { gray, lightGray, white } from '../utils/colors';
import DeckCard from '../components/DeckCard'

class DeckList extends Component {
  componentDidMount() {
    getDecks()
      .then(decks => this.props.dispatch(receiveDecks(decks)))
  }

  renderItem(deck) {
    return (
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => this.props.navigation.navigate(
          'IndividualDeck',
          { deckId: deck.title }
        )}
      >
        <DeckCard deck={deck} />
      </TouchableOpacity>
    )
  }

  render() {
    const { decks } = this.props
    const data = Object.keys(decks).map(key => decks[key])

    if (data.length === 0) {
      return (
        <View style={[styles.container, styles.center]}>
          <FontAwesome name="frown-o" size={120} style={styles.noDataIcon} />
          <View style={styles.noDataTextContainer}>
            <Text style={styles.noDataText}>You haven't created any decks yet.</Text>
            <Text style={styles.noDataText}>Let's create one!</Text>
          </View>
        </View>
      )
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => this.renderItem(item)}
        style={styles.container}
      /> 
    )
  }
}

export function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
  container: {
    backgroundColor: white
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noDataIcon: {
    color: gray
  },
  noDataTextContainer: {
    margin: 30,
  },
  noDataText: {
    fontSize: 24,
    color: gray,
    textAlign: 'center'
  },
  itemContainer: {
    borderBottomColor: lightGray,
    borderBottomWidth: 2
  }
})