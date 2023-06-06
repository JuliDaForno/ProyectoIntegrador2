import { Text, View, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import React, {Component} from "react";
import {auth, db} from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputMail: '', 
            inputPassword: '',
            nombreDeUsuario:'',
            bio:'',
            FotoPerfil:'',
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
      <View style ={styles.body}>
        <Text style= {styles.body}>Registrate!!</Text>
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
        <TextInput
        style = {styles.input}
        placeholder= 'Cree su nombre de usuario'
        keyboardType="default"
        onChangeText={(text) => this.setState({nombreDeUsuario:text})}
        value={this.state.nombreDeUsuario}
        />
        <TextInput
        style = {styles.input}
        placeholder= 'Escriba una bio'
        keyboardType="default"
        onChangeText={(text) => this.setState({bio:text})}
        value={this.state.bio}
        />

        { this.state.inputMail && this.state.inputPassword && this.state.nombreDeUsuario ?
        <TouchableOpacity style={styles.btn} onPress={()=>this.registrarUsuario(this.state.inputMail, this.state.inputPassword)}>
        <Text style = {styles.btnText}> Registrarme</Text> 
        </TouchableOpacity>
     :
            <Text style={styles.alert}>Los campos de email, contraseña y nombre de usuario deben ser obligatorios</Text>
            
        }


        
      </View>
    )
  }
}
export default FormRegister

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor: 'pink',
        marginTop: 24,
        height:24,
        padding:5,
        color: 'white'
    },
    body:{
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
       
    },
    btn:{
        marginTop:32,
        backgroundColor: 'black',
        padding: 10,
        borderRadius:20,
        color: 'white'
    },
    btnText:{
        textAlign:'center',
        fontWeight:'bold',
        color:'white'
    },
    alert:{
        color: 'pink',
        fontWeight: 'bold',
    }
})