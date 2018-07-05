import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { gray, lightGray, white, purple } from '../utils/colors';

class DeckList extends Component {
  componentDidMount() {
    getDecks()
      .then(decks => this.props.dispatch(receiveDecks(decks)))
  }

  renderItem(deck) {
    //Add 's' when deck size != 1 
    const unitText = `card${deck.questions.length === 1 || 's'}`

    return (
      <View key={deck.title} style={styles.item}>
        <Text style={styles.deckTitleText}>{deck.title}</Text>
        <Text style={styles.deckSizeText}>{`${deck.questions.length} ${unitText}`}</Text>
      </View>
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
  item: {
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: lightGray,
    borderBottomWidth: 2
  },
  deckTitleText: {
    fontSize: 30,
    color: purple
  },
  deckSizeText: {
    fontSize: 24,
    color: gray
  }
})