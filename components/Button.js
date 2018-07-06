import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, purple } from '../utils/colors';

export default function Button({ style = {}, text, textColor = white, ...props }) {  
  return (
    <TouchableOpacity style={[styles.btn, style]} {...props}>
      <Text style={[ styles.btnText, {color: textColor} ]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 24
  }
})