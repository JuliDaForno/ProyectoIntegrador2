import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { db, auth } from '../firebase/config'
import MyCamera from '../components/MyCamera'

class NewPosts extends Component {
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
      <View>
        {
          this.state.foto === '' ?
            <MyCamera />
            :
            <View>
              <FormPost stateDescripcion={this.state.descripcion} actualizarDescripcion={(text) => this.actualizarDescripcion(text)} />
              <TouchableOpacity
                onPress={() => this.crearPosteo({
                  descripcion: this.state.descripcion,
                  foto: this.state.foto,
                  likes: this.state.likes,
                  comments: this.state.comments
                })}
              >
                <Text>Enviar el posteo</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }
}

export default NewPosts

/*         {
          this.state.foto === '' ?
            <MyCamera />
            :
            <Text>NewPost</Text>
        } 
        
 */