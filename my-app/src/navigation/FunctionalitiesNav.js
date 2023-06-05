import { Text, View } from 'react-native'
import React, { Component } from 'react'
import ProfileUsers from '../screens/ProfileUsers'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import Comments from '../screens/Comments'


const Stack = createNativeStackNavigator()
class FunctionalitiesNav extends Component {

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="ProfileUsers"
          component={ProfileUsers}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
        name= 'Comments'
        component= {Comments}
        options={{
          headerShown: false
        }}
        />
      </Stack.Navigator>
    )
  }
}

export default FunctionalitiesNav