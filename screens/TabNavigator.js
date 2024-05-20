import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateEmployeeScreen from "./CreateEmployeeScreen";
import EmployeeListScreen from "./EmployeeListScreen";
import DummyScreenOne from "./DummyScreenOne";
import DummyScreenTwo from "./DummyScreenTwo";
import SettingsScreen from "./SettingsScreen";
// import { EmployeeListScreen, DummyScreenOne, DummyScreenTwo, DummyScreenThree } from "./index";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Text, Platform, View } from 'react-native';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  // backgroundColor: "#45f542",
  tabBarStyle: {
    // position: "absolute",
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
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Employee"
        component={EmployeeListScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="people-circle-outline" size={24} color={focused ? "#3358ff" : "#111"} />
                <Text style={{ fonSize: 12, color: "#16247d" }}>Employee</Text>
              </View>
            )
          },
          headerShown: false
        }}
      />
      <Tab.Screen
        name="DummyOne"
        component={DummyScreenOne}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons name="dangerous" size={24} color={focused ? "#3358ff" : "#111"} />
                <Text style={{ fonSize: 12, color: "#16247d" }}>Dummy</Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="CreateEmployee"
        component={CreateEmployeeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#3358ff",
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30
                }}
              >
                <Entypo name="plus" size={24} color={focused ? "#fff" : "#fff"} />
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Prices"
        component={DummyScreenTwo}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons name="dangerous" size={24} color={focused ? "#3358ff" : "#111"} />
                <Text style={{ fonSize: 12, color: "#16247d" }}>Dummy</Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="settings" size={24} color={focused ? "#3358ff" : "#111"} />
                <Text style={{ fonSize: 12, color: "#16247d" }}>Settings</Text>
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  );
}

// export default function TabNavigator() {
//     return (
//         <Tab.Navigator initialRouteName="EmployeeList">
//             <Tab.Screen
//                 name="EmployeeList"
//                 component={EmployeeListScreen}
//                 options={{ title: "EmployeeList", headerShown: false }}
//             />
//             <Tab.Screen
//                 name="CreateEmployee"
//                 component={CreateEmployeeScreen}
//                 options={{ title: "CreateEmployee" }}
//             />
//         </Tab.Navigator>
//     );
// }