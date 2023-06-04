import { Text, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../firebase/config'
import Home from './Home'
import Post from '../components/Post'


class ProfileUsers extends Component {
  constructor(props){
    super(props)
    this.state={
        userInfo:{},
        props: props,
        posteos:[]
    }
}
componentDidMount(){
  db.collection('users').where('owner', '==', this.state.props.route.params.email).onSnapshot(
    docs => {
        docs.forEach(doc => {
            this.setState({
                userInfo: doc.data()
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
        <TouchableOpacity
        onPress={()=> this.props.navigation.navigate('HomeMenu')}
        ></TouchableOpacity>
        <Text>ProfileEdit</Text>
        <FlatList
        data={this.state.posteos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item})=> <Home data= {item}/>} /> 
      </View>
    )
  }
}

export default ProfileUsers