import React, { useState, useEffect } from 'react'
import { globals } from '../styles/globals'
import { AWS_KEY, AWS_SECRET, AWS_REGION, AWS_BUCKET, API_KEY_3D } from '@env'
import uuid from 'react-native-uuid'
import axios from 'axios'
import * as FileSystem from 'expo-file-system'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { RNS3 } from 'react-native-aws3';

const FormReceiver = ({ route, navigation }) => {
  const { height, photo } = route.params.data
  const [loading, setLoading] = useState(true)
  const [objectImage, setObjectImage] = useState(null)
  const [measurements, setMeasurements] = useState()

  const uploadToAWS = async (uri, prefix, filename, mediaType) => {
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
    // let imageUrl
    // await RNS3.put(file, options).then(response => {
    //   if (response.status !== 201)
    //     throw new Error("Failed to upload image to S3");
    //   imageUrl = response.body.postResponse
    // })

    let response = await RNS3.put(file, options)
    if (response.status !== 201) {
      throw new Error("Failed to upload image to S3");
    }
    let imageUrl = response.body.postResponse
    return imageUrl
  }

  const getMeasurements = async () => {
    let imageUrl = await uploadToAWS(photo.uri, 'images', 'png', 'image/png')
    console.warn('Image uploaded to AWS: ' + imageUrl.location)
    // console.log(imageUrl.location)

    // Request to turn 2D into 3D
    // let imageMock = "https://2d23d-staging.s3.amazonaws.com/3D%2F2ab2c32f-e258-45d7-a22d-5f9ccef64489.png"
    let params1 = {
      height: height,
      imageurl: imageUrl.location
    }
    let renderedObject, objUrl
    try {
      console.log(`Sending 3D request with params: ${params1.imageurl}`)

      // Uploads object to AWS
      renderedObject = await axios.post('https://image2scan.3dmeasureup.com/createmesh', params1)
      // Creates a folder
      let folder = FileSystem.cacheDirectory + uuid.v4()
      await FileSystem.makeDirectoryAsync(folder, { intermediates: true })

      // Downloads obj into that folder
      let objFile = await FileSystem.downloadAsync(renderedObject.data.fileurl, folder)
      console.log(objFile)

      // Uploads the obj to AWS
      objUrl = await uploadToAWS(objFile.uri, 'objects', 'obj', 'application/x-tgif')
      console.log(objUrl)
      setObjectImage(objFile)
    } catch (error) {
      console.error(error)
      debugger
      return
    }

    // Request to create measurements
    let params2 = {
      "type": "all",
      "fileurl": objUrl.location,
      "auto_align": true,
      "filesource": "url",
      "filetype": "obj",
      "output": "json"
    }
    let headers = {
      "x-api-key": API_KEY_3D
    }
    let response2
    Measurements are mocked out.Comment back in below and change requestId param in line 114
    // try {
    //   console.log(`Sending create measurements request with params: ${params2}`)
    //   response2 = await axios.post('https://api.3dmu.prototechsolutions.com/v3/models/measure', params2, { headers: headers })
    //   console.log(response2)
    //   debugger
    // } catch (error) {
    //   console.log(error)
    //   return
    // }

    // Request to retrieve measurements

    try {
      console.log(`Sending GET request to retrieve measurements`)
      let mockId = "73e30ee0-9dd4-11eb-9c69-0142fbeb1cb3"
      let measurements = await axios.get(`https://api.3dmu.prototechsolutions.com/v3/models/metrics?requestId=${mockId}`, { headers: headers })
      console.log(measurements)

      let filteredLength = measurements.data.body.result.metrics.surfaceLengths.filter(item => item.length)
      setMeasurements(filteredLength)
      setLoading(false)
      debugger
    } catch (error) {
      console.log(error)
      return
    }
  }

  useEffect(() => {
    getMeasurements()
  }, [navigation])

  return (
    <View style={styles.formContainer}>
      {loading ? (
        <Text style={styles.loaderText}>Fetching your measurements, just a moment!</Text>
      ) : (
          <Text style={globals.h1}>Your Measurements</Text>
        )}


      <ActivityIndicator style={styles.loader} size='large' animating={loading} />
      {measurements && (
        <FlatList
          data={measurements}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.listItem}>{item.label}</Text>
              <Text style={[styles.listItem, styles.length]}>{(item.length * 100).toFixed(1)} cm</Text>
            </View>
          )}
        />
      )}

    </View>
  )
}

export default FormReceiver

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 25
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: '#333',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    marginHorizontal: 15,
    marginVertical: 10,
    flex: 3
  },
  length: {
    fontWeight: 'bold',
    flex: 1,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center'
  },
  loaderText: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
  }
})
