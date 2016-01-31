import React, {View, Text, Component, Image, Alert}  from 'react-native';
import {connect} from 'react-redux';
import MK, {MKCardStyles, MKButton, MKColor} from 'react-native-material-kit'
import * as actions from '../actions';
import store from '../store';

class Sub extends Component {

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
      <View>
        <Text style={MKCardStyles.action}>Hi {username} {date}</Text>

        <MKButton
          backgroundColor={MKColor.Teal}
          onPress={()=>this.login()}>
          <Text style={MKCardStyles.action}>Re-login</Text>
        </MKButton>

      </View>
    )
  }
}
export default connect(state=>state)(Sub);
