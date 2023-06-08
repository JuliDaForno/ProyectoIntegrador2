import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Posteos from '../components/Posteos'
import BuscadorFiltrado from '../components/BuscadorFiltrado'
import Home from './Home'
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
    db.collection('users')
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
  filtrarPosteo(user){

  }
  render() {
    return (
      <View >
        <Text>Buscador de perfiles</Text>  
        <BuscadorFiltrado actualizador= {(data) => this.actualizadorDeEstado(data)} fuente = {this.state.postBackup} filtrador= {(user) =>this.state.filtrarPosteo(user)}/> 
        <FlatList
        data={this.state.posts}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({ item }) => <Text style = {styles.users}>{item.data.owner} / {item.data.nombreDeUsuario}</Text>}
      />
      

        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  users:{
    backgroundColor: '#cbe8aa',
    borderRadius: '10px',
    margin: '10px',
    textAlign: 'center'
  }
})

export default BuscadorUsuarios
