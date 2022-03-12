import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { theme } from "../color";
import ProfileScreen from "../components/profile/ProfileScreen";
import SettingScreen from "../components/profile/SettingScreen";
import LoginScreen from "../components/login/LoginScreen";
import SignInScreen from "../components/login/SignInScreen";
import KakaoLoginScreen from "../components/login/KakaoLoginScreen";

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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="KakaoLogin"
        component={KakaoLoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
