import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
      owner: false,
      cantidadDeLikes: 
      this.props.data.data.likes.length
    };
  }

  componentDidMount() {
    if (this.props.data.data.likes) {
      let estaMiLike = this.props.data.data.likes.includes(
        auth.currentUser.email
      );
      if (estaMiLike === true) {
        this.setState({
          isLiked: true,
         
      
        });
      }
      if (auth.currentUser.email === this.props.data.data.owner){
        this.setState({
            owner: true
        })
    }
    }
  }

  like() {
    db.collection("posts")
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then((resp) => {
        this.setState({
          isLiked: true,
          cantidadDeLikes:
          this.state.cantidadDeLikes +1,
        });
      })
      .catch((err) => console.log(err));
  }

  unlike() {
    db.collection("posts")
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then((resp) =>
        this.setState({
          isLiked: false,
          cantidadDeLikes:
          this.state.cantidadDeLikes -1
        })
      )
      .catch((err) => console.log(err));
  }
  deletePost() {
    db.collection("posts")

      .doc(this.props.data.id)

      .delete({})
      .then(() => {
        console.log("Post eliminado");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    console.log("props desde post");
    console.log(this.props);
    return (
      <View style={styles.container}>
        < View style={styles.cadaPost}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileUsers', { email: this.props.data.data.owner })}>
          <Text style = {styles.owner}>{this.props.data.data.owner}</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: this.props.data.data.foto }}
          style={styles.img}
        />

        <View style={styles.commentContainer}>
        <FontAwesome
                name='comment'
                size={24}
                color='#D8E7EB'
              />
        <Text style={styles.descripcion}>{this.props.data.data.descripcion}</Text>
        {console.log(this.props.data.data)}
        </View>
       
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Comments', {id: this.props.data.id })}
          >
            <Text style={styles.comment}>
              Agregar comentario
            </Text>
            </TouchableOpacity>
        <View> 
          {this.state.owner ? <TouchableOpacity
          
          onPress={() =>
            
            this.props.navigation.navigate("ProfileData", {
              
              email: this.props.data.data.owner,
            })
          }
        >
          
        </TouchableOpacity> : <TouchableOpacity
       
          onPress={() =>
            this.props.navigation.navigate("ProfileUsers", {
              email: this.props.data.data.owner,
            })
          }
        >
        </TouchableOpacity>}
        </View>
        {console.log(this.props.data.data)}
        <Text style ={styles.info}>{this.state.cantidadDeLikes} likes</Text>
        {this.state.isLiked ? (
          <TouchableOpacity onPress={() => this.unlike()}>

            <FontAwesome name="heart" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.like()}>
            <FontAwesome name="heart-o" size={24} color="red" />
            
          </TouchableOpacity>
          
        )}
        <View >
      
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Comments", {
                id: this.props.data.id,
              })
            }
          >
          </TouchableOpacity>
        </View>
        {console.log(this.state.owner, 'quien')}
        {this.state.owner ? (
          <TouchableOpacity onPress={() => this.deletePost()}>
            <FontAwesome name="trash-o" size={24} color="red" />
          </TouchableOpacity>
        ) : null}
      </View>
      </View>
      </View>
) 
}
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    height: 300,
    width: 300,
    borderRadius: 5, 
  },
  cadaPost: {
    margin: 7,
    padding: 50,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#7F7F80',
    backgroundColor: '#C2C9D7'

  },
  comment: {
    padding: 10,
    backgroundColor: '#B5AACC',
    borderRadius:10,
    margin: 10,

  },
  descripcion:{
    padding: 10,
    fontSize: 18,
    margin: 10,
    backgroundColor: '#DDDBE2',
    borderColor: '#C2C2C3'
  },
  owner:{
    padding: 10,
    margin: 10,
    fontWeight: 'bold', 
    fontSize: 15,
    backgroundColor: '#9CADCE',
    borderRadius:10,
    color: '#10254E'
  },
  commentContainer:{
    flexDirection: 'row', 
    alignItems: 'center' ,
    width: 300,
    color: 'white',
    //backgroundColor: 'black',
  },
  img: {
    height: 200,
  },
  info:{
    color: 'white',
    
    
    
  },
  nombre:{
    color:"white"
  }
  
  
  });


export default Post;

