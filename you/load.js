import React, { Component } from 'react';
import { StyleSheet, Text, View ,ActivityIndicator,Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase'
    export default class Load extends Component {
componentDidMount(){
  firebase.auth().onAuthStateChanged((user)=> {
    if (user) {

      Actions.chat

   Actions.chat()


    } else {
  Action.login
    }
  });






}
      render(){
         return(
          <View style={styles.container}>
           <ActivityIndicator size="small" color="#00ff00" />

          </View>
        );
      }
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
