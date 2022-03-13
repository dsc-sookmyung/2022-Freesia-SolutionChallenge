import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { theme } from "../color";
import CommunityScreen from "../components/community/CommunityScreen";
import CreateScreen from "../components/community/CreateScreen";
import EditScreen from "../components/community/EditScreen";
import DetailScreen from "../components/community/DetailScreen";
import ImageBrowserScreen from "../components/community/ImageBrowserScreen";

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

export default function CommunityStack() {
  return (
    <Stack.Navigator initialRouteName="List" screenOptions={screenOptions}>
      <Stack.Screen name="List" component={CommunityScreen} options={{ title: "Community" }} />
      <Stack.Screen name="Create" component={CreateScreen} options={{ title: "Community" }} />
      <Stack.Screen name="Edit" component={EditScreen} options={{ title: "Community" }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: null }} />
      <Stack.Screen name="ImageBrowser" component={ImageBrowserScreen} options={{ title: null }} />
    </Stack.Navigator>
  )

}