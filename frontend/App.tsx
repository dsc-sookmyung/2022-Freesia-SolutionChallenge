import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import MapStack from "./src/navigations/MapStack";
import ChallengStackScreen from "./src/navigations/ChallengeStack";
import Recommend from "./src/components/recommend/Recommend";
import Profile from "./src/components/profile/Profile";
import CommunityStack from "./src/navigations/CommunityStack";

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
        <Tab.Screen name="Recommend" component={Recommend} />
        <Tab.Screen name="Challenge" component={ChallengStackScreen} />
        <Tab.Screen name="Community" component={CommunityStack} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
