import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, TextInput,TouchableOpacity, StyleSheet} from 'react-native';  
import {auth, db} from '../firebase/config';
import "firebase/firestore";

class ModificarPerfil extends Component {
    constructor() {
        super()
        this.state = {
            usuario:[],
            infoUser: '',
             userInfo:[],
            contraseña:'',
            errorCambiado:false,
          errores:''
            }
    }
    componentDidMount() {
       
        db.collection('users').where('owner','==', auth.currentUser.email).onSnapshot(
            (docs)=>{
            let user =[]
            docs.forEach((doc)=>{
                user.push({
                    id:doc.id, 
                    data:doc.data(), 
                })
            })
            this.setState({
             usuario:user,
             nombre:user[0].data.nombreDeUsuario,
             biografia:user[0].data.bio
            })
            }
        )
    }

 actualizar(contraseña,nombre,biografia) {
                if ( contraseña=='') {
                  db.collection('users').doc(this.state.usuario[0].id).update({
                    nombreDeUsuario: nombre,
                      bio:biografia
                  }) .then(()=>{
                      this.props.navigation.navigate("ProfileData")
                  })
                } else {
                  firebase.auth().currentUser.updatePassword(contraseña)
                  .then(()=>{
                      db.collection('users').doc(this.state.usuario[0].id).update({
                        nombreDeUsuario: nombre,
                          bio:biografia
                      }) .then(()=>{
                          this.props.navigation.navigate("Login")
          
          
          
                      }) 
                      .catch((error)=>{
                          console.log(error);
                          this.setState({
                            errorCambiado: true
                          })  
                  })
              })
                }
              }
    render(){
        return(
            <View style={styles.contenedor}>
                   <Text style={styles.texto} > Editar Perfil </Text>
            <Text>Create una nueva contra</Text>
                  <TextInput style={styles.texto}
             placeholder='Contraseña' 
             keyboardType='password'
             onChangeText={texto=>this.setState({contraseña:texto})}
             value= {this.state.contraseña}
             />
               <TextInput  style={styles.texto}
             placeholder='Nombre' 
             keyboardType='default'
             onChangeText={texto=>this.setState({nombre:texto})}
             value= {this.state?.nombre}
             />
               <TextInput style={styles.texto}
             placeholder='Biografia' 
             keyboardType='default'
             onChangeText={texto=>this.setState({biografia:texto})}
             value= {this.state?.biografia}
             />
               
        
              <  TouchableOpacity onPress={()=>this.actualizar(this.state.contraseña,this.state.nombre,this.state.biografia)}> 
              <Text style={styles.texto}> Editar Perfil </Text>
            </TouchableOpacity>           
<Text style={styles.texto} onPress={() => this.props.navigation.navigate("ProfileData")}> Volve al perfil</Text>
         </View>
       
        )
  }}
  const styles = StyleSheet.create({

    contenedor:{
        backgroundColor: '#C2C9D7',
        flex: 1,
        color: 'black',
        padding: 15,
        overflow: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }, 
    texto:{
        fontWeight: 200,
           color: 'black',
        fontSize: 15,
        textAlign: 'center', 
       
    },
    
    
    
    
    
    
    
    
    })
  export default ModificarPerfil
    




