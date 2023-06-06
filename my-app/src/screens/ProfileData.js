import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import { AntDesign } from '@expo/vector-icons';
import Home from './Home'

class ProfileData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            props: props,
            posteos: [],
            nombreDeUsuario: '',
            bio: '',


        }
    }
    componentDidMount() {
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach(doc => {
                    this.setState({
                        userInfo: doc.data()
                    })
                })
            }
        )
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });
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
                    {this.state.bio != '' ?
                        <Text>{this.state.bio}</Text>
                        : null}
                    {console.log(this.state.bio)}
                    <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
                    <Text style={styles.container}>
                        Cerrar sesion
                    </Text>


                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Home data={item} />} />
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink'
    },
    info: {
        fontSize: 20,
        fontWeight: '600',
        color: 'pink'
    },
    arrow: {
        alignItems: 'start'
    }
})
export default ProfileData