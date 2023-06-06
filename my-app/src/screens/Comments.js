import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormComments from '../components/FormComments'
import { db } from '../firebase/config'
import { AntDesign } from '@expo/vector-icons';

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    db.collection('posts')
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {
        this.setState({
          data: doc.data()
        }, () => console.log(this.state.data))
      })
  }

  render() {

    return (
      <View>
        <Text>Aqui vamos a cargar todos los comentarios del posteo</Text>
        <FlatList
          style={styles.comentarios}
          data={this.state.data.comments}
          keyExtractor={item => item.createdAt.toString}
          renderItem={({ item }) => <Text>{item.comentario}</Text>}
        />
        <FormComments idPost={this.props.route.params.id} />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('HomeMenu')}
        >
          <Text style={styles.btnText}>Volver al feed
          <AntDesign name='arrowleft' size={24} color='black' />
          </Text>
        </TouchableOpacity>
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
  btnText:{
    textAlign:'center',
    fontWeight:'bold',
    color:'white'
},
btn:{
  marginTop:32,
  backgroundColor: '#54d0e0',
  padding: 10,
  borderRadius:20,
  marginHorizontal: 10, 
  paddingVertical: 10, 
}
})

export default Comments