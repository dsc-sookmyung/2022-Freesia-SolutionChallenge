import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
<<<<<<< HEAD
import { theme } from "./src/color";

import Map from "./src/components/map/Map";
=======
import * as SplashScreen from "expo-splash-screen";
import MapStack from "./src/navigations/MapStack";
>>>>>>> 9b8d1f9 ([front] Add bottom sheet in map screen)
import ChallengStackScreen from "./src/navigations/ChallengeStack";
import Recommend from "./src/components/recommend/Recommend";
import Community from "./src/components/community/Community";
import Login from "./src/components/Login";

type TabBarIconProps = { focused: boolean; color: string; size: number };

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
    },
  };
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Map" component={MapStack} />
        <Tab.Screen name="Recommend" component={Recommend} />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Challenge"
          component={ChallengStackScreen}
        />
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="Profile" component={Login} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
