import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {auth} from '../firebase/config'


 class FormLogin extends Component {
    constructor(props){
    super(props)
    this.state = {
                email:'',
                 password:''
}

    }

    entrar(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then( resp => this.props.navigation.navigate('Feed'))
        .catch( err => console.log(err))
    }
  render() {
    return (
      <View>
    <TextInput
    placeholder='Ingresa tu email'
    keyboardType='email-address'
    value={this.state.email}
    onChangeText={(text)=> this.setState({email : text})}
    style={styles.input}
    >
    </TextInput>

    <TextInput
                    placeholder='Ingresa tu password'
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(text)=> this.setState({password : text})}
                    style={styles.input}
                />

<TouchableOpacity
                    style={styles.boton}
                    onPress={()=> this.entrar(this.state.email, this.state.password)}
                >
                    <Text>Ingresar</Text>
                </TouchableOpacity>
</View>
    
    )
  }
}
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:16,
        margin: 16
    },
    input:{
        borderWidth:1,
        borderColor: 'pink',
        borderRadius:5,
        marginTop:18,
        padding:12
    },
    boton:{
        marginVertical:32,
        backgroundColor:'red',
    }
})
export default FormLogin
