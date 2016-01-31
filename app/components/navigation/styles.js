import {StyleSheet} from 'react-native';
import {colors} from '../../style/common';

let navigationBar = {
  backgroundColor: colors.navigationBar,
  paddingTop:30,
  paddingBottom:10,
  flexDirection:'row'
}
let navigationBarLarge = Object.assign({}, navigationBar, {height: 175});
let container = {
  flex: 1,
  paddingTop: 65
}
let containerLargeNav = Object.assign({}, container, {paddingTop: 180});

export default StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  navigationBar: navigationBar,
  navigationBarLarge: navigationBarLarge,
  navigationButtonLeft:{
      paddingTop: 10,
      paddingLeft: 5
  },
  navigationTitle: {
      paddingTop: 10,
      color:colors.navigationBarText,
      textAlign:'center',
      fontSize: 18,
      flex:1
  },
  container: container,
  containerLargeNav: containerLargeNav
});
