import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";

import Home from './Home'
import Post from '../components/Post';
class ProfileData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: [],
            props: props,
            posteos: [],
            nombreDeUsuario: '',
            bio: '',


        }
    }
    componentDidMount() {
        db.collection("users").where("owner", "==", auth.currentUser.email).onSnapshot(
            (docs) => {

            let usuarios = []
            docs.forEach((doc) => {
                usuarios.push({
                    
                    data: doc.data()
                })
            })
            this.setState({
                userInfo: usuarios,
               
            })
        })
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    console.log('posts,', doc.data())
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });
                console.log(posts, 'posts usuario logeado')
                this.setState({
                    posteos: posts
                })
            }
        )
    }

    logout() {
        auth.signOut()
            .then(resp => this.props.navigation.navigate('Login'))
            .catch(err => console.log(err))
    }

    render() {
       console.log(this.state);
        return (
            <View style={styles.container}>
                <TouchableOpacity
                  style={styles.info}
                    onPress={() => this.props.navigation.navigate('Home')}
                >
                    <Text style={styles.info}>
                        <AntDesign name='arrowleft' size={24} color='black' />
                        HOME
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
              style={styles.info}
                    onPress={() => this.logout()}
                >
            
                    {this.state.userInfo[0]?.data.bio != '' ?
                        <Text style={styles.info}>{this.state.userInfo[0]?.data.bio}</Text>
                        : null}
                    
                    <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
                    <Text style={styles.info1}>
                    <AntDesign name = "logout" size= {20} color= "white"/>
                        Cerrar sesión
                    </Text>
                    
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Post data={item} />} 
                        />
                       

                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BC9FC0',

    },
    info: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'black',
        overflow: 'auto'
    },
    info: {
        fontSize: 13,
        fontWeight: '600',
        color: 'white'
    },
    info1: {
        fontSize: 13,
        fontWeight: '600',
        color: 'white',
        textAlign: 'right',
        marginLeft: 5
    },
    arrow: {
        alignItems: 'start'
    },
    
})
export default ProfileData