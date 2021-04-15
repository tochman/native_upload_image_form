import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const StandardButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, { ...style }]} onPress={onPress}>
      <Text style={{ textAlign: 'center' }}>{title}</Text>
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
    marginHorizontal: 5,
  }
})
