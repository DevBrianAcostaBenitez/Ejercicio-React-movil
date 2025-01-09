import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: '#a60316' },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'black',
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerStyle: { backgroundColor: '#a60316' },
        headerTintColor: 'white',
        tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Buscar"
      component={SearchScreen}
      options={{
        headerStyle: { backgroundColor: '#a60316' },
        headerTintColor: 'white',
        tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieDetailScreen"
          component={MovieDetailScreen}
          options={{
            headerStyle: { backgroundColor: '#a60316' },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343536',
  },
});
