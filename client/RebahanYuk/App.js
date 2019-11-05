import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {Provider} from 'react-redux';
import {Icon} from 'native-base';

import store from './src/redux/_store/store';
import Login from './src/screens/Login';
import Rooms from './src/screens/Rooms';
import Customers from './src/screens/Customers';
import CheckIn from './src/screens/CheckIn';
import Settings from './src/screens/Settings';
import * as color from './src/assets/color';

const loginTabs = createStackNavigator(
  {
    Login: {
      screen: Login,
      title: 'Login',
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const roomsTabs = createStackNavigator(
  {
    Rooms: {
      screen: Rooms,
      title: 'Rooms',
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'Rooms',
  },
);

const customersTabs = createStackNavigator(
  {
    Customers: {
      screen: Customers,
      title: 'Customers',
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'Customers',
  },
);

const checkInTabs = createStackNavigator(
  {
    CheckIn: {
      screen: CheckIn,
      title: 'CheckIn',
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'CheckIn',
  },
);

const settingsTabs = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      title: 'Settings',
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'Settings',
  },
);

const BottomTabs = createBottomTabNavigator(
  {
    CheckIn: checkInTabs,
    Rooms: roomsTabs,
    Customers: customersTabs,
    Settings: settingsTabs,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'CheckIn') {
          iconName = `check-circle`;
        } else if (routeName === 'Rooms') {
          iconName = `building`;
        } else if (routeName === 'Customers') {
          iconName = `id-card`;
        } else if (routeName === 'Settings') {
          iconName = `cog`;
        }
        return (
          <Icon
            type="FontAwesome"
            name={iconName}
            size={20}
            style={{color: tintColor}}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: color.midnight,
      showLabel: true,
      keyboardHidesTabBar: true,
      style: {
        backgroundColor: color.orange,
      },
    },
  },
);

const Switch = createSwitchNavigator(
  {
    loginTabs: loginTabs,
    BottomTabs: BottomTabs,
  },
  {
    initialRouteName: 'loginTabs',
  },
);

const AppContainer = createAppContainer(Switch);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
