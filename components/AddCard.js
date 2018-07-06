import React, { Component } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/api';

class AddCard extends Component {
  
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

  submit = () => {
    const { deckId } = this.props.navigation.state.params
    const { question, answer } = this.state

    this.props.dispatch(addCard(deckId, { question, answer }))

    addCardToDeck(deckId, { question, answer })

    this.props.navigation.goBack()
  }

  render() {
    const { question, answer } = this.state

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <TextInput 
            style={styles.input} 
            value={question} 
            placeholder="Card question" 
            onChangeText={(text) => this.setState({ question: text })}
          />
          <TextInput 
            style={styles.input} 
            value={answer} 
            placeholder="Card answer" 
            onChangeText={(text) => this.setState({ answer: text })}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity 
          style={styles.btn}
          onPress={this.submit}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
      
    )
  }
}

export default connect()(AddCard) 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 30,
    paddingBottom: 30
  },
  input: {
    borderColor: purple,
    borderWidth: 2,
    borderRadius: 8, 
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    fontSize: 24,
    marginBottom: 30,
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