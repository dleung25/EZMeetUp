import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, NetInfo,ScrollView} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'
import Slideshow from 'react-native-slideshow';



export default class JoinedEventDetails extends Component {
	constructor(props){
    super(props);
    this.state ={
        isLoading: true,
        userId:"",
        token:"",
        currEvent:[],
        eventImages:[],
        eventName:"",
        eventLocation:"",
        eventDescription:"",
        eventDate:"",
        Capacity: ""
    }
  }
  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentWillMount(){
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const tk = navigation.getParam('token');
    const event = navigation.getParam('selectedEvent');
  
    console.log(tk);
    console.log(id);
    console.log(event);
    this.setState({userId: id,
      token: tk,
      currEvent: event,
      eventName: event.event.eventName,
      eventDescription:event.event.eventDescription,
      eventLocation: event.event.eventLocation
    });

    this.state.isLoading = false;
}
  render() {
    if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, padding: 20 }}>
            <ActivityIndicator />
          </View>
        );
      }

    return (
        <ImageBackground source={require('../images/background.png')} style={{ width: '100%', height: '100%' }}>
        <ScrollView>
        <View style={[styles.container,{padding: 20}]}>
          
          <View style={{ backgroundColor: 'white', padding: 30, color: 'black', textAlign: 'center',}}>
            <Slideshow
              dataSource={this.state.eventImages} />

              <Text style={{textAlign:"left", paddingTop: 10, fontSize: 20}}>Event Name:</Text>
              <Text style={{textAlign:"center", paddingTop: 10, fontSize: 20}}>{this.state.eventName}</Text>
              <Text style={{textAlign:"left", paddingTop: 10, fontSize: 20}}>Event Description:</Text>
              <Text style={{textAlign:"center", paddingTop: 10, fontSize: 20}}>{this.state.eventDescription}</Text>
              <Text style={{textAlign:"left", paddingTop: 10, fontSize: 20}}>Event Location:</Text>
              <Text style={{textAlign:"center", paddingTop: 10, fontSize: 20}}>{this.state.eventLocation}</Text>
              <Text style={{textAlign:"left", paddingTop: 10, fontSize: 20}}>Event Date:</Text>
              <Text style={{textAlign:"center", paddingTop: 10, fontSize: 20}}>{this.state.eventDate}</Text>
              <Text style={{textAlign:"left", paddingTop: 10, fontSize: 20}}>Event Capacity:</Text>
              <Text style={{textAlign:"center", paddingTop: 10, fontSize: 20}}>{this.state.Capacity}</Text>
          </View>
          <TouchableOpacity style={{marginTop:10} } 
                  onPress={() => this.props.navigation.navigate('Chat',{token: this.state.token, id: this.state.userId, eventName: this.state.eventName})}
                  >
                    <Text style = {styles.buttons}>Event Group Chat</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
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