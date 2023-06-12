import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'

class Login extends Component {

  render() {
    return (
      <View style={styles.input}>
        <FormLogin navigation={this.props.navigation} />
        <Text style={styles.btnText}>
          No tenes cuenta?
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text
              style={styles.boton}
            >
              Registrate Aca!
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({

  boton: {
    marginTop: 32,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black'
  }

})
export default Login