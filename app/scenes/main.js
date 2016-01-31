import React, {View, Text, Component, Image, Alert}  from 'react-native';
import {connect} from 'react-redux';
import MK, {MKCardStyles, MKButton, MKColor} from 'react-native-material-kit'
import * as actions from '../actions';
import store from '../store';
import Sub from './sub';

class Main extends Component {

  static getTitle() {
    return "react-native experiments"
  }

  navigateTo() {
    this.props.navigator.push({component: Sub, title: 'Hi there'});
  }

  login() {
    store.dispatch(actions.session.login())
  }


  render() {
    let username;
    let date;
    if (this.props.session && this.props.session.user) {
      username = this.props.session.user.username;
      date = this.props.session.user.date.toString();
    }

    return (
      <View style={MKCardStyles.card}>
        <Text style={MKCardStyles.title}>Welcome </Text>
        <Text style={MKCardStyles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Mauris sagittis pellentesque lacus eleifend lacinia...
        </Text>
        <View style={MKCardStyles.menu}></View>
        <Text style={MKCardStyles.action}>Hi {username} {date}</Text>
        <MKButton
          backgroundColor={MKColor.Teal}
          onPress={()=>this.navigateTo()}>
          <Text style={MKCardStyles.action}>Go Go</Text>
        </MKButton>
        <MKButton
          backgroundColor={MKColor.Teal}
          onPress={()=>this.login()}>
          <Text style={MKCardStyles.action}>Login</Text>
        </MKButton>

      </View>
    )
  }
}
export default connect(state=>state)(Main);
