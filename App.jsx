import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AppNavigator from './routes/AppNavigator';
import SendForm from './components/SendForm';



const App = () => {
  return (
 
      <AppNavigator />


    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //   <View style={styles.container}>

    //     <SendForm />

    //   </View>
    // </TouchableWithoutFeedback>
  );
}

export default App

