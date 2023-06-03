import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class ProfileData extends Component {
    
    logout(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate('Login'))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                onPress= {() => this.logout()}
                >
                    <Text>
                        Cerrar sesion
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ProfileData