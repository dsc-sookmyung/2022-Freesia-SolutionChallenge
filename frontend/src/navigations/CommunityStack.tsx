import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Community from "../components/community/Community";
import Create from "../components/community/Create";
import Detail from "../components/community/Detail";

const Stack = createStackNavigator();

const screenOptions = ({ route }) => {
  return {
    headerShown: false,
    cardStyle: {
      backgroundColor: "white",
    }
  };
};

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="List" screenOptions={screenOptions}>
      <Stack.Screen name="List" component={Community} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  )

}