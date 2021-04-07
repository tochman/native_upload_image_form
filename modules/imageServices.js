import * as ImagePicker from 'expo-image-picker'

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