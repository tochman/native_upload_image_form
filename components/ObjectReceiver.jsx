import React, { useState, useEffect } from 'react'
import { globals } from '../styles/globals'
import { StyleSheet, Text, View } from 'react-native'
import { avatar } from '../assets/favicon.png'

const ObjectReceiver = ({ route, navigation }) => {
  const { height, photo } = route.params.data

  useEffect(() => {

  }, [])

  return (
    <View style={globals.container}>
      <View style={styles.formContainer}>

      </View>
    </View>
  )
}

export default ObjectReceiver

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    width: '75%',
    minHeight: '70%',
    borderRadius: 5,
    padding: 30,
    justifyContent: 'flex-start'
  },
})
