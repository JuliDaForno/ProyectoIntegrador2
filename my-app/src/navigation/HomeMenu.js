import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'


import Home from '../screens/Home'
import MyProfile from '../screens/MyProfile'
import NewPost from '../screens/NewPost'
import ProfileUsers from '../screens/ProfileUsers'

const Tab = createBottomTabNavigator()

class HomeMenu extends Component {
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <AntDesign name='home' size={24} />
                    }} />

                <Tab.Screen
                    name='MyProfile'
                    component={MyProfile}
                    options={{
                        headerShown: false
                    }}
                />

                <Tab.Screen
                    name='NewPost'
                    component={NewPost}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <AntDesign name='pluscircleo' size={24} />
                    }}
                />

                <Tab.Screen
                    name='ProfileUsers'
                    component={ProfileUsers}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <AntDesign name='profile' size={24} />
                    }} />



            </Tab.Navigator>
        )
    }
}

export default HomeMenu