import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import MyProfile from '../screens/MyProfile'

const Tab= createBottomTabNavigator()

class HomeMenu extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name= 'Home' component ={Home}/>
      </Tab.Navigator>
    )
  }
}

export default HomeMenu