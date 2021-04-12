import React, { useState, useEffect } from 'react'
import { globals } from '../styles/globals'
import { AWS_KEY, AWS_SECRET, AWS_REGION, AWS_BUCKET, API_KEY_3D } from '@env'
import uuid from 'react-native-uuid'
import axios from 'axios'
import { StyleSheet, Text, View } from 'react-native'
import { Asset } from 'expo-asset';
import { GLView } from 'expo-gl';
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
import { RNS3 } from 'react-native-aws3';

const ObjectReceiver = ({ route, navigation }) => {
  const { height, photo } = route.params.data
  const [objectImage, setObjectImage] = useState(null)
  const [measurements, setMeasurements] = useState()

  const imageToUrl = async () => {
    // Generates a random fileId
    const fileId = uuid.v4()
    // Defines file to be uploaded
    let uri = photo.uri ? photo.uri : photo
    const file = {
      uri: uri,
      name: `${fileId}.png`,
      type: 'image/png'
    }
    // Configurations for S3 upload
    const options = {
      keyPrefix: "3D/",
      bucket: AWS_BUCKET,
      region: AWS_REGION,
      accessKey: AWS_KEY,
      secretKey: AWS_SECRET,
      successActionStatus: 201
    }
    // Uploads file and returns the url
    let url
    await RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      url = response.body.postResponse
    })
    return url
  }

  const getBob = async () => {
    let url = await imageToUrl()
    console.log(url.location)

    // Request to turn 2D into 3D
    let imageMock = "https://2d23d-staging.s3.amazonaws.com/3D%2F2ab2c32f-e258-45d7-a22d-5f9ccef64489.png"
    let params1 = {
      height: height,
      imageurl: url.location
    }
    let response
    try {
      console.log(`Sending 3D request with params: ${params1}`)
      response = await axios.post('https://image2scan.3dmeasureup.com/createmesh', params1)
      console.log(response)
      setObjectImage(response.data.fileurl)
      debugger
    } catch (error) {
      console.log(error)
      debugger
    }

    // Request to create measurements
    let objMock = "https://3dmu-development-space.s3.amazonaws.com/PIFuHD/hDMaL9dvbPMGRVDhN3p5nE.obj?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA2VKJASSL2YD2R6EY%2F20210412%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210412T202016Z&X-Amz-Expires=14400&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCmFwLXNvdXRoLTEiRzBFAiEArZ8xhL%2B8uZDHdxRMk%2Bgs7SgzvMKGE3ZWobzfbWryG1oCICetMFmVvlm2CSyDc7cpu%2BWIs75QoKAzXPPFSAPvBtXKKr8DCMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNzMyOTgxOTI1MDE1IgzYtjXXpaJNf3MPvpsqkwOTHUMXGPKg%2FvJMPOKL6nXojTzWJT%2B3k9rLVjDm3yvKdflYEmkd594BAbC4R2H1ad0VTRID201rgmugthf4ZOCWo%2Fyk9yvzEhAatsXqdXcmzr3iMk7vwh4kawdQiVa1wYnNqpdWc3NVPGNzvzgokUxAz7ylKDWADutG%2B%2BZJkrSIhpmLl4aDvYo%2BT012CpTZLZpBrox%2FPGgKbQ%2BGxTUnskMxNjPFg1ngbJB9iQeZNLfyRmyvQ%2BkTOqFjcjUM6l3pReGIeaP2MdZrw9jb5W6Q0FUC%2FLzcvt%2BOzb2P5Ivpl6YPAWuq3b%2Fee0qxGoiy5owTHKfjwyzMLh65m0M%2BWuEUrlH0ODg7LA%2FpjEdzwCs9TarieRNmp%2BSTQBaa73XQGwxkx29C4bKgI9pC4DYai4ay0pMHHWffTWnZC%2FKautuXea79K99aCQ%2BgYag%2FVap0uTjGCGq%2F3%2BEtZ1xcJhTCBTjLF7NFGaud4C%2FpGSr%2FvHtqI0cTVFQsG30Ta9BGUuU2TG6CbbmvPwxt2%2B53%2FDFNZXlztDb3a80YMNKU0oMGOusBa3U4z%2B19Him7KBsB62nHOgIGcr5XtYLNjoDhVH3BFMMt3XsqpUFFwzm8nEH0Undp1AITkJcmLLD7CJIyAcqUpoOJap9x0FlnAghLt6U7KFalpY78hOI9BH0hlHkx2JHfR9%2F0iN4E0Vt%2FDwp6rh4hggO4dqdz%2Bu%2FQJG5XrJ60vaPxsMbszRNRxbORlzkk3XfLpOXRs%2FhW9s76xrP4%2FETPTpZC13UBUQAv31RvMK4w3RBuPLesdpc8QSvlJWypHTUSymLC2Tdp%2Fll3T217UZDHOj56XNQj%2FrBo%2Bfr5Q5NlmO5J8roYWPrux2cXUQ%3D%3D&X-Amz-Signature=2a9ae86c01a6db8dc2d43c96a4e20aaf9a9e195051f554101b4e45339bd75906"
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


    // const object3D = Asset.fromModule(response.data.fileurl)
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

          <Text> And there is an object Image!</Text>
          // <GLView
          //   style={{ flex: 1 }}
          //   onContextCreate={async (gl) => {
          //     const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
          //     const sceneColor = 0x6ad6f0;

          //     // Create a WebGLRenderer without a DOM element
          //     const renderer = new Renderer({ gl });
          //     renderer.setSize(width, height);
          //     renderer.setClearColor(sceneColor);

          //     const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
          //     camera.position.set(2, 5, 5);
          //     camera.zoom = 5
          //     const scene = new Scene();
          //     scene.fog = new Fog(sceneColor, 1, 10000);
          //     // scene.add(new GridHelper(10, 10));

          //     const ambientLight = new AmbientLight(0x101010);
          //     scene.add(ambientLight);

          //     const pointLight = new PointLight(0xffffff, 2, 1000, 1);
          //     pointLight.position.set(0, 200, 200);
          //     scene.add(pointLight);

          //     const spotLight = new SpotLight(0xffffff, 0.5);
          //     spotLight.position.set(0, 500, 100);
          //     spotLight.lookAt(scene.position);
          //     scene.add(spotLight);

          //     objectImage.scale.multiplyScalar(4);
          //     objectImage.rotation.y += 0.5;
          //     scene.add(objectImage);
          //     console.log(objectImage.position)
          //     camera.lookAt(0, 0, 0);

          //     function update() {
          //       //  objectImage.rotation.y += 0.05;
          //       //  objectImage.rotation.x += 0.025;
          //     }

          //     // Setup an animation loop
          //     const render = () => {
          //       timeout = requestAnimationFrame(render);
          //       update();
          //       renderer.render(scene, camera);
          //       gl.endFrameEXP();
          //     };
          //     render();
          //   }}
          // />
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


// Test with https://www.swiminn.com/f/13724/137244961/arena-powerskin-st-2.0-full-body-short-leg-limited-edition.jpg
    // 1. Upload to AWS
    // await imageToUrl()
    // 2. Send request to https://image2scan.3dmeasureup.com/createmesh
    // 3. Render response object
    // 3.1 Clicks next when satisfied
    // 4. Send off object url to https://api.3dmu.prototechsolutions.com/v3/models/measure
    // 5. Use response to start a GET request loop to https://api.3dmu.prototechsolutions.com/v3/models/metrics?requestId=<idFromEarlier>
