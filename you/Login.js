import React, { Component } from 'react';
import { StyleSheet, Text, View,Button,KeyboardAvoidingView,TextInput } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
    export default class Login extends Component {
      componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=> {
          if (user) {
             
             console.log(user.displayName)

         Actions.chat()


          } else {
          console.log('no')
          }
        });



      }
      render(){
        return(
        <View styles={{backgroundColor:'orange',weight:1000,height:500}}>



    <View style={{width:400,height:1000,backgroundColor:'#ffff'}}>
    <View style={{width:350,height:500,alignItems:'center',justifyContent:'center'}}>
    <Button  title="FACEBOOK LOGIN" onPress= {
      async function logIn() {
  try {
    const {
      type,
      token,

    } = await Facebook.logInWithReadPermissionsAsync('393687251238731', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
    var credential = firebase.auth.FacebookAuthProvider.credential(token)
    firebase.auth().signInAndRetrieveDataWithCredential(credential)
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }

    }}/>
    </View>
    </View>


    <KeyboardAvoidingView behavior="padding" enabled style={{flex:1,width:400}}>

   <View style={{flex:1,backgroundColor:'red'}}>

    <TextInput placeholder='heloo'style={{marginTop:200}}/>

    </View>
    </KeyboardAvoidingView>



        </View>
        );
      }
    }
