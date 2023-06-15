import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from '../firebase/config'


class FormLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    entrar(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(resp => this.props.navigation.navigate('HomeMenu'))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.body}>
                <TextInput
                    placeholder='Ingresa tu email ...'
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    style={styles.input}
                >
                </TextInput>

                <TextInput
                    placeholder='Ingresa tu contraseña ...'
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    style={styles.input}
                    secureTextEntry= {true}
                />

                <TouchableOpacity
                    style={styles.boton}
                    onPress={() => this.entrar(this.state.email, this.state.password)}
                >
                    <Text style={styles.btnText}>Ingresar</Text>
                </TouchableOpacity>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        margin: 16,
       
    },
    input: {
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10
    },
    boton: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#A3A0FD',
        margin: 10,
        color: 'white',
        padding: 10,
        textAlign: 'center',
        borderRadius: 8
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    body:{
        flex: 1,
        backgroundColor: 'white',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center',
    }
})
export default FormLogin
