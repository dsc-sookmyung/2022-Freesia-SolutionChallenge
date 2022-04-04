import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import MapStack from "./src/navigations/MapStack";
import ChallengeStack from "./src/navigations/ChallengeStack";
import RecommendStack from "./src/navigations/RecommendStack";
import CommunityStack from "./src/navigations/CommunityStack";
import ProfileStack from "./src/navigations/ProfileStack";

type TabBarIconProps = { focused: boolean; color: string; size: number };

const Tab = createBottomTabNavigator();

const icons: Record<string, string[]> = {
  Map: ["map", "map-outline"],
  //Map: ["home", "home-outline"],
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
    headerShown: false,
  };
};

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Map" component={MapStack} />
        <Tab.Screen name="Recommend" component={RecommendStack} />
        <Tab.Screen name="Challenge" component={ChallengeStack} />
        <Tab.Screen name="Community" component={CommunityStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

{
  /* <Tab.Screen name="Map" component={MapStack} /> */
}
