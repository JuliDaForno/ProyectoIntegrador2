import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import MyCamera from '../components/MyCamera'

import {db, auth} from '../firebase/config'


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

  actualizarDescripcion(text){
    this.setState({
      descripcion: text
    })
  }

  crearPosteo({descripcion, foto, likes, comments}){
    db.collection('posts').add({
      owner: auth.currentUser.email,
      descripcion: descripcion,
      foto: foto,
      createdAt: Date.now(),
      likes: likes,
      comments: comments,
    })
    .then((resp)=> {
      this.props.navigation.navigate('Home')
    })
    .catch(err => console.log(err))

  }

  render() {
    return (
      <View>
       <FormPost stateDescripcion={this.state.descripcion} actualizarDescripcion= {(text) => this.actualizarDescripcion(text)} />
       <TouchableOpacity
       onPress= {()=> this.crearPosteo({
        descripcion: this.state.descripcion,
        foto: this.state.foto,
        likes: this.state.comments
       })}
       >

       </TouchableOpacity>
      </View>
    )
  }
}

export default NewPost

/*         {
          this.state.foto === '' ?
            <MyCamera />
            :
            <Text>NewPost</Text>
        } */