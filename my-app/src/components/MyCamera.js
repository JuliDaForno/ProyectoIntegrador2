import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { Camera, CameraType } from 'expo-camera'
import { storage } from '../firebase/config'


class MyCamera extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mostrarCamara: false,
      fotoTomada: ''
    }
    this.metodosCamara = null
  }

  componentDidMount() {
    Camera.requestCameraPermissionsAsync()
      .then(resp => this.setState({ mostrarCamara: true }))
      .catch(err => console.log(err))
  }

  tomarFoto() {
    this.metodosCamara.takePictureAsync()
      .then(fotoEnMemoria => {
        this.setState({
          fotoTomada: fotoEnMemoria.uri,
          mostrarCamara: false
        })
      })
      .catch(err => console.log(err))
  }

  aceptarFoto() {
    fetch(this.state.fotoTomada)
      .then(resp => resp.blob())
      .then(imagen => {
        const ref = storage.ref(`fotos/${Date.now()}.jpg`)
        ref.put(imagen)
          .then(() => {
            ref.getDownloadURL()
              .then((url) => this.props.actualizarEstadoFoto(url))
          })

      })
      .catch(err => console.log(err))
  }

  rechazarFoto() {
    this.setState({
      mostrarCamara: true,
      fotoTomada: ''
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.mostrarCamara && this.state.fotoTomada === '' ?
            <>
              <Camera
                style={styles.camara}
                type={CameraType.front}
                ref={(metodosComponente) => this.metodosCamara = metodosComponente}
              />
              <TouchableOpacity
                style={styles.sacarFoto}
                onPress={() => this.tomarFoto()}
              >
                <Text>
                  Tomar foto
                </Text>
              </TouchableOpacity>
            </>
            : this.state.mostrarCamara === false && this.state.fotoTomada !== '' ?
              <>
                <Image
                  source={{ uri: this.state.fotoTomada }}
                  style={styles.img}
                />
                <View>
                  <TouchableOpacity
                    style={styles.aceptarFoto}
                    onPress={() => this.aceptarFoto()}
                  >
                    <Text>
                      Aceptar foto
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.aceptarFoto}
                    onPress={() => this.rechazarFoto()}
                  >
                    <Text>
                      Rechazar foto
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
              :
              <View>
                <ActivityIndicator size='large' color='black' style={styles.loader}/>
                <Text style={styles.sinPermiso}>No tienes permisos para usar la Camara</Text>
              </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5AACC',
  },
  camara: {
    flex: 1,
    height: '300%',
    marginTop: 20
  },
  img: {
    flex: 1,
    height: '197%',
    marginTop: 40,
    marginBottom: 3
  },
  btn: {
    height: '20%',
    padding: 5,
    marginTop: 40
  },
  aceptarFoto: {
    borderStyle: 'solid',
    borderWith: 1,
    borderColor: 'black',
    backgroundColor: '#D7CAC7',
    marginHorizontal: 70,
    marginVertical: 10,
    padding: 15,
    textAlign: 'center',
    color: 'white',
    borderRadius: 7,
  },
  sacarFoto: {
    marginHorizontal: 100,
    marginVertical: 5,
    padding: 15,
    textAlign: 'center',
    borderColor: 'black',
    backgroundColor: '#D7CAC7',
    color: 'white',
    borderRadius: 7,
    borderStyle: 'solid',
  },
  sinPermiso: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    textAlign: 'center',
    borderColor: 'black',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 7,
    borderStyle: 'solid',
  },
  loader:{
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    marginTop: 300
  }

})

export default MyCamera