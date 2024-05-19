import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import EmployeeDetailScreen from "./screens/EmployeeDetailScreen";
import TabNavigator from "./screens/TabNavigator";
// import { WelcomeScreen, LoginScreen, EmployeeListScreen } from './screens';
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ title: "Welcome", headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: "Login", headerShown: false }}
                />

                <Stack.Screen
                    name="Home"
                    component={TabNavigator}
                    options={{ title: "Home", headerShown: false }}
                />
                <Stack.Screen
                    name="EmployeeDetail"
                    component={EmployeeDetailScreen}
                    options={{ title: "EmployeeDetail", headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}