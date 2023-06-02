import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import { auth } from '../firebase/config'

class Register extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('Login')
      }
    })
  }

  render() {
    return (
      <View>
        <FormRegister navigation={this.props.navigation} />
        <Text>Ya tenes una cuenta</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text>Ingresa aquí!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeMenu')}
        >
          <Text>HOME</Text>
        </TouchableOpacity>

      </View>
    )
  }
}
export default Register