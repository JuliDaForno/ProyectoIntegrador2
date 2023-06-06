import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Posteos from '../components/Posteos'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    
    }
  }

  componentDidMount() {
    db.collection('posts')
    .onSnapshot(docs => {
      let arrDocs = []

      docs.forEach(doc => arrDocs.push({
        id: doc.id,
        data: doc.data()
      }))

      this.setState({
        posts: arrDocs
      })
    })
  }
  
  render() {
    return (
      <View style= {styles.container}>
        <Text>Home</Text>
       
        <Posteos
            data={this.state.posts}
            navigation= {this.props.navigation}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})