import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../firebase/config'
import Home from './Home'


class ProfileEdit extends Component {
  constuctor(props){
        
    this.state={
        userData:{},
        props: props,
        posteos:[]
    }
}
componentDidMount(){
db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
    docs => {
docs.forEach(doc=>{
this.setState({
    userData:doc.data()
})
})
    }
)
db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
    docs =>{
        let posts=[];
        docs.forEach(doc => {
            posts.push({
                id: doc.id,
                data: doc.data()
            })
        });
        this.setState({
            posteos:posts
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

export default ProfileEdit