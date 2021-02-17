
import React from 'react';
import {  StyleSheet, View,  TouchableWithoutFeedback } from 'react-native';

import Form from './components/Form';




const ocultarTeclado = () => {
  Keyboard.dismiss();
}



const App = () => {
  return (
    <TouchableWithoutFeedback onPress={ () => ocultarTeclado() }>
    <View style={[styles.app ]}>
        <View style={styles.contenido}>
          
          <Form/>

        </View>
    </View>
</TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
