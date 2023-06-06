import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'


class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLiked: false,
      owner: false,
     

    }
  }

  componentDidMount() {
    let estaMiLike = this.props.data.data.likes.includes(auth.currentUser.email)
    if (estaMiLike === true) {
      this.setState({
        isLiked: true
      })
    }
  }

  like() {
    db.collection('posts')
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then((resp) => {
        this.setState({
          isLiked: true
        })
      })
      .catch(err => console.log(err))

  }

  unlike() {
    db.collection('posts').doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then((resp) => this.setState({
        isLiked: false
      }))
      .catch(err => console.log(err))


  }
  deletePost(){
    db.collection("posts")
    .doc(this.props.data.id)
    .delete()
    .then(() => {
        console.log('Post eliminado');
    }).catch((e) => {
        console.log(e);
    });
}


  render() {
    console.log('props desde post')
    console.log(this.props)
    return (
      <View style={styles.container}>
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileUsers', { email: this.props.data.data.owner })}>
          <Text>{this.props.data.data.owner}</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: this.props.data.data.foto }}
          style={styles.img}
        />

        <Text>Post</Text>

        <Text>{this.props.data.data.descripcion}</Text>
        {console.log(this.props.data.data)}
       
        {
          this.state.isLiked ?
            <TouchableOpacity
              onPress={() => this.unlike()}
            >
              <FontAwesome
                name='heart'
                size={24}
                color='red'
              />
            </TouchableOpacity>
            
            :

            <TouchableOpacity
              onPress={() => this.like()}
            >
              <FontAwesome
                name='heart-o'
                size={24}
                color='red'
              />
            </TouchableOpacity>
        }
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Comments', {id: this.props.data.id })}
          >
            <Text>
              Agregar comentario
            </Text>
          </TouchableOpacity>
          
        </View>
        <TouchableOpacity onPress={() => this.deletePost()}>
                                <FontAwesome name="trash-o" size={24} color="black" />
                            </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15
  },
  img: {
    height: 200
  }
})


export default Post

