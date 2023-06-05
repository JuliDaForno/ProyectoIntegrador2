import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth,db } from '../firebase/config'

class ProfileData extends Component {
    constructor(props){
        super(props)
        this.state={
            userInfo:{},
            props: props,
            posteos:[]
        }
    }
componentDidMount(){
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
        docs => {
docs.forEach(doc=>{
    this.setState({
        userInfo:doc.data()
    })
})
        }
    )
    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
        docs =>{
            let posts=[];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            this.setState({
                posteos:posts
            })
        }
    )
}

logout(){
    auth.signOut()
    .then(resp => this.props.navigation.navigate('Login'))
    .catch(err => console.log(err))
}
    render() {
        return (
            <View style ={style.container}>
                <TouchableOpacity
                onPress= {() => this.logout()}
                >
                    <Text style ={style.info}>{this.state.userInfo.userName}</Text>
                    {this.state.userInfo.bio != '' ? 
                                <Text>{this.state.userInfo.bio}</Text>
                            : null}
                    <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
                    <Text style= {style.container}>
                        Cerrar sesion
                    </Text>
        <FlatList
        data={this.state.posteos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item})=>  <Home data={item} />} /> 
                </TouchableOpacity>

            </View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink'
    },
    info:{
        fontSize: 20,
        fontWeight: '600',
        color: 'pink'
    }
})
export default ProfileData