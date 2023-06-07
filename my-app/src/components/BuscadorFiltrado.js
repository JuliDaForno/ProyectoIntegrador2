import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
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
        let filtrado = arrayFuente.filter((element) => element.data.owner.toLowerCase().includes(texto.toLowerCase()))// pasa por todos los elemntos y valida lo que le pidamos
        return filtrado
    }

    guardarValor(event){
        this.setState(
            {
                valorInput:event.target.value
            }, () =>{
                let filtro = this.metodoQueFiltra(this.state.valorInput, this.props.fuente)
                this.props.actualizador(filtro)
            }
        )
    }

    metodoQueEnvia(){
        console.log('Enviamos la info');
    }
    render(){
        return(
            <form className = 'formulario' onSubmit={(event)=> this.evitarSubmit(event)}>
               <div>
               <label>Busca lo que quieras</label>
                </div> 
                <div>
                <input onChange={(event)=> this.guardarValor(event)} value={this.state.valorInput}/>
            </div>
            <button onClick={() => this.metodoQueEnvia()}>Enviar consulta</button> 

            </form>
        )
    }
}
export default BuscadorFiltrado