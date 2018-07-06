import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native' 
import { purple, green, red } from '../utils/colors'

export default class FlashCard extends Component {
  renderQuestion() {
    const { card, flip } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{card.question}</Text>
        <TouchableOpacity style={styles.btn} onPress={flip}>
          <Text style={[styles.btnText, styles.textDanger]} >Show answer</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderAnswer() {
    const { card, flip } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{card.answer}</Text>
        <TouchableOpacity style={styles.btn} onPress={flip}>
          <Text style={[styles.btnText, styles.textSuccess]}>Show question</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { isFlipped } = this.props 

    return isFlipped ? this.renderAnswer() : this.renderQuestion()
  }
}

const styles = StyleSheet.create({
  container: {

  },
  title: {
    color: purple,
    marginBottom: 25,
    fontSize: 30,
    textAlign: 'center'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textSuccess: {
    color: green
  },
  textDanger: {
    color: red
  }
})