import { Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import { Ionicons } from '@expo/vector-icons';

class BuscadorFiltrado extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valorInput: '',
        }
    }
    evitarSubmit(event) {
        event.preventDefault()
    }
    metodoQueFiltra(texto, arrayFuente) {

        let filtrado = arrayFuente.filter((element) => {
            return (
                element.data.owner.toLowerCase().includes(texto.toLowerCase()) ||
                element.data.nombreDeUsuario && element.data.nombreDeUsuario.toLowerCase().includes(texto.toLowerCase()))
        })
        return filtrado

    }



    guardarValor(text) {
        this.setState(
            {
                valorInput: text
            }, () => {
                let filtro = this.metodoQueFiltra(this.state.valorInput, this.props.fuente)
                this.props.actualizador(filtro)
            }
        )
    }

    render() {
        console.log(this.props)
        return (
            <View onSubmit={(event) => this.evitarSubmit(event)}>
                <View style={styles.searchContainer} >
                <Ionicons style={styles.searchIcon} name="search-outline" size={24} />
                    <TextInput
                        style={styles.input}
                        placeholder='Search ...'
                        onChangeText={(text) => this.guardarValor(text)}
                        value={this.state.valorInput}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        color: 'black',
        flex: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        margin: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flex: 1
    },
    searchIcon: {
        marginRight: 5,
      },
    
});
export default BuscadorFiltrado