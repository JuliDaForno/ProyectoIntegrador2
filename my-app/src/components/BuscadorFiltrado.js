import { Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'

class BuscadorFiltrado extends Component{
    constructor(props){
        super(props)
        this.state={
            valorInput:'',
        }
    }
    evitarSubmit(event){
        event.preventDefault()
    }
    metodoQueFiltra(texto,arrayFuente){

        let filtrado = arrayFuente.filter((element) => 
        {
        return(
            element.data.owner.toLowerCase().includes(texto.toLowerCase()) || 
        element.data.nombreDeUsuario && element.data.nombreDeUsuario.toLowerCase().includes(texto.toLowerCase()) )
        })
        return filtrado

    }


    
    guardarValor(text){
        this.setState(
            {
                valorInput:text
            }, () =>{
                let filtro = this.metodoQueFiltra(this.state.valorInput, this.props.fuente)
                this.props.actualizador(filtro)
            }
        )
    }

    render(){
        console.log(this.props)
        return(

            <View onSubmit={(event)=> this.evitarSubmit(event)}>
                <View  >
                    <Text style ={styles.verde}>Busca lo que quieras</Text>
                </View> 
                <View >
                <TextInput 
                style ={styles.verde}
                onChangeText={(text)=> this.guardarValor(text)} 
                value={this.state.valorInput}
                />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
   
    verde:{
      color:'white',
     
    
      
    }
  });
export default BuscadorFiltrado