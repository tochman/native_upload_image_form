import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native';


export const handleChoosePhoto = async (setPhoto) => {
  console.log('Uploading')
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickedPhoto = await ImagePicker.launchImageLibraryAsync();
  if (pickedPhoto.cancelled) {
    return
  }
  console.log(pickedPhoto)

  // Turns base64 into a File for web
  if (Platform.OS === 'web') {
    await fetch(pickedPhoto.uri)
      .then(res => res.blob())
      .then(blob => {
        const fd = new FormData();
        const file = new File([blob], "testphoto.jpeg");
        fd.append('image', file)

        pickedPhoto = {
          uri: URL.createObjectURL(file)
        }
      })
  }
  setPhoto(pickedPhoto)
}

export const handleTakePhoto = async (setPhoto) => {
  console.log('Taking new photo')
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera is required!");
    return;
  }

  let newPhoto = await ImagePicker.launchCameraAsync({ allowsEditing: true })
  if (newPhoto.cancelled) {
    return
  }

  setPhoto(newPhoto)
}