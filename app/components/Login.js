import React, {Component} from 'react';
import {AppRegistry,Platform,KeyboardAvoidingView, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity,
   Button, TextInput,Alert,TouchableHighlight, NetInfo, StackActions, ActivityIndicator} from 'react-native';
   import { TextField } from 'react-native-material-textfield';
import {createStackNavigator} from 'react-navigation'
import firebase from 'react-native-firebase';
import Splash from '../../App';


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      LogedIn: '',
      isOnline: false
    }
  }
  

  componentDidMount(){
    if (typeof global.deviceToken == undefined){
      firebase.messaging().getToken()
        .then(fcmToken => {
            if (fcmToken) {
            //console.log("L: " + fcmToken);
            global.deviceToken = fcmToken;

            } else {
            // user doesn't have a device token yet
            console.log("No Token");
            } 
        });
    }
  }
  
  UserLoginFunction = () =>{
    const { email }  = this.state ;
    const { password }  = this.state ;

    if(email.length > 0 && (password.length >= 8 && password.length <= 30)){
      //Alert.alert("Authentication", "email: " + email.length +" \nPassword: "+ password.length);
      // sending post requests in here - uncommed the followingh code and modify the function
      this.onFetchLoginRecords()

      // right now simply we are going to the preference page - will be changed later
      //this.props.navigation.navigate('Event')
    } 
    else {
      Alert.alert("Login Failed!", "Invalid email or password! \nPlease try again. ");
    }
  }

  static navigationOptions = {
    title: 'LOG IN',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  async onFetchLoginRecords() {
    this.state.loading = true;
    this.renderLoading()
    //Match the back-end whit these keys
    var data = {
      email: this.state.email,
      password: this.state.password,
      deviceToken: global.deviceToken
    };
    try {
     let response = await fetch(
       // change this link to our link
      "http://myvmlab.senecacollege.ca:6282/api/users/login",
      {
        // A post request which sends a json whit data objes keys
        method: "POST",
        headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"
        },
       body: JSON.stringify(data)
     }
    );
     if (response.status >= 200 && response.status < 300) {
        // if successfull goes to user's Preference page or dashboard
        //this.props.navigation.navigate('Preference')
        var UserOBJ = new Object(JSON.parse(response._bodyInit));
        // console.log(response.headers);
        
        // console.log(response.headers.map.authtoken);
        // console.log(UserOBJ.id);
        if(UserOBJ.loginStatus){
          this.state.loading = false;
          this.renderLoading();
          this.props.navigation.navigate('Event',{id: UserOBJ.id, token: response.headers.map.authtoken})
        }else {
          Alert.alert("Login Failed!", "Invalid email or password! \nPlease try again. ");
        }
     }
     else{
      if(response._bodyInit == "Please check your email to verify your account"){
        Alert.alert(response._bodyInit);
        } else {
          Alert.alert("Login Failed!", "Invalid email or password! \nPlease try again. ");
        }
     }
   } catch (errors) {
    Alert.alert("Login Failed!", "Something went wrong please contact EZMeetUp support.\nSorry for the inconvenience! ");
    } 
}

canLogin() {
  const { email, password } = this.state;
  return (
    (email != "")&&
    (password.length >= 8 && password.length <= 30)
  );
}

passedEmail(SignEmail){
  if(SignEmail != undefined){
    this.state.email = SignEmail;
    return true;
  }
  else {
    return false;
  }
}

CanAcive() {
  if(!this.canLogin()){
    return 'gray'
  }
  else {
    return 'transparent'
  }
}

renderLoading() {
  if (this.state.loading) {
    return (
      <ActivityIndicator size="large"  color="black" style={{
          position:'absolute', left:0, right:0, bottom:0, top:0 }}/>        
    )
  } else {
    return null
  }
}

  render() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({isOnline: isConnected});
      if(!isConnected){
        this.props.navigation.navigate('Home');
      }
    });

    // if(!(this.state.isOnline)){
    // console.log(this.state.isOnline);
    //   this.props.navigation.navigate('Home');
    // }


    const isEnabled = this.canLogin();
    const isVisible = this.CanAcive();
    const { navigation } = this.props;
    const SignEmail = navigation.getParam('email');
    const RegisterdUser = this.passedEmail(SignEmail);
    return (
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%'}}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Image source={require('../images/logo.png')} style={styles.logo} />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 20}}
                    keyboardType="email-address"
                    onSubmitEditing={()=> this.passwordInput.focus()}
                    returnKeyLabel="Next"
                    autoCapitalize="none"
                    value={RegisterdUser ? SignEmail : null}
                    autoCorrect={false}
                    onChangeText={(email) => this.setState({email})}
                  placeholder="EZMeetUp@example.com"
                />
                <TextInput
                  style={{borderWidth: 2,
                    padding: 10,
                    borderColor: 'white',
                    backgroundColor:'white',
                    fontSize:20,
                    width: 330,
                    marginTop: 0.5}}
                    returnKeyLabel="Go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    ref={(input)=> this.passwordInput = input}
                    onChangeText={(password) => this.setState({password})}
                  placeholder="password"
                  secureTextEntry={true}
                />
                <TouchableOpacity style={{marginTop:10, backgroundColor: isVisible} } 
                //onPress={() => this.props.navigation.navigate('Event')}
                disabled={!isEnabled}
                onPress={() => this.UserLoginFunction()}
                >
                  <Text style = {styles.buttons}>LOG IN</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{marginTop:10}}
                onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                    <Text style={{color: 'white'}}>
                    Forgot password!
                    </Text>
                </TouchableOpacity> */}
            </KeyboardAvoidingView>
        </ImageBackground>

    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        //marginTop: 50
    },
    text: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    buttons: {
        borderWidth: 2,
        padding: 10,
        borderColor: 'white',
        width: 330,
        textAlign: "center",
        fontSize: 20,
        color: 'white',
        fontWeight:'bold'
     }

  });
  AppRegistry.registerComponent(Login, () => Login);