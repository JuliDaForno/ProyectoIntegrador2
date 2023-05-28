import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';



const Stack = createNativeStackNavigator()
export default function App() {
  return (
    
      <NavigationContainer>
      <Stack.Screen
        name='Login'
        component={Login}
        options={
          {
            headerShown:false
          }
        }
        />
      </NavigationContainer>
      
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
