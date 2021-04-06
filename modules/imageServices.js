import * as ImagePicker from 'expo-image-picker'

export const handleChoosePhoto = async (setPhoto) => {
  console.log('Uploading')
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();

  if (pickerResult.cancelled) {
    return
  }
  setPhoto(pickerResult)
}