import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'

class FormPost extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <TextInput
                style= {styles.input}
                keyboardType="default"
                placeholder='Ingresa la descripcion de tu post'
                value= {this.props.stateDescripcion}
                onChangeText= {(text)=> this.props.atualizarDescripcion(text)}
                multiline= {true}
                rows= {5}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'red',
        padding: 10
    }
})

export default FormPost