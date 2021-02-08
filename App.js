import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo'
import Characters from "./src/containers/Characters"
import Comics from "./src/containers/Comics"
import ComicDetail from "./src/containers/ComicDetail"
import CharacterDetail from "./src/containers/CharacterDetail"
import {NavigationEvents} from 'react-navigation';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function TabNavigate() {
  return (
    
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Characters') {
            iconName = focused
              ? 'light-up'
              : 'light-up';
          } else if (route.name === 'Comics') {
            iconName = focused ? 'book' : 'book';
          }

          return <Entypo name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#0B0930',
          borderTopWidth:0
        }
      }}>
        <Tab.Screen name="Characters" component={Characters} />
        <Tab.Screen name="Comics" component={Comics} />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Comics'
        screenOptions={{
          gestureEnabled: true,
          headerBackTitleVisible: false,
          headerShown: false
        }}
        headerMode='float'>
      <Stack.Screen name="TabNavigate" component={TabNavigate} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetail} />
      <Stack.Screen name="ComicDetail" component={ComicDetail} />
    </Stack.Navigator>
    </NavigationContainer>
    
  );
}
