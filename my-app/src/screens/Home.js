import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posteos: [],
    
    }
  }

  componentDidMount() {
    db.collection('posts').onSnapshot(docs => {
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
      <View>
        <Text>Home</Text>
       
      </View>
    )
  }
}