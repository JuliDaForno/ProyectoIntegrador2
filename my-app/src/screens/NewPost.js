import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { db, auth } from '../firebase/config'
import MyCamera from '../components/MyCamera'

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      descripcion: '',
      foto: '',
      likes: [],
      comments: []
    }
  }

  actualizarDescripcion(text) {
    this.setState({
      descripcion: text
    })
  }

  actualizarEstadoFoto(urlFoto) {
    this.setState({
      foto: urlFoto
    })
  }

  crearPosteo({ descripcion, foto, likes, comments }) {
    db.collection('posts').add({
      owner: auth.currentUser.email,
      descripcion: descripcion,
      foto: foto,
      createdAt: Date.now(),
      likes: likes,
      comments: comments,
    })
      .then((resp) => {
        this.props.navigation.navigate('Home')
      })
      .catch(err => console.log(err))

  }

  render() {
    return (
      <View style={styles.container} > 
        {
          this.state.foto === '' ?
            <MyCamera
              actualizarEstadoFoto={() => this.actualizarEstadoFoto(urlFoto)}
            />
            :
            <>
              <FormPost stateDescripcion={this.state.descripcion} actualizarDescripcion={(text) => this.actualizarDescripcion(text)} />
              <TouchableOpacity
                onPress={() => this.crearPosteo({
                  descripcion: this.state.descripcion,
                  foto: this.state.foto,
                  likes: this.state.likes,
                  comments: this.state.comments
                })}
              >
                <Text> Enviar el posteo</Text>
              </TouchableOpacity>
            </>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})

export default NewPost