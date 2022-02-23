import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { theme } from './src/color';

import Map from "./src/components/map/Map";
import Profile from "./src/components/profile/Profile";
import Challenge from "./src/components/challenge/Challenge";
import Recommend from "./src/components/recommend/Recommend";
import Community from "./src/components/community/Community";

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
    headerStyle: {
      backgroundColor: theme.headerBg,
    }
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
