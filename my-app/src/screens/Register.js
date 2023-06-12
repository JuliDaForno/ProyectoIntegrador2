import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
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
        this.props.navigation.navigate('HomeMenu') //rememberMe
      } 
    })
  }

  render() {
    return (
      <View >
        <FormRegister navigation={this.props.navigation} />
        <View style ={styles.container1}>
        <Text style={styles.boton}>Ya tenes una cuenta    <br></br></Text>
   
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}
        > <Text style ={styles.boton}>Ingresa aquí!</Text>

        </TouchableOpacity>
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
container1:{
  flexDirection: 'row',
  marginTop: 32,
  backgroundColor: '#9E68F0',
  padding: 10,
  borderRadius: 20,
  justifyContent: 'center',
}}
  )
export default Register