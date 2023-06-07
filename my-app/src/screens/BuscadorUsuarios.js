import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Posteos from '../components/Posteos'
import BuscadorFiltrado from '../components/BuscadorFiltrado'

class BuscadorUsuarios extends Component {
constructor(props) {
    super(props)
    this.state = {
      posts: [],
      postBackup: [] 
    
    }
  }
  actualizadorDeEstado(data){
    this.setState({
        posts:data
    })
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
        posts: arrDocs,
        postBackup: arrDocs
      })
    })
  }
  
  render() {
    return (
      <View>
        <Text>Buscador de perfiles</Text>
        <BuscadorFiltrado actualizador= {(data) => this.actualizadorDeEstado(data)} fuente = {this.state.postBackup}/>
       
        <Posteos
            data={this.state.posts}
            navigation= {this.props.navigation}
        />
      </View>
    )
  }
}
export default BuscadorUsuarios
