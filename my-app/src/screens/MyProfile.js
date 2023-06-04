import { Text, View } from 'react-native'
import React, { Component } from 'react'
import ProfileData from '../screens/ProfileData'
import ProfileUsers from '../screens/ProfileUsers'


class MyProfile extends Component {


  render() {
    return (
      <View>
        <Text>Aqui va a ir toda la informacion y acciones de uestro perfil</Text>
        <ProfileData navigation={this.props.navigation} />
        <ProfileUsers navigation={this.props.navigation}/>
      
      </View>
    )
  }
}

export default MyProfile