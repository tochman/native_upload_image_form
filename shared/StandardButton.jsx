import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const StandardButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={{ alignSelf: 'center' }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default StandardButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'aquamarine',
    padding: 15,
    borderRadius: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 18,
    marginTop: 25,
  }
})
