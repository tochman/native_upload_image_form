import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { globals } from '../styles/globals'
import { handleChoosePhoto } from '../modules/imageServices'
import StandardButton from '../shared/StandardButton'

const UploadImage = ({ route, navigation }) => {
  const { height } = route.params
  const [photo, setPhoto] = useState()

  const sendData = () => {
    navigation.navigate('3D Receiver', { data: { height, photo } })
  }

  return (
    <View style={globals.container}>
      <View style={styles.formContainer}>
        <Text style={globals.h1}>Upload an image from your library or take a new photo:</Text>
        <View style={{ flexDirection: 'row' }}>
          <StandardButton title='Upload an image' style={{ width: '45%' }} onPress={() => handleChoosePhoto(setPhoto)} />
          <StandardButton title='Take a new photo' style={{ width: '45%' }} />
        </View>
        {photo && (
          <View>
            <Image source={{ uri: photo.uri }} style={styles.thumbnail} />
            <StandardButton title='Next' onPress={sendData} />
          </View>
        )}
      </View>
    </View>
  )
}

export default UploadImage

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    width: '75%',
    minHeight: '50%',
    borderRadius: 5,
    padding: 30,
    justifyContent: 'flex-start'
  },
  thumbnail: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 15,
  }
})
