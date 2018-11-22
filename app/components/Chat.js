import { GiftedChat } from 'react-native-gifted-chat'
import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View, ImageBackground,Image,TouchableOpacity, Button, NetInfo,ScrollView} from 'react-native';
import {createStackNavigator,NavigationActions,StackActions} from 'react-navigation'

export default class Chat extends Component {
  state = {
    messages: [],
  }

  componentWillMount() {
	const { navigation } = this.props;
	const eventName = navigation.getParam('eventName');
    this.setState({
      messages: [
        {
          _id: '1',
          text: 'Hello, this is the ' + eventName + ' Chat!',
          createdAt: new Date(),
          user: {
            _id: '2',
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).eventName || 'Chat!',
  });
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: '1',
        }}
      />
    )
  }
}