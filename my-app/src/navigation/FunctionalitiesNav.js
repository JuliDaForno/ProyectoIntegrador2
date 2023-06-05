import { Text, View } from 'react-native'
import React, { Component } from 'react'
import ProfileUsers from '../screens/ProfileUsers'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'

const Stack = createNativeStackNavigator()
export default class FunctionalitiesNav extends Component {

  render() {
    return (
        <Stack.Navigator
            
        >
            <Stack.Screen
            name= "Home"
            component={Home}
            />

            <Stack.Screen
            name="ProfileUsers"
            component={ProfileUsers}
            >
            </Stack.Screen>
        </Stack.Navigator>
    )
  }
}