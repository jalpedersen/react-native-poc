import React, {Text, View, Component, Animated} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MK, {MKButton} from 'react-native-material-kit';
import styles from './styles';
import * as navActions from '../../actions/navigation';

let SHARED_PROPS = ['session', 'routes', 'notification'];
let COMPONENT_NAMES = ['Title', 'LeftButton', 'RightButton'];
let NAV_BAR_STYLES = {
  'default': {
    navBar: styles.navigationBar,
    scene: styles.container
  },
  'large': {
    navBar: styles.navigationBarLarge,
    scene: styles.containerLargeNav
  }
}
function getStyle(style, styleMap) {
    let map = styleMap || NAV_BAR_STYLES;
    let candidate = map[style];
    return candidate || map['default']
}

class NavigationBar extends React.Navigator.NavigationBar {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
    this.props.navigator.navigationContext.addListener('willfocus', event => {
      if (this.state.routeStyle !==
        getStyle(event.data.route.navBarStyle, this.props.navBarStyles).navBar) {
          this.fadeOut();
        }
    })
    this.props.navigator.navigationContext.addListener('didfocus', event => {
      this.props.dispatch(navActions.setRoutes(this.props.navigator.getCurrentRoutes()));
      this.fadeIn();
    })
  }

  fadeIn() {
    Animated.timing(
       this.state.fadeAnim,
       {toValue: 1},
     ).start();
  }

  fadeOut() {
    Animated.timing(
       this.state.fadeAnim,
       {toValue: 0},
     ).start();
  }

  render() {
    var navBarStyle = {
      height: this.props.navigationStyles.General.TotalNavHeight,
    };
    var navState = this.props.navState;
    var components = navState.routeStack.map((route, index) =>
    COMPONENT_NAMES.map(componentName =>
      this._getComponent(componentName, route, index)
    ));
    let topRoute = navState.routeStack[navState.routeStack.length-1];
    this.state.routeStyle = getStyle(topRoute.navBarStyle, this.props.navBarStyles).navBar;
    return (
      <Animated.View
        key={this._key}
        style={[styles.navBarContainer, navBarStyle, this.props.style, this.state.routeStyle,
        {opacity: this.state.fadeAnim}]}>
        {components}
      </Animated.View>
    );
  }
}

class Navigator extends React.Component {

  getSharedProps() {
    return SHARED_PROPS.reduce((props, key) => {
      props[key] = this.props[key];
      return props;
    }, {});
  }

  renderScene(route, navigator) {
    let Component = route.component;
    let sceneStyle = getStyle(route.navBarStyle, this.props.navBarStyles).scene;
    return (
      <View style={sceneStyle}>
        <Component {...route.props} {...this.getSharedProps()}
           navigator={navigator}
           dispatch={this.props.dispatch}/>
      </View>
    )
  }

  shouldComponentUpdate(nextProps, nextState){
    return false;
  }

  render() {
    return (
      <React.Navigator
        initialRouteStack={this.props.routes}
        ref="nav"
        navigationBar={
          <NavigationBar
            navBarStyles={this.props.navBarStyles}
            dispatch={this.props.dispatch}
            routeMapper={this.getRouteMapper.bind(this)()}/>
        }
        renderScene={this.renderScene.bind(this)}/>
    );
  }
  getRouteMapper() {
    return {
      LeftButton: (route, navigator, index, navState) => {
        if (index > 0) {
          return (
            <MKButton style={styles.navigationButtonLeft} onPress={
                ()=> {navigator.pop();}
              }>
              <Icon name="arrow-back" size={25} color="white" />
            </MKButton>
          )
        }
      },

      RightButton: (route, navigator, index, navState) => {
        if (route.rightComponent) {
          let RightComponent = route.rightComponent;
          return (<RightComponent/>);
        }
      },

      Title: (route, navigator, index, navState) => {
        let TitleComponent = route.titleComponent;
        if (TitleComponent) {
          return (<TitleComponent/>)
        } else {
          return (
            <Text style={styles.navigationTitle}>{route.title}</Text>
          )
        }
      }
    }
  }
}
function selectStates(state) {
  return {
    session: state.session,
    routes: state.routes,
    notification: state.notification
  };
}

export default connect(selectStates)(Navigator);
