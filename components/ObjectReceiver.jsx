import React, { useState, useEffect } from 'react'
import { globals } from '../styles/globals'
import { StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native'



const API_KEY_3D = 'jcDuLnzAQdVXUJkuuhCojttASWcfaWlaewGkWwg'

const ObjectReceiver = ({ route, navigation }) => {
  // const { height, photo } = route.params.data
  const [objectImage, setObjectImage] = useState()



  useEffect(() => {

  }, [])

  // const fetch3DImage = (height, photo) => {
  //   let body = {
  //     height: height,
  //     imageurl: photo.uri
  //   }
  // }

  return (
    <View style={globals.container}>
      <View style={styles.formContainer}>

        {/* <ModelView
          model={{
            uri: '../assets/avatar.obj',
          }}
          scale={0.10}

          translateZ={-2}
          rotateZ={270}

          style={{ flex: 1 }}
        /> */}

        {/* <GLView
          style={{ flex: 1 }}
          onContextCreate={async (gl) => {
            const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
            // Create a WebGLRenderer without a DOM element
            const renderer = new Renderer({ gl });
            renderer.setSize(width, height);
            renderer.setClearColor("#fff");

            // Scene declaration
            const scene = new THREE.Scene()



            // Loading in the object
            const asset = Asset.fromModule(require('../assets/avatar.obj'));
            await asset.downloadAsync();
            const loader = new OBJLoader();
            loader.load(asset.localUri, group => {
              scene.add(group)
            });

            // Rendering
            const render = () => {
              requestAnimationFrame(render);
              renderer.render(scene, camera);
              gl.endFrameEXP();
            }
            render()
          }}
        /> */}

        <Text>Are we here?</Text>
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
