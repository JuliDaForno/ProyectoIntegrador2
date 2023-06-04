import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'

class Login extends Component {

  render() {
    return (
      <View>
        <FormLogin navigation={this.props.navigation} />
        <Text>
          No tenes cuenta? Registrate Aca
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text>
              egistrate Aca!
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    )
  }
}

export default Login