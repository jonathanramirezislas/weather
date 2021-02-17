import React, {useState} from 'react';
import {
  Alert,
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Form = ({busqueda, setBusqueda, setConsultar}) => {
  const {pais, ciudad} = busqueda;

  //Animation    1:means the scale
  const [animacionboton] = useState(new Animated.Value(1));

  const consultarClima = () => {
    if(pais.trim() === '' || ciudad.trim() === '') {
        mostrarAlerta();
        return;
    }
  // consultar la api
    setConsultar(true);
  }

  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'Agrega una ciudad y país para la búsqueda',
        [{ text: 'Entendido '}]
    )
  }

  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      toValue: 0.75,
      useNativeDriver: true,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      friction: 4, //bouncing
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionboton}],
  };
  //end animation

  return (
    <>
      <View style={styles.form}>
        <View>
          <TextInput
            value={ciudad}
            onChangeText={ ciudad => setBusqueda({ ...busqueda, ciudad }) }

            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor="#666"
          />
        </View>
        <View>
          <Picker
            selectedValue={pais}
            onValueChange={ pais => setBusqueda({ ...busqueda, pais}) }
            itemStyle={{height: 120, backgroundColor: '#FFF'}}>
            <Picker.Item label="-- Seleccione un país --" value="" />
            <Picker.Item label="Estados Unidos" value="US" />
            <Picker.Item label="México" value="MX" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="España" value="ES" />
            <Picker.Item label="Perú" value="PE" />
          </Picker>
        </View>

        <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
          onPress={ () => consultarClima() }
          >
          <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    marginHorizontal: '2.5%',
  },
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    alignSelf: 'center',
    width: '75%',
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Form;
