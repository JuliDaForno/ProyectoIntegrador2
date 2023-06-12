import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

class FormPost extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.props.stateDescripcion}
                    placeholder='Aca vas a hacer tus posteos'
                    onChangeText={(text) => this.props.actualizarDescripcion(text)}
                    multiline={true}
                    rows={5}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 20,
        fontSize: 16,
        marginVertical: 15
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center'
    },

})

export default FormPost