import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';

import {createStackNavigator,createAppContainer} from 'react-navigation'
import Login from './app/components/Login.js';
import Splash from './app/components/Splash';
import SignUp from './app/components/SignUp';
import ForgotPassword from './app/components/ForgotPassword';
import Preference from './app/components/Preference';
import Event from './app/components/Event';
import CreateEvent from './app/components/CreateEvent';
import DiscoveryPreference from './app/components/DiscoveryPreference';
import AddEvent from './app/components/AddEvent';
import MyFriends from './app/components/MyFriends';
import AddFriends from './app/components/AddFriends';
import AppSettings from './app/components/AppSettings';
import EventDetails from './app/components/EventDetails';
import JoinedEventDetails from './app/components/JoinedEventDetails';
import Chat from './app/components/Chat';
const RootStack = createStackNavigator({
    
  Home: {
      screen: Splash,
  },
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp,
  },
  ForgotPassword: {
    screen: ForgotPassword
  },
  Preference: {
    screen: Preference
  },
Event: {
    screen: Event
  },
CreateEvent: {
    screen: CreateEvent
  },
DiscoveryPreference: {
    screen: DiscoveryPreference
  },
AddEvent: {
    screen: AddEvent
  }, 
MyFriends: {
  screen: MyFriends
  },  
AddFriends: {
  screen: AddFriends
}, 
AppSettings: {
  screen: AppSettings
}, 
EventDetails: {
  screen: EventDetails
},
JoinedEventDetails: {
  screen: JoinedEventDetails
},
Chat: {
  screen: Chat
}
});

export default createAppContainer(RootStack);

// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   async componentDidMount() {
//     // TODO: You: Do firebase things
//     // const { user } = await firebase.auth().signInAnonymously();
//     // console.warn('User -> ', user.toJSON());

//     // await firebase.analytics().logEvent('foo', { bar: '123'});
//   }

//   render() {
//     return (
//       <Splash />
//       // <ScrollView>
//       //   <View style={styles.container}>
//       //     <Image source={require('./assets/ReactNativeFirebase.png')} style={[styles.logo]}/>
//       //     <Text style={styles.welcome}>
//       //       Welcome to {'\n'} React Native Firebase
//       //     </Text>
//       //     <Text style={styles.instructions}>
//       //       To get started, edit App.js
//       //     </Text>
//       //     {Platform.OS === 'ios' ? (
//       //       <Text style={styles.instructions}>
//       //         Press Cmd+R to reload,{'\n'}
//       //         Cmd+D or shake for dev menu
//       //       </Text>
//       //     ) : (
//       //       <Text style={styles.instructions}>
//       //         Double tap R on your keyboard to reload,{'\n'}
//       //         Cmd+M or shake for dev menu
//       //       </Text>
//       //     )}
//       //     <View style={styles.modules}>
//       //       <Text style={styles.modulesHeader}>The following Firebase modules are pre-installed:</Text>
//       //       {firebase.admob.nativeModuleExists && <Text style={styles.module}>admob()</Text>}
//       //       {firebase.analytics.nativeModuleExists && <Text style={styles.module}>analytics()</Text>}
//       //       {firebase.auth.nativeModuleExists && <Text style={styles.module}>auth()</Text>}
//       //       {firebase.config.nativeModuleExists && <Text style={styles.module}>config()</Text>}
//       //       {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>crashlytics()</Text>}
//       //       {firebase.database.nativeModuleExists && <Text style={styles.module}>database()</Text>}
//       //       {firebase.firestore.nativeModuleExists && <Text style={styles.module}>firestore()</Text>}
//       //       {firebase.functions.nativeModuleExists && <Text style={styles.module}>functions()</Text>}
//       //       {firebase.iid.nativeModuleExists && <Text style={styles.module}>iid()</Text>}
//       //       {firebase.invites.nativeModuleExists && <Text style={styles.module}>invites()</Text>}
//       //       {firebase.links.nativeModuleExists && <Text style={styles.module}>links()</Text>}
//       //       {firebase.messaging.nativeModuleExists && <Text style={styles.module}>messaging()</Text>}
//       //       {firebase.notifications.nativeModuleExists && <Text style={styles.module}>notifications()</Text>}
//       //       {firebase.perf.nativeModuleExists && <Text style={styles.module}>perf()</Text>}
//       //       {firebase.storage.nativeModuleExists && <Text style={styles.module}>storage()</Text>}
//       //     </View>
//       //   </View>
//       // </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });