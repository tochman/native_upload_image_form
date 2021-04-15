import React from 'react'
import { StyleSheet, Text, View, Modal, Image } from 'react-native'
import StandardButton from '../shared/StandardButton'

const CustomModal = ({ open, setOpen, data }) => {

  const closesModal = () => {
    setOpen(false)
  }

  return (
    <Modal
      visible={open}
      animationType='slide'
      transparent={true}
    >
      <View style={styles.modalContent}>

        {data && <Text style={{ fontSize: 20 }}>Height: {data.height} cm.</Text>}
        {data && <Image source={{ uri: data.photo['uri'] }} style={styles.image} />}
        <StandardButton title='Go back' onPress={closesModal} />

      </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  modalContent: {
    height: '80%',
    width: '80%',
    top: '10%',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  image: {
    height: '70%',
    width: '80%',
    marginTop: 20,
    transform: [{ rotateZ: '180deg' }]
  }
})
