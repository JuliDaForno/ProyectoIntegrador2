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

        let filtrado = arrayFuente.filter((element) => 
        {
        return(
            element.data.owner.toLowerCase().includes(texto.toLowerCase()) || 
        element.data.nombreDeUsuario && element.data.nombreDeUsuario.toLowerCase().includes(texto.toLowerCase()) )
        })
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
        console.log(this.props)
        return(
            
            <form className = 'formulario' onSubmit={(event)=> this.evitarSubmit(event)}>
               <div>
               <label style ={styles.verde}>Busca lo que quieras</label>
                </div> 
                <div>
                <input onChange={(event)=> this.guardarValor(event)} value={this.state.valorInput}/>
            </div>
            <button onClick={() => this.metodoQueEnvia()}>Enviar consulta</button> 

            </form>
        )
    }
}
const styles = StyleSheet.create({
   
    verde:{
      color:'white'
    }
  });
export default BuscadorFiltrado