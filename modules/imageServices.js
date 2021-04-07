import * as ImagePicker from 'expo-image-picker'
import awsService from "./awsService";

export const handleChoosePhoto = async (setPhoto) => {
  console.log('Uploading')
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickedPhoto = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    base64: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (pickedPhoto.cancelled) {
    return
  }
  
  awsService.upload(pickedPhoto)
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