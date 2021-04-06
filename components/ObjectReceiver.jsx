import React, { useState, useEffect } from 'react'
import { globals } from '../styles/globals'
import { StyleSheet, Text, View } from 'react-native'
import { Renderer } from 'expo-three';
import { THREE } from 'expo-three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';

global.THREE = global.THREE || THREE;

const API_KEY_3D = 'jcDuLnzAQdVXUJkuuhCojttASWcfaWlaewGkWwg'

const ObjectReceiver = ({ route, navigation }) => {
  const { height, photo } = route.params.data
  const [objectImage, setObjectImage] = useState()

  useEffect(() => {

  }, [])

  const fetch3DImage = (height, photo) => {
    let body = {
      height: height,
      imageurl: photo.uri
    }
  }

  return (
    <View style={globals.container}>
      <View style={styles.formContainer}>
        <GLView
          style={{ flex: 1 }}
          onContextCreate={({ gl: ExpoWebGLRenderingContext }) => {
            // Create a WebGLRenderer without a DOM element
            const renderer = new Renderer({ gl });
            renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
          }}
        />
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
