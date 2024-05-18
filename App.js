import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import EmployeeListScreen from './screens/EmployeeListScreen';
// import { WelcomeScreen, LoginScreen, EmployeeListScreen } from './screens';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="EmployeeList" component={EmployeeListScreen} options={{ title: 'EmployeeList' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
