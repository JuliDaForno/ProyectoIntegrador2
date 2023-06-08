import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import { AntDesign } from '@expo/vector-icons';
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
                    style={styles.arrow}
                    onPress={() => this.props.navigation.navigate('Home')}
                >
                    <Text>
                        <AntDesign name='arrowleft' size={24} color='black' />
                        HOME
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={() => this.logout()}
                >
                    <Text style={styles.info}>{this.state.owner}</Text>
                    {this.state.userInfo[0]?.data.bio != '' ?
                        <Text>{this.state.userInfo[0]?.data.bio}</Text>
                        : null}
                    
                    <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
                    <Text style={styles.container}>
                        Cerrar sesion
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
        backgroundColor: 'pink',
        overflow: 'auto'
    },
    info: {
        fontSize: 20,
        fontWeight: '600',
        color: 'pink'
    },
    arrow: {
        alignItems: 'start'
    },
    
})
export default ProfileData