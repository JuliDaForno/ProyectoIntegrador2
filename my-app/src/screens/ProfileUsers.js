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
      infoUser: [],
        props: props,
        posteos:[]
    }
}
componentDidMount(){
  db.collection('users')
  .where('owner', '==', this.state.props.route.params.email).onSnapshot(
    docs => {
      let arrUser=[]
        docs.forEach(doc => {
            arrUser.push({
              id: doc.id,
              data: doc.data()
            })
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
    
    return (
      <View>
        {this.state.unfoUser !== ''?
        <>
                <TouchableOpacity
        onPress={()=> this.props.navigation.navigate('HomeMenu')}
        ></TouchableOpacity>
        <Text>{this.state.data.data.owner}</Text>
        <FlatList
        data={this.state.posteos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item})=> <Home data= {item}/>} /> </>
:
      null
      }
       <Posteos
       data = {this.state.posteos}
       navigation = {this.props.navigation}/> 
      </View>

    )
  }
}

export default ProfileUsers