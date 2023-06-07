import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'

import FunctionalitiesNav from './FunctionalitiesNav'
import Home from '../screens/Home'
import NewPost from '../screens/NewPost'
import ProfileUsers from '../screens/ProfileUsers'
import ProfileData from '../screens/ProfileData'
import BuscadorUsuarios from '../screens/BuscadorUsuarios'
import Buscador from '../screens/Buscador'

const Tab = createBottomTabNavigator()

class HomeMenu extends Component {
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name='FunctionalitiesNav'
                    component={FunctionalitiesNav}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <AntDesign name='home' size={24} />
                    }} />
                       
                <Tab.Screen
                    name='ProfileData'
                    component={ProfileData}
                    options={{
                        headerShown: false,
                        tabBarIcon: ()=>  <AntDesign name= 'user' size={24}/> 
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
                    name='Buscador'
                    component={Buscador}
                    options={{
                        headerShown: false,
                        tabBarIcon: ()=>  <AntDesign name= '"md-person-circle-outline"' size={24}/> 
                    }}
                />

            </Tab.Navigator>
        )
    }
}

export default HomeMenu