import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Post from './Post'

function Posteos(props) {
  return (
    <View>
      <FlatList
        data={props.data}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({ item }) => <Post data={ item }/> }
      />
    </View>
  )
}
export default Posteos
