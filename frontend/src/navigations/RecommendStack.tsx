import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { theme } from "../color";

import RecommendScreen from "../components/recommend/RecommendScreen";

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

export default function RecommendStack() {
  return (
    <Stack.Navigator initialRouteName="List" screenOptions={screenOptions}>
      <Stack.Screen
        name="List"
        component={RecommendScreen}
        options={{ title: "Recommend" }}
      />
    </Stack.Navigator>
  );
}
