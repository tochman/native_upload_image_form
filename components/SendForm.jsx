import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
import StandardButton from '../shared/StandardButton'
import axios from 'axios'
import CustomModal from './CustomModal'

const SendForm = () => {
  const [photo, setPhoto] = useState()
  const [dataSet, setDataSet] = useState()
  const [open, setOpen] = useState(false)
  const { control, handleSubmit, formState: { errors } } = useForm();

  const handleChoosePhoto = async () => {
    console.log('choose photo')
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setPhoto(pickerResult)
  }

  const onSubmit = formData => {

    // // With form data
    // const data = new FormData();
    // data.append('height', heightData)
    // data.append('photo', photo)
    // axios.post('URI', data, { headers: { "Content-Type": 'multipart/form-data' } })

    const params = {
      height: formData.height,
      photo: photo
    }
    setDataSet(params)
    // axios.post('URI', params, { headers: { "Content-Type": 'multipart/form-data' } })
    setTimeout(() => {
      setOpen(true)
    }, 1000);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <View style={styles.formContainer}>

        <CustomModal open={open} setOpen={setOpen} data={dataSet} />
        <Text style={styles.title}>Fill out the form:</Text>

        <Text style={styles.label}>Your height in cm:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder='183'
              onChangeText={(text) => onChange(text)}
              value={value}
              keyboardType='numeric'
            />
          )}
          name='height'
          defaultValue=''
        />

        <StandardButton title='Choose picture' onPress={handleChoosePhoto} />

        {photo && (
          <>
            <Image source={{ uri: photo['uri'] }} style={styles.thumbnail} />
            <StandardButton title='Send' onPress={handleSubmit(onSubmit)} />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SendForm

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 25,
  },
  thumbnail: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 25,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 35,
    borderRadius: 5,

  }
})
