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
            <View style = {styles.body}>
                <TextInput
                    placeholder='Ingresa tu email'
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    style={styles.input}
                >
                </TextInput>

                <TextInput
                    placeholder='Ingresa tu password'
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
        margin: 16
    },
    input: {
        borderWidth: 1,
        borderColor: '#3d3d3d',
        marginTop: 24,
        height: 24,
        padding: 5
    },
    boton: {
        marginTop: 32,
        backgroundColor: 'pink',
        padding: 10,
        borderRadius: 20,
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    body:{
        backgroundColor: 'AAD4E8',
    }
})
export default FormLogin
