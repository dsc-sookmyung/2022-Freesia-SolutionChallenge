import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Map from "./screens/Map";
import Profile from "./screens/Profile";
import Challenge from "./screens/Challenge";
import Recommend from "./screens/Recommend";
import Community from "./screens/Community";

type TabBarIconProps = { focused: boolean; color: string; size: number };

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const icons: Record<string, string[]> = {
  Map: ["home", "home-outline"],
  Profile: ["person", "person-outline"],
  Challenge: ["golf", "golf-outline"],
  //Challenge: ["stats-chart-sharp", "stats-chart-outline"],
  Recommend: ["star", "star-outline"],
  Community: ["md-chatbubbles", "md-chatbubbles-outline"],
};

const screenOptions = ({ route }) => {
  return {
    tabBarIcon: ({ focused }: TabBarIconProps) => {
      const { name } = route;
      var iconName = "";
      if (icons[name] && icons[name].length > 0) {
        const [icon, iconOutline] = icons[name];
        iconName = focused ? icon : iconOutline;
      }
      return <Ionicons name={iconName} size={24} color="black" />;
    },
  };
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Recommend" component={Recommend} />
        <Tab.Screen name="Challenge" component={Challenge} />
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
