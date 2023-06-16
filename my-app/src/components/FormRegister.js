import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, } from "react-native";
import React, { Component } from "react";
import { auth, db } from '../firebase/config'


class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputMail: '',
            inputPassword: '',
            nombreDeUsuario: '',
            bio: '',
            FotoPerfil: '',
            error: ''
        }
    }
    actualizarFotoPerfil(fotoPerfil) {
        this.setState({
            FotoPerfil: fotoPerfil
        })
    }

    registrarUsuario(mail, password, bio, FotoPerfil, nombreDeUsuario) {
        auth.createUserWithEmailAndPassword(mail, password)
            .then(data => {
                console.log('Entramos a la promesa del create')
                this.props.navigation.navigate('HomeMenu')

                db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    bio: bio,
                    fotoPerfil: FotoPerfil,
                    nombreDeUsuario: nombreDeUsuario,
                })
                    .then((res) =>{
                        this.setState({
                        inputMail: '',
                        inputPassword: '',
                        nombreDeUsuario: '',
                        bio: '',
                        FotoPerfil: '',
                        error: ''  
                        })
                    }
                        )
                    .catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err)
                this.setState({ error: err.message })
            })
    }


    render() {
        return (
            <View style={styles.body}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Digite su email'
                    keyboardType="email-adress"
                    onChangeText={(text) => this.setState({ inputMail: text })}
                    value={this.state.inputMail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Digite su contraseña'
                    onChangeText={(text) => this.setState({ inputPassword: text })}
                    value={this.state.inputPassword}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Cree su nombre de usuario'
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ nombreDeUsuario: text })}
                    value={this.state.nombreDeUsuario}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Escriba una bio'
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ bio: text })}
                    value={this.state.bio}
                />

                {this.state.inputMail && this.state.inputPassword && this.state.nombreDeUsuario && this.state.error == '' ?
                    (<TouchableOpacity style={styles.btn} onPress={() => this.registrarUsuario(this.state.inputMail, this.state.inputPassword, this.state.bio, this.state.FotoPerfil, this.state.nombreDeUsuario)}>
                        <Text style={styles.btnText}>Registrarme</Text>
                    </TouchableOpacity>)
                    : this.state.error ?
                        (
                            <View>
                                <Text style={styles.error}>{this.state.error}</Text>
                                <TouchableOpacity style={styles.btn} onPress={() => this.registrarUsuario(this.state.inputMail, this.state.inputPassword, this.state.bio, this.state.FotoPerfil, this.state.nombreDeUsuario)}>
                        <Text style={styles.btnText}>Registrarme</Text>
                    </TouchableOpacity>
                            </View>
                        )
                        :
                        (
                            <View>
                                <Text style={styles.alert}>Los campos de email, contraseña y nombre de usuario son obligatorios</Text>
                                <TouchableOpacity style={styles.btn} onPress={() => { }}>
                                    <Text style={styles.btnText}>Registrarme</Text>
                                </TouchableOpacity>
                            </View>
                        )

                }



            </View>
        )
    }
}
export default FormRegister

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#9E68F0',
        marginTop: 24,
        height: 24,
        padding: 5,
        color: 'white',
        flex: 1,
    },
    title: {
        fontWeight: 600,
        color: 'black',
        fontSize: 32,
        textAlign: 'center',
        titleBottom: 20
    },
    body: {
        flex: 1,
        backgroundColor: 'white',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center',
    },
    btn: {
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: '#A3A0FD',
            margin: 10,
            color: 'black',
            padding: 10,
            textAlign: 'center',
            borderRadius: 8
          },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
    },
    alert: {
        color: 'red',
        fontWeight: 'bold',
    },
    error: {
        color: 'orange',
        fontWeight: 'bold'
    },
    camara: {
        flex: 1
    },
    input:{
        color: 'rgb(0,0,0)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10
    }
})