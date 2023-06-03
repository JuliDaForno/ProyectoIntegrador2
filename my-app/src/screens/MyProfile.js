import { Text, View } from 'react-native'
import React, { Component } from 'react'
import ProfileData from '../components/ProfileData'


class MyProfile extends Component {


  render() {
    return (
      <View>
        <Text>Aqui va a ir toda la informacion y acciones de uestro perfil</Text>
        <ProfileData navigation={this.props.navigation} />
      </View>
    )
  }
}

export default MyProfile