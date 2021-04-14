import React, { useState, useEffect } from 'react'
import { globals } from '../styles/globals'
import { AWS_KEY, AWS_SECRET, AWS_REGION, AWS_BUCKET, API_KEY_3D } from '@env'
import uuid from 'react-native-uuid'
import axios from 'axios'
import * as FileSystem from 'expo-file-system'
import { StyleSheet, Text, View } from 'react-native'
import { Asset } from 'expo-asset';
import { GLView } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import {
  AmbientLight,
  Fog,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  GridHelper
} from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { RNS3 } from 'react-native-aws3';

const ObjectReceiver = ({ route, navigation }) => {
  const { height, photo } = route.params.data
  const [objectImage, setObjectImage] = useState(null)
  const [measurements, setMeasurements] = useState()

  const uploadToAWS = async (uri, prefix, filename, mediaType,) => {
    // Generates a random fileId
    const fileId = uuid.v4()
    // Defines file to be uploaded
    const file = {
      uri: uri,
      name: `${fileId}.${filename}`,
      type: mediaType
    }
    // Configurations for S3 upload
    const options = {
      keyPrefix: `${prefix}/`,
      bucket: AWS_BUCKET,
      region: AWS_REGION,
      accessKey: AWS_KEY,
      secretKey: AWS_SECRET,
      successActionStatus: 201
    }
    // Uploads file and returns the url
    let imageUrl
    await RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      imageUrl = response.body.postResponse
    })
    return imageUrl
  }

  const getBob = async () => {
    let imageUrl = await uploadToAWS(photo.uri, 'Image', 'png', 'image/png')
    console.log(imageUrl.location)

    // Request to turn 2D into 3D
    let imageMock = "https://2d23d-staging.s3.amazonaws.com/3D%2F2ab2c32f-e258-45d7-a22d-5f9ccef64489.png"
    let params1 = {
      height: height,
      imageurl: imageMock
    }
    let response, objUrl
    try {
      console.log(`Sending 3D request with params: ${params1}`)

      // Uploads object to AWS
      // response = await axios.post('https://image2scan.3dmeasureup.com/createmesh', params1)
      let mockObj = "https://3dmu-development-space.s3.amazonaws.com/PIFuHD/QVptA4FsNZKhw3eGnUs8wr.obj?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA2VKJASSLYZVQAXEJ%2F20210413%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210413T092954Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCmFwLXNvdXRoLTEiSDBGAiEA76tOdyobQwS5J709lxU7j4qO9YwJfszL2SYrDMADmksCIQCG8huuyr6A9jDCJY3axTLvps%2FpJW01ykEayLoZp6jvaiq%2FAwjR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAIaDDczMjk4MTkyNTAxNSIMU3TG2XLUQl7Ie04lKpMDq7vIXj9plh2uDrg%2B%2FN0ngWaz%2FckKpNd8fxfdSdqlII%2Fvxc7TYWjBfa0qwlPLwZeFXN4bYT9Y60NciTeUIQd0ztgYL0q1mucF6KfhA5IalA2OOtFbdS2Qu9oQcPpAWnUmMjLOayxqm83cpJ3sqg71WVjsOG1aeEfFJ39RpCOlYvCTsbpuNLm9NLofqf3VzZFJxQRvnx1MS2LyizOxlibOd8oFH%2FEJb6Vt27dZtR7CITLHHWhs6TxLZK4vwXzrOGuYxl0epXY44Nr6JsFjXGPtY5Wx2A4U19Y6Fcp2Irzv4h8O1FVFavagJNYk9nTLZP0u%2By7iSHgJwP2%2FA9%2BwYaimxC7lfj2Jur03h3z%2FzeUYh%2FN337hETjXSxpvoM%2FKomk2BrrWuHo9CHvf67Nd8%2Fj7Yaw7Uu78Z9JhV3NeFItrRYQHCCzwEaqI3KDxbTzWen1pE%2FSnGIM7dtTqHS80U0h3V3ANZLPA9Z7WAzjf0D4aNUl53f7u7m6V6Te130uus6vgfM7FA3RmNj3XxRRJsU1UblT8AjTDYodWDBjrqAUcXgHxuVJcZS2O2ch1m5BG4%2FYAnrzvn%2F911Y0nUPiYlMjlcSAMmUSUVx9wHeDhILAkb6Hh3SN4%2FCTApZRkDs1W%2BS6LOFK2sQ8rpbdzT%2Bz50uU1hPK7mOc5E4XbalqRELjwy294Zf0p7YUniLlJojfTt05bTYDrZsypIj50stYloTV00Rt%2BM9Si3eMQVIT8WKtNIfPXTa8ErCCCOWfH9dstN%2Bq0wP6HiVyEkpMy3V1l%2FQgcgdLaWxthqt4is4YNHc5dk8gm%2B2oLF%2BhE9zZOhoWFf3uDZreVmGf%2FJSjripxvXY1cFnIaQRGQNNw%3D%3D&X-Amz-Signature=de935ffa7cb488b161d6e07516fb70bd6eacc56ccb1be9f09922993546622bcf"
      // Creates a folder
      let folder = FileSystem.cacheDirectory + uuid.v4()
      await FileSystem.makeDirectoryAsync(folder, { intermediates: true })

      // Downloads obj into that folder
      let objFile = await FileSystem.downloadAsync(mockObj, folder)
      console.log(objFile)

      // Uploads the obj to AWS
      objUrl = await uploadToAWS(objFile.uri, 'Object', 'obj', 'application/x-tgif')
      console.log(objUrl)
      setObjectImage(objUrl.location)

      debugger
      return
    } catch (error) {
      console.log(error)
      debugger
      return
    }

    // Request to create measurements
    let params2 = {
      "type": "all",
      "fileurl": objectImage,
      "auto_align": true,
      "filesource": "url",
      "filetype": "obj",
      "output": "json"
    }
    let headers = {
      "x-api-key": API_KEY_3D
    }
    let response2
    try {
      console.log(`Sending create measurements request with params: ${params2}`)
      response2 = await axios.post('https://api.3dmu.prototechsolutions.com/v3/models/measure', params2, { headers: headers })
      console.log(response2)
      debugger
    } catch (error) {
      console.log(error)
    }

    // Request to retrieve measurements
    let measurements
    try {
      console.log(`Sending GET request to retrieve measurements`)
      measurements = await axios.get(`https://api.3dmu.prototechsolutions.com/v3/models/metrics?requestId=${response2.data.requestId}`, { headers: headers })
      console.log(measurements)
      setMeasurements(measurements.data.data)
      debugger
    } catch (error) {
      console.log(error)
    }


    // const object3D = Asset.fromModule(objectImage)
    // const bob = Asset.fromModule(require('../assets/random_dude.obj'));

    // const loader = new OBJLoader();

    // await object3D.downloadAsync()
    // await bob.downloadAsync()

    // loader.load(object3D.localUri, objectActual => {
    //   debugger
    //   setObjectImage(objectActual)
    // });
    // loader.load(bob.localUri, bobActual => {
    //   debugger
    //   setObjectImage(bobActual)
    // });
  }

  useEffect(() => {
    getBob()
  }, [navigation])

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
              scene.add(new GridHelper(10, 10));

              const ambientLight = new AmbientLight(0x101010);
              scene.add(ambientLight);

              const pointLight = new PointLight(0xffffff, 2, 1000, 1);
              pointLight.position.set(0, 600, 200);
              scene.add(pointLight);

              const spotLight = new SpotLight(0xffffff, 0.5);
              spotLight.position.set(100, 600, 300);
              spotLight.lookAt(scene.position);
              scene.add(spotLight);

              objectImage.scale.multiplyScalar(2.5);
              objectImage.rotation.y -= 0.25;
              scene.add(objectImage);
              console.log(objectImage.position)
              camera.lookAt(0, 2, 0);

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
