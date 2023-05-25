import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import { auth } from '../firebase/config'

class Register extends Component {

    componentDidMount(){
        auth.onAuthStateChanged(user=>{
            if(user){
                //agregar navegación
            }
        })
    }

  render() {
    return (
      <View>
        <FormRegister // agregar navegación
        /> 
        <Text>Ya tenes una cuenta</Text>
        <TouchableOpacity onPress //agregar navegación 
        >
        <Text>Ingresa aquí!</Text>
        </TouchableOpacity> 
      </View>
    )
  }
}
export default Register