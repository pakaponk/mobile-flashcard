import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import FlashCard from './FlashCard'
import Button from './Button'
import { red, green, white, gray, orange, purple } from '../utils/colors';

class Quiz extends Component {
  
  SCORE_TEXT = ["Don't give up!", "Nice try!", "Good Job!", "Excellent!"]
  
  state = {
    index: 0,
    score: 0,
    isCardFlipped: false
  }

  selectButton = (selectedButton) => {
    if (selectedButton === 'correct') {
      this.setState((state) => ({
        index: state.index + 1,
        score: state.score + 1,
        isCardFlipped: false
      }))
    } else {
      this.setState((state) => ({
        ...state,
        index: state.index + 1,
        isCardFlipped: false
      }))
    }
  }

  flip = () => {
    this.setState((state) => ({
      ...state,
      isCardFlipped: !state.isCardFlipped
    }))
  }

  getTotalRate() {
    const { deck } = this.props
    const { score } = this.state
    
    const totalQuestion = deck.questions.length
    const half = Math.floor(totalQuestion / 2)

    if (score === totalQuestion) {
      return 3
    }
    else if (score === 0) {
      return 0
    }
    else if (score > half) {
      return 2
    }
    else if (score <= half) {
      return 1
    }
  }

  restart = () => {
    this.setState({
      index: 0,
      score: 0
    })
    
    /* this.props.navigation.replace('Quiz', {
      deckId: this.props.deck.title
    }) */
  }

  toDeck = () => {
    this.props.navigation.goBack()
  }

  renderScore() {
    const { score } = this.state
    const totalRate = this.getTotalRate()  
    
    return (
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome style={styles.icon} name={ totalRate > 0 ? 'star': 'star-o'} size={80} color={orange} />
            <FontAwesome style={styles.icon} name={ totalRate > 1 ? 'star': 'star-o'} size={80} color={orange} />
            <FontAwesome name={ totalRate > 2 ? 'star': 'star-o'} size={80} color={orange} />
          </View>
          <Text style={styles.scoreText}>{this.SCORE_TEXT[totalRate]}</Text>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.scoreUnit}>Correct Answers</Text>
        </View>
        <View>
          <Button 
            style={{width: 200, backgroundColor: white, borderColor: purple, borderWidth: 1}}
            textColor={purple}
            text="Back to Deck" 
            onPress={this.toDeck} 
          />
          <Button
            style={{width: 200}}
            text="Restart Quiz"
            onPress={this.restart}
          />
        </View>
      </View>
    )
  }

  render() {
    const { deck } = this.props
    const { index, isCardFlipped } = this.state
    const card = deck.questions[index]

    if (index >= deck.questions.length) {
      return this.renderScore()
    }

    return (
      <View style={styles.container}>
        <Text style={styles.remainingText}>{`${index + 1}/${deck.questions.length}`}</Text>
        <FlashCard card={card} isFlipped={isCardFlipped} flip={this.flip} />
        <View>
          <Button 
            style={{backgroundColor: red, width: 160}} 
            text="Correct" 
            onPress={() => this.selectButton('correct')} 
          />
          <Button 
            style={{backgroundColor: green, width: 160}} 
            text="Incorrect" 
            onPress={() => this.selectButton('incorrect')}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state, props) {
  const { deckId } = props.navigation.state.params
  
  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: white,
    justifyContent: 'space-between'
  },
  remainingText: {
    fontSize: 18,
    color: gray
  },
  scoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15
  },
  icon: {
    marginRight: 15
  },
  score: {
    color: purple,
    fontSize: 48,
    fontWeight: 'bold'
  },
  scoreUnit: {
    color: gray,
    fontSize: 24
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 15,
    color: purple
  }
})