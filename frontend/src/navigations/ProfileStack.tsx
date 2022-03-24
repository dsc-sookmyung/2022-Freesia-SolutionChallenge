import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { theme } from "../color";
import ProfileScreen from "../components/profile/ProfileScreen";
import SettingScreen from "../components/profile/SettingScreen";
import LoginScreen from "../components/login/LoginScreen";
import SignupScreen from "../components/login/SignupScreen";
import CustomerServiceScreen from "../components/profile/CustomerServiceScreen";

const Stack = createStackNavigator();

const screenOptions = ({ route }) => {
  return {
    headerStyle: {
      backgroundColor: theme.headerBg,
    },
    cardStyle: {
      backgroundColor: "white",
    },
  };
};

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ title: "Setting" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Sign Up" }}
      />
      <Stack.Screen
        name="CustomerService"
        component={CustomerServiceScreen}
        options={{ title: "Customer Service" }}
      />
    </Stack.Navigator>
  );
}
