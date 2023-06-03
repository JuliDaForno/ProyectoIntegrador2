import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'

class MyCamera extends Component {
    constructor (props){
        super(props)
        this.state= {
          mostrarCamara: false,
          fotoTomada: ''
        }
        this.metodosCamara 
    }
  
    componentDidMount(){
      Camera.getCameraPermissionsAsync()
      .then(resp => this.setState({mostrarCamara: true}))
      .catch(err=> console.log(err))
    }
    
  render() {
    return (
      <View style={styles.container}>
        <Camera
        style={styles.camara}
        type= {Camera.Constants.Type.back}
        ref={(metodosComponente)=>this.metodosCamara = metodosComponente}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camara: {
    height: 250
  }
})

export default MyCamera