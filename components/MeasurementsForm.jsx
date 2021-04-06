import React, { useState } from 'react'
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import StandardButton from '../shared/StandardButton'
import { globals } from '../styles/globals'

const MeasurementsForm = ({ navigation }) => {
  const [height, setHeight] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const navigateToImageUpload = () => {
    if (height) {
      navigation.navigate('Upload Image', { height })
      setErrorMessage(null)
    } else {
      setErrorMessage('Please fill in your height!')
    }
  }

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={globals.container}>
        <View style={styles.formContainer}>
          <View>
            <Text style={globals.body}>Fill in your height in cm:</Text>
            <TextInput
              required
              keyboardType='numeric'
              style={globals.input}
              placeholder="183"
              onChangeText={(value) => setHeight(value)}
              value={height}
            />
            {errorMessage && <Text style={globals.errorMessage}>{errorMessage}</Text>}
          </View>
          <StandardButton title='Next' onPress={navigateToImageUpload} />
        </View>
      </View>
    </Pressable>
  )
}

export default MeasurementsForm

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    width: '75%',
    height: '50%',
    borderRadius: 5,
    padding: 40,
    justifyContent: 'space-evenly'
  },

})
