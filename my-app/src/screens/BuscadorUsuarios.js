import { Text, TouchableOpacity, View, StyleSheet, FlatList, } from "react-native";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import BuscadorFiltrado from "../components/BuscadorFiltrado";

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
  filtrarPosteo(user) { }
  render() {


    return (
      <View style={styles.rosa}>
        <BuscadorFiltrado
          actualizador={(data) => this.actualizadorDeEstado(data)}
          fuente={this.state.postBackup}
          filtrador={(user) => this.state.filtrarPosteo(user)}
        />

        {this.state.posts.length > 0 ?
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.flatlistContainer}>
                {" "}
                <TouchableOpacity
                  style={styles.text}
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
          /> :
          <Text style={styles.alert}> No se encontraron resultados</Text>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  users: {
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
  },
  rosa: {
    backgroundColor: '#F3DCF3',
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    color: 'rgb(255,255,255)',
  },
  verde: {
    color: 'white',
  },
  alert: {
    color: 'red',
    padding: 10,
    fontWeight: 'bold',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    alignItems: 'center',
    margin: 5,
    padding: 10,
  },
  text: {
    color: 'rgb(84, 84, 84)',
    padding: 5,
    fontWeight: 'bold',
},
});

export default BuscadorUsuarios;
