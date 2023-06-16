import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';

class ModificarPerfil extends Component {
  constructor() {
    super()
    this.state = {
      usuario: [],
      infoUser: '',
      userInfo: [],
      contraseña: '',
      errorCambiado: false,
      errores: ''
    }
  }
  componentDidMount() {
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
      (docs) => {
        let user = []
        docs.forEach((doc) => {
          user.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        this.setState({
          usuario: user,
          nombre: user[0].data.nombreDeUsuario,
          biografia: user[0].data.bio
        })
      }
    )
  }

  actualizar(contraseña, nombre, biografia) {
    if (contraseña == '') {
      db.collection('users').doc(this.state.usuario[0].id).update({
        nombreDeUsuario: nombre,
        bio: biografia
      }).then(() => {
        this.props.navigation.navigate("ProfileData")
      })
    } else {
      firebase.auth().currentUser.updatePassword(contraseña)
        .then(() => {
          db.collection('users').doc(this.state.usuario[0].id).update({
            nombreDeUsuario: nombre,
            bio: biografia
          }).then(() => {
            this.props.navigation.navigate("Login")
          })
            .catch((error) => {
              console.log(error);
              this.setState({
                errorCambiado: true
              })
            })
        })
    }
  }

  render() {
    return (
      <View style={styles.CONTAINER}>

        <TouchableOpacity style={styles.arrow} onPress={() => this.props.navigation.navigate("ProfileData")}>
          <FontAwesome name="arrow-left" size={20} />
          Volve al perfil
        </TouchableOpacity>

        <View style={styles.editar}>
        <Text style={styles.texto} > Editar Perfil </Text>

        <TextInput style={styles.nuevo}
          placeholder='Ingresa nuevo nombre de usuario ...'
          keyboardType='default'
          onChangeText={texto => this.setState({ nombre: texto })}
          value={this.state?.nombre}
        />

        {/* <TextInput style={styles.nuevo}
          placeholder='Ingresa contraseña actual ...'
          keyboardType='default'
          secureTextEntry
          onChangeText={texto => this.setState({ currentPassword: texto })}
          value={this.state.currentPassword}
        /> */}

        <TextInput style={styles.nuevo}
          placeholder='Ingresa nueva contraseña ...'
          keyboardType='password'
          onChangeText={texto => this.setState({ contraseña: texto })}
          value={this.state.contraseña}
        />

        <TextInput style={styles.nuevo}
          placeholder='Biografia'
          keyboardType='default'
          onChangeText={texto => this.setState({ biografia: texto })}
          value={this.state?.biografia}
        />


        <  TouchableOpacity onPress={() => this.actualizar(this.state.contraseña, this.state.nombre, this.state.biografia)}>
          <Text style={styles.boton}> Editar Perfil </Text>
        </TouchableOpacity>

        </View>
      </View>

    )
  }
}
const styles = StyleSheet.create({

  editar: {
    backgroundColor: '#C2C9D7',
    flex: 1,
    color: 'black',
    padding: 15,
    overflow: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  texto: {
    fontWeight: 200,
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 40,
  },
  arrow: {
    margin: 10
  },
  boton: {
    borderWidth: 1,
    backgroundColor: 'black',
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
    padding: 5,
    marginTop: 20,
    fontSize: 15,
  },
  nuevo:{
    width: '100%',
    padding: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderBottomColor: 'black',
    borderLeftColor: 'rgb(238, 238, 238)',
    borderTopColor: 'rgb(238, 238, 238)',
    borderRightColor: 'rgb(238, 238, 238)',
    borderColor: 'black',
    backgroundColor: 'rgb(255,255,255)',
    margin: 4,
    marginTop: 20,
    color: 'rgb(0,0,0)',
    borderStyle: 'solid',
},

})
export default ModificarPerfil





