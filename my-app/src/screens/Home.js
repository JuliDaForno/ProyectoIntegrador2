import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Posteos from '../components/Posteos'
import Post from '../components/Post'
import { FontAwesome } from "@expo/vector-icons";


import BuscadorFiltrado from '../components/BuscadorFiltrado'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      loader:false
    
    }
  }
  actualizadorDeEstado(data){
    this.setState({
        posts:data,
        
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
        loader: true
      })
    })
  }
  
  render() {
    return (
     
      <View style= {styles.container}>
       <View style={styles.isa}> <FontAwesome name="camera" size={24} color="violet" /> < Text style= {styles.insta}>InstaPic</Text>
 </View>
 {this.state.loader?
                <FlatList  data={this.state.posts} keyExtractor={(data)=>data.id} renderItem={({item})=>< Post data={item}{...this.props}/>}
                >
                    
                </FlatList>: <ActivityIndicator size="large" color="black" style={styles.loader}/>}
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
  },
  loader:{
    marginTop: 250,
  }
  
})