import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Posteos from '../components/Posteos'
import { FontAwesome } from "@expo/vector-icons";

import BuscadorFiltrado from '../components/BuscadorFiltrado'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    
    }
  }
  actualizadorDeEstado(data){
    this.setState({
        posts:data
    })
}

  componentDidMount() {
    db.collection('posts')
    .orderBy('createdAt', 'desc')
    .onSnapshot(docs => {
      let arrDocs = []

      docs.forEach(doc => arrDocs.push({
        id: doc.id,
        data: doc.data()
      }))

      this.setState({
        posts: arrDocs,

      })
    })
  }
  
  render() {
    return (
     
      <View style= {styles.container}>
       <View style={styles.isa}> <FontAwesome name="camera" size={24} color="violet" /> < Text style= {styles.insta}>InstaPic</Text>
 </View>
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
    flex: 1,
    backgroundColor: '#E0E4EC'
  
  },
  home:{
    color: 'white'
  },
  insta:{
    color: 'black',
    textAlign: 'left',
    fontSize: 25,

    
  },
  isa:{
    flexDirection: 'row'
  }
  
})