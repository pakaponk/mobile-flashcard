import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { Constants } from 'expo'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons' 
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import DeckCreate from './components/DeckCreate'
import DeckList from './components/DeckList'
import reducers from './reducers'
import { purple, white } from './utils/colors'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards-playing-outline" size={30} color={tintColor} /> 
    }
  },
  DeckCreate: {
    screen: DeckCreate,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  }
})

function UdaciCardStatusBar({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor: backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent {...props} backgroundColor={backgroundColor} />
    </View>
  )
}

const store = createStore(reducers);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <UdaciCardStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
