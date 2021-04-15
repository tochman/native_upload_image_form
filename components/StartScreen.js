import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { globals } from '../styles/globals'
import vitruvian from '../assets/images/vitruvian.png'


const StartScreen = ({ navigation }) => {
  return (
    <View style={globals.container}>
      <TouchableOpacity style={styles.backdrop} onPress={() => navigation.navigate('Info')}>
        <Image source={vitruvian} style={styles.image} />
        <Text style={styles.title}>Measure your body</Text>
      </TouchableOpacity>
    </View>
  )
}

export default StartScreen

const styles = StyleSheet.create({
  backdrop: {
    height: 250,
    width: 250,
    backgroundColor: 'aquamarine',
    borderRadius: 10,
  },
  image: {
    height: 250,
    width: 250,
    opacity: 0.3,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    top: '18%',
    fontSize: 45,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 7,
  }

})
