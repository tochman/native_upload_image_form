import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from '../components/StartScreen'
import MeasurementsForm from '../components/MeasurementsForm'
import UploadImage from '../components/UploadImage';
import ObjectReceiver from '../components/ObjectReceiver';
import TestFile from '../components/TestFile'
import FormReceiver from '../components/FormReceiver';


const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Testing' component={TestFile} />
        <Stack.Screen name='Welcome' component={StartScreen} />
        <Stack.Screen name='Info' component={MeasurementsForm} />
        <Stack.Screen name='Upload Image' component={UploadImage} />
        <Stack.Screen name='Measurements' component={FormReceiver} />
        {/* <Stack.Screen name='3D Receiver' component={ObjectReceiver} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})
