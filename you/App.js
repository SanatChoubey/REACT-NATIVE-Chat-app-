import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Stack,Scene,Router} from 'react-native-router-flux';
import Login from './Login';
import Chats from './chats'
import Load from './load'
import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyCwxnQ1BJPIDZxdJ5HltoliHAPxWBYE1A4",
  authDomain: "chat-9bbd6.firebaseapp.com",
  databaseURL: "https://chat-9bbd6.firebaseio.com",
  projectId: "chat-9bbd6",
  storageBucket: "chat-9bbd6.appspot.com",
  messagingSenderId: "833395266123"
};
firebase.initializeApp(config);


export default class App extends React.Component {

  render() {
    return (
      <Router>

        <Stack key="root">
        <Scene key='load' initial component={Load} hideNavBar={true} />
     <Scene key="login"  component={Login} title="CHAT APP" hideNavBar={true}/>
     <Scene key="chat"   component={Chats} hideNavBar={true}/>

     </Stack>

</Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
