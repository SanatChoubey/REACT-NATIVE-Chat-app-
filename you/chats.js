import React, { Component } from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,KeyboardAvoidingView ,Dimensions,Button} from 'react-native';
import firebase from 'firebase';
import { Permissions, Notifications } from 'expo';
    export default class Chats extends Component {





      async registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
      try{
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token)


        // POST the token to your backend server from where you can retrieve it to send push notifications.
this.setState({tokens:token})

    }
      catch(error){
        console.log(error)
      }
      }





















      componentDidMount(){
        this.registerForPushNotificationsAsync()
      firebase.database().ref('chat').on('value',(snapshot)=>{

        const data = Object.values(snapshot.val())

        this.setState({data:data})

      })
      firebase.database().ref('token/'+'sanat').on('value',(snapshot)=>{

        const tok = Object.values(snapshot.val())

        this.setState({sanat:tok})

      })
      firebase.database().ref('token/'+'sakshi').on('value',(snapshot)=>{

        const toks = Object.values(snapshot.val())

        this.setState({sakshi:toks})

      })



      }
      constructor(props){
        super(props);

        this.state = {
          data:null,
          value:'',
          tokens:null,
          sanat:'ss',
          sakshi:'s',
        };
      }



            bob(){
            if(this.state.data){
          return( this.state.data.map((item)=>{
           return (<View style={{backgroundColor:'black',width:400,borderBottomColor: '#c8d6e5',
          borderBottomWidth: 1,}}>
             <Text style ={{color:'#1dd1a1',}} >{item.name}</Text><Text  style={{color:'white'}}>{item.message}</Text></View>)




           }))



         }else {
           return<View style={{marginTop:30}}><Text>PLEASE WAIT</Text></View>
         }





            }










      render(){
        return(
          <KeyboardAvoidingView behavior="padding"enabled style={styles.container}>

<ScrollView >{this.bob()}</ScrollView>
<View style={{flexDirection:'row' ,width:400}}>
<TextInput style={{width:250,borderBottomWidth:2,borderBottomColor:'black',paddingLeft:30,marginRight:20}}
onChangeText={(text)=>{this.setState({value:text})}}
placeholder="Type message" value={this.state.value} />
<Button onPress={()=>{
if(firebase.auth().currentUser.displayName=='Sanat Choubey'&& this.state.value&&this.state.tokens){
  firebase.database().ref('token/'+'sanat').set({

 token:this.state.tokens




  })
  firebase.database().ref('chat/').push().set({

 name:'sanat',
 message:this.state.value,





  }).then(()=>{
    this.setState({value:''})
  })
  var reponse=fetch("https://exp.host/--/api/v2/push/send",{
   method:'POST',
   headers:{
     Accept:'application/json',
     'Content-Type':'application/json'
   },
   body: JSON.stringify({
     to:this.state.sakshi,
     sound:'default',
     title:'sanat',
     body:this.state.message
   })



  })



}else if(firebase.auth().currentUser.displayName=='Sakshi Parihar'&& this.state.value){

  firebase.database().ref('token/'+'sakshi').set({

 token:this.state.tokens




  })
  firebase.database().ref('chat/'+firebase.auth().currentUser.uid).set({

 name:'sakshi',
 message:this.state.value,





}).then(()=>{
  this.setState({value:''})
})

  var reponse=fetch("https://exp.host/--/api/v2/push/send",{
   method:'POST',
   headers:{
     Accept:'application/json',
     'Content-Type':'application/json'
   },
   body: JSON.stringify({
     to:this.state.sanat,
     sound:'default',
     title:'sk',
     body:this.state.message
   })



  })






}


}} title ="send"></Button></View>


          </KeyboardAvoidingView>
        );
      }
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        width:Dimensions.get('window').width,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
