import { Text, View } from 'react-native'
import React, { Component } from 'react'
import ProfileUsers from '../screens/ProfileUsers'

export default class FunctionalitiesNav extends Component {
  render() {
    return (
      <View>
        <Text>FunctionalitiesNav</Text>
        <StackNavigator>
            <Stack.Screen
            name={ProfileUsers}
            component={ProfileUsers}
            >
            </Stack.Screen>
        </StackNavigator>
      </View>
    )
  }
}