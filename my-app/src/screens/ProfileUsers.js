import { Text, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../firebase/config'
import Home from './Home'
import Post from '../components/Post'
import Posteos from '../components/Posteos'


class ProfileUsers extends Component {
  constructor(props){
    super(props)
    this.state={
      infoUser: '',
        props: props,
        posteos:[]
    }
}
componentDidMount(){
  console.log(this.props)
  db.collection('users')
  .where('owner', '==', this.state.props.route.params.email).onSnapshot(
    docs => {
      let arrUser=[]
        docs.forEach(doc => {
            arrUser.push({
              id: doc.id,
              data: doc.data()
            })
            console.log(arrUser);
            this.setState({
              infoUser: arrUser[0]
            })
            
        })
    })
db.collection('posts').where('owner', '==', this.state.props.route.params.email).onSnapshot(
  docs => {
      let posts = [];
      docs.forEach(doc => {
          posts.push({
              id: doc.id,
              data: doc.data()
          })
      })
      this.setState({
          posteos: posts
      })
  }
)

}
  

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        {this.state.infoUser !== ''?
        
        <>
           
        <Text style = {styles.info}>{this.state.infoUser.data.owner}</Text>

        <Posteos
       data = {this.state.posteos}
       navigation = {this.props.navigation}/> 
         </>
:
      null
      }
       
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container:{
   backgroundColor: 'black',
   flex:1
  },
  info:{
    color: 'white'
  }
 
})

export default ProfileUsers