import { Text, View, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import React, {Component} from "react";
import {auth, db} from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputMail: '', 
            inputPassword: ''
        }
    }

    registrarUsuario(mail, password){ 
        auth.createUserWithEmailAndPassword(mail, password)
        .then (data =>{
            console.log('Entramos a la promesa del create')
            this.props.navigation.navigate('HomeMenu')

            db.collection('users').add({
                owner: auth.currentUser.email,
                createdAt: Date.now()
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        
        })
        .catch(err => console.log(err))
    }
  render() {
    return (
      <View>
        <Text>Registrate!!</Text>
        <TextInput
        style = {styles.input}
        placeholder= 'Digite su email'
        keyboardType="email-adress"
        onChangeText={(text) => this.setState({inputMail:text})}
        value={this.state.inputMail}
        />
        <TextInput
        style= {styles.input}
        placeholder= 'Digite su contraseña'
        onChangeText={(text) => this.setState({inputPassword: text})}
        value = {this.state.inputPassword}
        secureTextEntry= {true}
        />
        <TouchableOpacity style={styles.btn} onPress={()=>this.registrarUsuario(this.state.inputMail, this.state.inputPassword)}>
           <Text style = {styles.btnText}> Registrarme</Text> 
        </TouchableOpacity>
        
      </View>
    )
  }
}
export default FormRegister

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor: '#3d3d3d',
        marginTop: 24,
        height:24,
        padding:5
    },
    btn:{
        marginTop:32,
        backgroundColor: '#54d0e0',
        padding: 10,
        borderRadius:20,
    },
    btnText:{
        textAlign:'center',
        fontWeight:'bold'
    }
})