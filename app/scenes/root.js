import React, {Component} from 'react-native';
import {Provider} from 'react-redux';
import Navigator from '../components/navigation/navigator';
import * as navigation from '../actions/navigation';
import store from '../store';
import Main from './main';

store.dispatch(navigation.setRoutes([{component: Main, navBarStyle: 'large', title: "NavTesting"}]));

export default class Root extends Component {

  render(){
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}
