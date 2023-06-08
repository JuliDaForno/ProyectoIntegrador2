import React, {Component} from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormRegister from './FormRegister';

class ImagenPerfil extends Component {
  constructor(){
    super()
      this.state={
        mostrarPicker: false, 
      }
    
  }
 

  componentDidMount(){
    ImagePicker.getMediaLibraryPermissionsAsync()
    .then((data)=>{
      ImagePicker.launchImageLibraryAsync()
      this.setState({
        mostrarPicker: true
      })
    }  )
    .catch((err)=> console.log(err))
  }

  // const [image, setImage] = useState(null);

  // const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
 // };

 render(){

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {//this.state.mostrarPicker && <ImagePicker/>
      }
    </View>
  );
 }

}
export default ImagenPerfil