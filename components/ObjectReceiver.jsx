import React, { useState, useEffect } from 'react'
import { globals } from '../styles/globals'
import { StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native'
import { Asset } from 'expo-asset';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import {
  AmbientLight,
  BoxBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  ObjectSpaceNormalMap,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
} from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { THREE } from 'expo-three';



const API_KEY_3D = 'jcDuLnzAQdVXUJkuuhCojttASWcfaWlaewGkWwg'
const ObjectReceiver = ({ route, navigation }) => {
  let timeout;
  // const { height, photo } = route.params.data
  const [objectImage, setObjectImage] = useState(null)


  const getBob = async () => {
    const bob = Asset.fromModule(require('../assets/random_dude.obj'));
    const loader = new OBJLoader();

    await bob.downloadAsync()
    loader.load(bob.localUri, bobActual => {
      // debugger
      setObjectImage(bobActual)
    });
    // return bob.localUri;
  }

  useEffect(() => {
    getBob()
  }, [])

  return (
    <View style={globals.container}>
      <View style={styles.formContainer}>
        <Text>This is Bob!</Text>

        {objectImage &&

          <GLView
            style={{ flex: 1 }}
            onContextCreate={async (gl) => {
              const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
              const sceneColor = 0x6ad6f0;

              // Create a WebGLRenderer without a DOM element
              const renderer = new Renderer({ gl });
              renderer.setSize(width, height);
              renderer.setClearColor(sceneColor);

              const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
              camera.position.set(2, 5, 5);
              camera.zoom = 5
              const scene = new Scene();
              scene.fog = new Fog(sceneColor, 1, 10000);
              // scene.add(new GridHelper(10, 10));

              const ambientLight = new AmbientLight(0x101010);
              scene.add(ambientLight);

              const pointLight = new PointLight(0xffffff, 2, 1000, 1);
              pointLight.position.set(0, 200, 200);
              scene.add(pointLight);

              const spotLight = new SpotLight(0xffffff, 0.5);
              spotLight.position.set(0, 500, 100);
              spotLight.lookAt(scene.position);
              scene.add(spotLight);

              objectImage.scale.multiplyScalar(4);
              objectImage.rotation.y += 0.5;
              scene.add(objectImage);
              console.log(objectImage.position)
              camera.lookAt(0, 0, 0);

              function update() {
                //  objectImage.rotation.y += 0.05;
                //  objectImage.rotation.x += 0.025;
              }

              // Setup an animation loop
              const render = () => {
                timeout = requestAnimationFrame(render);
                update();
                renderer.render(scene, camera);
                gl.endFrameEXP();
              };
              render();
            }}
          />
        }
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


