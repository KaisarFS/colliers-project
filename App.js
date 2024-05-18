import React, { useState } from 'react';
import { Text, Platform, View } from 'react-native';
import { Entypo, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import EmployeeListScreen from './screens/EmployeeListScreen';
import EmployeeDetailScreen from './screens/EmployeeDetailScreen';
import CreateEmployeeScreen from './screens/CreateEmployeeScreen';
// import { WelcomeScreen, LoginScreen, EmployeeListScreen } from './screens';
// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Welcome">
//         <Stack.Screen name="Welcome" component={WelcomeScreen}  options={{ title: 'Welcome', headerShown: false }} />
//         <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerShown: false }} />
//         <Stack.Screen name="EmployeeList" component={EmployeeListScreen} options={{ title: 'EmployeeList', headerShown: false }} />
//         <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} options={{ title: 'EmployeeDetail', headerShown: false }} />
//         <Stack.Screen name="CreateEmployee" component={CreateEmployeeScreen} options={{ title: 'CreateEmployee' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Entypo name="home" size={24} color={focused ? "#16247d" : "#111"} />
                  <Text style={{ fonSize: 12, color: "#16247d" }}>HOME</Text>
                </View>
              )
            }
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Entypo name="wallet" size={24} color={focused ? "#16247d" : "#111"} />
                  <Text style={{ fonSize: 12, color: "#16247d" }}>WALLET</Text>
                </View>
              )
            }
          }}
        />
        <Tab.Screen
          name="EmployeeList"
          component={EmployeeListScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#16247d",
                    width: Platform.OS == "ios" ? 50 : 60,
                    height: Platform.OS == "ios" ? 50 : 60,
                    top: Platform.OS == "ios" ? -10 : -20,
                    borderRadius: Platform.OS == "ios" ? 25 : 30
                  }}
                >
                  <FontAwesome name="exchange" size={24} color="#fff" />
                </View>
              )
            }
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateEmployeeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <MaterialIcons name="stacked-line-chart" size={24} color={focused ? "#16247d" : "#111"} />
                  <Text style={{ fonSize: 12, color: "#16247d" }}>PRICES</Text>
                </View>
              )
            }
          }}
        />
        <Tab.Screen
          name="Dummy"
          component={EmployeeListScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="settings" size={24} color={focused ? "#16247d" : "#111"} />
                  <Text style={{ fonSize: 12, color: "#16247d" }}>SETTINGS</Text>
                </View>
              )
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
