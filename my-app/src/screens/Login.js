import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'

class Login extends Component {

  render() {
    return (
      <View style={styles.input}>
        <Text style={styles.title}>Login</Text>
        <FormLogin navigation={this.props.navigation} />
        <Text style={styles.btnText}> No tenes cuenta?
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.boton}> Registrate Aca! </Text>
          </TouchableOpacity>
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({

  boton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#A3A0FD',
    margin: 10,
    color: 'black',
    padding: 10,
    textAlign: 'center',
    borderRadius: 8
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black'
  },
  title: {
    marginTop: 50,
    marginBottom: 15,
    fontWeight: 600,
    color: 'black',
    fontSize: 32,
    textAlign: 'center'
  }

})
export default Login