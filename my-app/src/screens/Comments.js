import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormComments from '../components/FormComments'
import { db } from '../firebase/config'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      comentarios: []
    }
  }

  componentDidMount() {
    db.collection('posts')
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {
        this.setState({
          data: doc.data(),
          comentarios:doc.data().comments.sort((a, b) => a.createdAt - b.createdAt).reverse() //esto es para que los comentarios aparezcan de manera ascendente
        }, () => console.log(this.state.data))
      })
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text>
            <AntDesign name='arrowleft' size={24} color='black' />
            HOME
          </Text>
        </TouchableOpacity>


        <FlatList
          style={styles.comentarios}
          data={this.state.comentarios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
                <FontAwesome name="comment" size={24} color="#D8E7EB" style={styles.comentarioDeUsuario}/>
                <Text style={styles.hola}>{item.owner} = {item.comentario}</Text>
            </View>
          )}

          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text>No hay comentarios aún. ¡Se el primero en comentar!</Text>
            </View>
          )}
        />
        <FormComments idPost={this.props.route.params.id} />


      </View>
    )
  }
}

const styles = StyleSheet.create({
  comentarios: {
    padding: 10,
    flexDirection: 'column',
    flex: 10,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  btn: {
    marginTop: 32,
    backgroundColor: '#54d0e0',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  arrow: {
    alignItems: 'start'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'rgb(255,255,255)',
    padding: 15,
    justifyContent: 'center',
    textAlign: 'center',
  },
  comentarios: {
    padding: 10,
    backgroundColor: '#B5AACC',
    borderRadius: 10,
    margin: 10,
  },
  commentContainer:{
    flexDirection: 'row', 
    alignItems: 'center' ,
    width: 300,
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comentarioDeUsuario: {
    marginLeft: 30
  }
})

export default Comments