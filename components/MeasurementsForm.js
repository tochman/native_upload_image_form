import React, { useState } from 'react'
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import StandardButton from '../shared/StandardButton'
import { globals } from '../styles/globals'

const MeasurementsForm = ({ navigation }) => {
  const [height, setHeight] = useState()
  const [sex, setSex] = useState()
  const [errorMessage, setErrorMessage] = useState([{ type: null, message: '' }])

  const navigateToImageUpload = () => {
    if (!height) {
      setErrorMessage((state) => [...state, { type: 'height', message: 'Please fill in your height.' }])
      return
    } else if (!sex) {
      setErrorMessage((state) => [...state, { type: 'sex', message: 'Please choose your sex.' }])
      return
    }

    navigation.navigate('Upload Image', { height, sex })
    setErrorMessage([{ type: null, message: '' }])
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
              onChangeText={(value) => { setHeight(value); setErrorMessage(errorMessage.filter((error) => error.type !== 'height')) }}
              value={height}
            />
            {errorMessage.some((error) => error.type === 'height') && <Text style={globals.errorMessage}>{errorMessage.find((error) => error.type === 'height').message}</Text>}
          </View>

          <View style={{ zIndex: 4 }}>
            <Text style={globals.body}>Choose your sex:</Text>
            <Picker
              style={{ marginVertical: 10 }}
              selectedValue={sex}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue)
                setSex(itemValue)
                setErrorMessage(errorMessage.filter((error) => error.type !== 'sex'))
              }}>
              <Picker.Item label="Choose sex:" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>

            {errorMessage.some((error) => error.type === 'sex') && <Text style={globals.errorMessage}>{errorMessage.find((error) => error.type === 'sex').message}</Text>}
          </View>

          <StandardButton title='Next' onPress={navigateToImageUpload} />
        </View>
      </View>
    </Pressable >
  )
}

export default MeasurementsForm

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    width: '75%',
    minHeight: '50%',
    borderRadius: 5,
    padding: 40,
    justifyContent: 'flex-start'
  },
  dropDown: {
    borderWidth: 2,
    borderColor: '#333',
  }
})
