import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import Posteos from "../components/Posteos";
import BuscadorFiltrado from "../components/BuscadorFiltrado";
import Home from "./Home";

class BuscadorUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postBackup: [],
    };
  }
  actualizadorDeEstado(data) {
    this.setState({
      posts: data,
    });
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let arrDocs = [];

      docs.forEach((doc) =>
        arrDocs.push({
          id: doc.id,
          data: doc.data(),
        })
      );

      this.setState({
        posts: arrDocs,
        postBackup: arrDocs,
      });
    });
  }
  filtrarPosteo(user) {}
  render() {
    
    return (
      <View style ={styles.rosa}>
        <Text style ={styles.verde}>Buscador de perfiles</Text>
        <BuscadorFiltrado
          actualizador={(data) => this.actualizadorDeEstado(data)}
          fuente={this.state.postBackup}
          filtrador={(user) => this.state.filtrarPosteo(user)}
        />
        {this.state.posts.length > 0? 
        <FlatList
        data={this.state.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style= {styles.flatlistContainer}>
            {" "}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ProfileUsers", {
                  email: item.data.owner,
                })
              }
            >
              {" "}
              <Text style={styles.users}>
                {item.data.owner} / {item.data.nombreDeUsuario}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />:  
      <Text style= {styles.alert}> No se encontraron resultados</Text> 
      }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  users: {
    backgroundColor: "#9E68F0",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    textAlign: "center",

  },
  rosa:{
    backgroundColor:'black',
    flex: 1

  },
  verde:{
    color:'white',  
  },
  alert:{
    color:'red',
  },
  flatlistContainer:{
    alignItems: 'center',
    margin: 20,
    padding: 10,
  
  }
});

export default BuscadorUsuarios;
