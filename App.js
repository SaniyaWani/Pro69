import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {

  constructor(){
    super();
    this.state={
      hasCameraPermissions: null,
      scanned: false,
      scannedData:'',
      buttonState: 'normal'
    }
  }

  getCameraPermissions=async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked'

    })
  }
  
  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

   if(buttonState === "clicked" && hasCameraPermissions ){
     return (
       <BarCodeScanner  
       onBarCodeScanned ={scanned ? undefined: this.handleBarCodeScanned} />
     );
   }
   
   else if (buttonState === 'normal')
   {
  return (
    <View>
      <Text>Click on the scanner to scan code</Text>
      <Text>
        {hasCameraPermissions === true ? this.state.scannedData: "Request Camera Permissions"}
      </Text>


<TouchableOpacity onPress={this.getCameraPermissions}>
<Text >Scan QR Code</Text>
</TouchableOpacity>
</View>
  );
  }
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
