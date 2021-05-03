/* Copyright 2021 Internetrix
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
version 2 as published by the Free Software Foundation.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details. */
import React, {Component} from 'react';
// Used to create a cross-platform WebView for React Native
import { WebView } from 'react-native-webview';
// First import module @react-native-firebase/app and remember to setup Firebase analytics module afterwards
import firebase from '@react-native-firebase/app';
import analytics from  '@react-native-firebase/analytics';
// Other UI components
import {
  StyleSheet,
  Text,
  Button,
  View,
  NativeModules,
} from 'react-native';
// Import a mock Java function via NativeModules
var CalcFunc = NativeModules.CalcExample;
// Create a random number between 0 and 3
let randInt = Math.floor(Math.random() * 4);
// Define an array of different maths operations
const operations = ['a', 'm', 's', 'd'];
// Auto-generate a clientId value such as a GUID on initial startup. This is the value that will be used as the clientId for the app and will be passed to the Webview URL so sessions between an App and Webview can be stitched together.
var clientId= "xyxxuyxyxyxyxyxy";
export class MyWeb extends Component {
  render() {
    // Pass our previous auto-generated clientId as a url parameter to the Webview.
    return <WebView source={{ uri: `https://example.com.au?clientId=${clientId}` }} />;
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: 100,
      num2:20,
      command:operations[randInt],
      webView: false
    }
   // Initialize Firebase Analytics and set the clientId of app (cid) to our previously predefined value
   // In GTM, set "&cid" field and read from the user property: app_cid
    firebase.analytics().setUserProperty("app_cid", clientId);
  }
  render() {
    const { num1, num2, command} = this.state
    if (this.state.webView) {
      return (<MyWeb/>);
  } 
    return  <View>
          <Text>
           The first number is  :  {num1} 
         </Text>
         <Text>
           The second number is : { num2}
         </Text>
         <Button
           title="Execute JAVA Function"
            onPress={()=>{
              //Each time the command is set to a random operation
              this.setState({command:operations[Math.floor(Math.random() * 4)]});
              //Call the Java function with new commands
              CalcFunc.show(command,num1, num2, CalcFunc.LONG);
              //Each time this button is clicked, an event with event action as eventFromOnClick is recorded in GA
              firebase.analytics().logEvent("eventFromOnClick", {"par1":"val1"});
            }}
          />
           <Button
           title="WebView"
            onPress={()=>{
              this.setState({webView: true})
            }}
          />
        </View>
  }
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export default App;