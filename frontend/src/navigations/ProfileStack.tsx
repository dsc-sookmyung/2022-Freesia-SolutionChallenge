import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { theme } from "../color";
import ProfileScreen from "../components/profile/ProfileScreen";
import SettingScreen from "../components/profile/SettingScreen";

const Stack = createStackNavigator();

const screenOptions = ({ route }) => {
  return {
    headerStyle: {
      backgroundColor: theme.headerBg,
    },
    cardStyle: {
      backgroundColor: "white",
    }
  };
};

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={screenOptions}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: "Profile" }} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ title: "Setting" }} />
    </Stack.Navigator>
  )

}