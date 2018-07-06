import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { purple, gray } from '../utils/colors'

export default function DeckCard({ deck }) {
  const unitText = `card${deck.questions.length === 1 ? '' : 's'}`

  return (
    <View key={deck.title} style={styles.item}>
      <Text style={styles.deckTitleText}>{deck.title}</Text>
      <Text style={styles.deckSizeText}>{`${deck.questions.length} ${unitText}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
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