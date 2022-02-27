import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MapScreen from "../components/map/MapScreen";

import { theme } from "../color";

export default function MapStackScreen() {
  const MapStack = createStackNavigator();

  return (
    <MapStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.headerBg,
        },
      }}
    >
      <MapStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ title: "Centers Around Me" }}
      />
    </MapStack.Navigator>
  );
}
